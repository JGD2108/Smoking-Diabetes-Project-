import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { BigQuery } from "@google-cloud/bigquery";

const DEFAULT_PROJECT_ID = process.env.GCP_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT || "pipeline-smoking-drinking";
const DEFAULT_LOCATION = process.env.GCP_LOCATION || "us-central1";

const bigquery = new BigQuery({
  projectId: DEFAULT_PROJECT_ID,
  location: DEFAULT_LOCATION,
});

function runCommand(command) {
  try {
    return JSON.parse(execSync(command, { encoding: "utf8" }));
  } catch {
    return null;
  }
}

async function query(queryText) {
  const [rows] = await bigquery.query({
    query: queryText,
    location: DEFAULT_LOCATION,
  });

  return rows;
}

function normalizeDistribution(rows, labelKey) {
  const total = rows.reduce((sum, row) => sum + Number(row.count), 0);
  return rows.map((row) => ({
    label: String(row[labelKey]),
    count: Number(row.count),
    pct: total === 0 ? 0 : Number(((Number(row.count) / total) * 100).toFixed(1)),
  }));
}

function normalizeFeatureImportance(rows) {
  return rows.map((row) => ({
    feature: row.feature,
    weight: Number(row.importance_weight),
    gain: Number(row.importance_gain),
    cover: Number(row.importance_cover),
  }));
}

function normalizeConfusionMatrix(rows) {
  const labels = rows.map((row) => String(row.expected_label));
  const matrix = rows.map((row) => {
    const normalized = {};
    for (const [key, value] of Object.entries(row)) {
      if (key === "expected_label") continue;
      const normalizedKey = String(key).replace(/^_(\d+)$/, "$1");
      normalized[normalizedKey] = Number(value);
    }
    return {
      expected: String(row.expected_label),
      values: normalized,
    };
  });

  return { labels, matrix };
}

function normalizeMetricRows(rows) {
  return rows.map((row) => ({
    pipelineRunId: row.pipeline_run_id,
    modelName: row.model_name,
    dataVersion: row.data_version,
    evaluationTimestamp: String(row.evaluation_timestamp),
    accuracy: Number(row.accuracy),
    precision: Number(row.precision),
    recall: Number(row.recall),
    f1: Number(row.f1_score),
  }));
}

function decodeSchedulerPayload(jobs) {
  return (jobs || []).map((job) => ({
    name: job.name?.split("/").pop(),
    schedule: job.schedule,
    timeZone: job.timeZone,
    state: job.state,
  }));
}

async function main() {
  const projectId = process.env.GCP_PROJECT_ID || execSync("gcloud config get-value project", { encoding: "utf8" }).trim();
  const workflows = runCommand(`gcloud workflows list --location=${DEFAULT_LOCATION} --format=json`) || [];
  const schedulerJobs = runCommand(`gcloud scheduler jobs list --location=${DEFAULT_LOCATION} --format=json`) || [];

  const [
    stageCountsRows,
    sexRows,
    smokingRows,
    drinkingRows,
    ageDrinkingRows,
    ageSmokingRows,
    metricsRows,
    pipelineRunsRows,
    dataQualityRows,
    promotionRows,
    smokingFeatureRows,
    drinkingFeatureRows,
    smokingConfusionRows,
    drinkingConfusionRows,
  ] = await Promise.all([
    query(`
      SELECT 'raw' AS stage, COUNT(*) AS row_count FROM \`${projectId}.health_raw.smoking_drinking_source\`
      UNION ALL
      SELECT 'staging', COUNT(*) FROM \`${projectId}.health_staging.smoking_drinking_clean\`
      UNION ALL
      SELECT 'smoking_features', COUNT(*) FROM \`${projectId}.health_features.smoking_features\`
      UNION ALL
      SELECT 'drinking_features', COUNT(*) FROM \`${projectId}.health_features.drinking_features\`
      UNION ALL
      SELECT 'smoking_predictions', COUNT(*) FROM \`${projectId}.health_ml.smoking_predictions\`
      UNION ALL
      SELECT 'drinking_predictions', COUNT(*) FROM \`${projectId}.health_ml.drinking_predictions\`
    `),
    query(`
      SELECT sex, COUNT(*) AS count
      FROM \`${projectId}.health_raw.smoking_drinking_source\`
      GROUP BY sex
      ORDER BY count DESC
    `),
    query(`
      SELECT CAST(SMK_stat_type_cd AS STRING) AS smoking_status, COUNT(*) AS count
      FROM \`${projectId}.health_raw.smoking_drinking_source\`
      GROUP BY smoking_status
      ORDER BY smoking_status
    `),
    query(`
      SELECT DRK_YN, COUNT(*) AS count
      FROM \`${projectId}.health_raw.smoking_drinking_source\`
      GROUP BY DRK_YN
      ORDER BY DRK_YN
    `),
    query(`
      SELECT age, DRK_YN, COUNT(*) AS count
      FROM \`${projectId}.health_raw.smoking_drinking_source\`
      GROUP BY age, DRK_YN
      ORDER BY age, DRK_YN
    `),
    query(`
      SELECT age, CAST(SMK_stat_type_cd AS STRING) AS smoking_status, COUNT(*) AS count
      FROM \`${projectId}.health_raw.smoking_drinking_source\`
      GROUP BY age, smoking_status
      ORDER BY age, smoking_status
    `),
    query(`
      SELECT *
      FROM \`${projectId}.health_monitoring.model_metrics\`
      ORDER BY evaluation_timestamp DESC
    `),
    query(`
      SELECT *
      FROM \`${projectId}.health_monitoring.pipeline_runs\`
      ORDER BY run_timestamp DESC
    `),
    query(`
      SELECT *
      FROM \`${projectId}.health_monitoring.data_quality_runs\`
      ORDER BY check_timestamp DESC
    `),
    query(`
      SELECT *
      FROM \`${projectId}.health_monitoring.model_promotions\`
      ORDER BY promotion_timestamp DESC
    `),
    query(`
      SELECT *
      FROM ML.FEATURE_IMPORTANCE(MODEL \`${projectId}.health_ml.smoking_rf_model\`)
      ORDER BY importance_weight DESC
      LIMIT 10
    `),
    query(`
      SELECT *
      FROM ML.FEATURE_IMPORTANCE(MODEL \`${projectId}.health_ml.drinking_rf_model\`)
      ORDER BY importance_weight DESC
      LIMIT 10
    `),
    query(`
      SELECT *
      FROM ML.CONFUSION_MATRIX(MODEL \`${projectId}.health_ml.smoking_rf_model\`)
    `),
    query(`
      SELECT *
      FROM ML.CONFUSION_MATRIX(MODEL \`${projectId}.health_ml.drinking_rf_model\`)
    `),
  ]);

  const stageCounts = Object.fromEntries(
    stageCountsRows.map((row) => [row.stage, Number(row.row_count)]),
  );

  const latestMetricByModel = Object.fromEntries(
    normalizeMetricRows(metricsRows).map((row) => [row.modelName, row]),
  );

  const siteData = {
    generatedAt: new Date().toISOString(),
    project: {
      id: projectId,
      location: DEFAULT_LOCATION,
      workflow: workflows[0]
        ? {
            name: workflows[0].name?.split("/").pop(),
            state: workflows[0].state,
            serviceAccount: workflows[0].serviceAccount?.split("/").pop(),
            revisionId: workflows[0].revisionId,
          }
        : null,
      schedulerJobs: decodeSchedulerPayload(schedulerJobs),
      alerting: [
        "Workflow failure alert configured in Cloud Monitoring",
        "Missing scheduled run alert configured in Cloud Monitoring",
      ],
    },
    notebookBaseline: {
      rowsRaw: 991346,
      rowsAfterIqrCleaning: 639442,
      rowsRemovedByIqr: 351904,
      duplicatesFound: 14,
      smoking: {
        accuracy: 0.721,
        precision: 0.59,
        recall: 0.579,
        f1: 0.583,
      },
      drinking: {
        accuracy: 0.716,
        precision: 0.715,
        recall: 0.715,
        f1: 0.715,
      },
    },
    cloudPipeline: {
      stageCounts,
      duplicatesRemoved: pipelineRunsRows[0] ? Number(pipelineRunsRows[0].duplicates_removed) : 0,
      rowsDroppedInStaging: stageCounts.raw - stageCounts.staging,
      preservedPct:
        stageCounts.raw > 0
          ? Number(((stageCounts.staging / stageCounts.raw) * 100).toFixed(2))
          : 0,
      latestRun: pipelineRunsRows[0]
        ? {
            pipelineRunId: pipelineRunsRows[0].pipeline_run_id,
            runTimestamp: String(pipelineRunsRows[0].run_timestamp),
            rawRowCount: Number(pipelineRunsRows[0].raw_row_count),
            stagingRowCount: Number(pipelineRunsRows[0].staging_row_count),
            trainingStatus: pipelineRunsRows[0].training_status,
            evaluationStatus: pipelineRunsRows[0].evaluation_status,
            finalStatus: pipelineRunsRows[0].final_status,
          }
        : null,
      pipelineRuns: pipelineRunsRows.map((row) => ({
        pipelineRunId: row.pipeline_run_id,
        runTimestamp: String(row.run_timestamp),
        sourceFile: row.source_file,
        rawRowCount: Number(row.raw_row_count),
        stagingRowCount: Number(row.staging_row_count),
        duplicatesRemoved: Number(row.duplicates_removed),
        finalStatus: row.final_status,
      })),
      dataQualityChecks: dataQualityRows.map((row) => ({
        name: row.check_name,
        timestamp: String(row.check_timestamp),
        status: row.status,
        failedRows: Number(row.failed_rows),
        pipelineRunId: row.pipeline_run_id,
      })),
      promotions: promotionRows.map((row) => ({
        modelName: row.model_name,
        status: row.status,
        notes: row.notes,
        pipelineRunId: row.pipeline_run_id,
        promotionTimestamp: String(row.promotion_timestamp),
      })),
    },
    dataset: {
      observations: 991346,
      variables: 24,
      completeness: "100% complete",
      dtypes: {
        int64: 3,
        float64: 19,
        object: 2,
      },
      sexDistribution: normalizeDistribution(sexRows, "sex").map((entry) => ({
        ...entry,
        label: entry.label === "Male" ? "Male" : "Female",
      })),
      smokingDistribution: normalizeDistribution(smokingRows, "smoking_status").map((entry) => ({
        ...entry,
        label:
          entry.label === "1"
            ? "Never"
            : entry.label === "2"
              ? "Quit"
              : "Still smoke",
      })),
      drinkingDistribution: normalizeDistribution(drinkingRows, "DRK_YN").map((entry) => ({
        ...entry,
        label: entry.label === "true" ? "Drinkers" : "Non-drinkers",
      })),
      ageByDrinking: ageDrinkingRows.map((row) => ({
        age: Number(row.age),
        label: row.DRK_YN === true || row.DRK_YN === "true" ? "Drinkers" : "Non-drinkers",
        count: Number(row.count),
      })),
      ageBySmoking: ageSmokingRows.map((row) => ({
        age: Number(row.age),
        label:
          row.smoking_status === "1"
            ? "Never"
            : row.smoking_status === "2"
              ? "Quit"
              : "Still smoke",
        count: Number(row.count),
      })),
      sampleRow: {
        sex: "Male",
        age: 35,
        height: 170,
        weight: 75,
        waistline: 90.0,
        sight_left: 1.0,
        sight_right: 1.0,
        hear_left: 1.0,
        hear_right: 1.0,
        SBP: 120.0,
        DBP: 80.0,
        BLDS: 99.0,
        tot_chole: 193.0,
        HDL_chole: 48.0,
        LDL_chole: 126.0,
        triglyceride: 92.0,
        hemoglobin: 17.1,
        urine_protein: 1.0,
        serum_creatinine: 1.0,
        SGOT_AST: 21.0,
        SGOT_ALT: 35.0,
        gamma_GTP: 40.0,
        SMK_stat_type_cd: 1,
        DRK_YN: "Y",
      },
    },
    models: {
      latestMetrics: latestMetricByModel,
      metricHistory: normalizeMetricRows(metricsRows),
      smokingFeatureImportance: normalizeFeatureImportance(smokingFeatureRows),
      drinkingFeatureImportance: normalizeFeatureImportance(drinkingFeatureRows),
      smokingConfusionMatrix: normalizeConfusionMatrix(smokingConfusionRows),
      drinkingConfusionMatrix: normalizeConfusionMatrix(drinkingConfusionRows),
      deploymentNotes: [
        "Models are trained in BigQuery ML as RANDOM_FOREST_CLASSIFIER assets.",
        "The workflow retrains the models after Dataform finishes staging and feature generation.",
        "Prediction tables are refreshed in BigQuery and can be consumed by downstream dashboards.",
      ],
      playgroundDefaults: {
        sex: "M",
        age: 45,
        height: 180,
        weight: 65,
        waistline: 73,
        sight_left: 1.0,
        sight_right: 0.7,
        hear_left: 1.0,
        hear_right: 1.0,
        SBP: 120,
        DBP: 84,
        BLDS: 82,
        tot_chole: 187,
        HDL_chole: 47,
        LDL_chole: 124,
        triglyceride: 81,
        hemoglobin: 13.7,
        urine_protein: 1.0,
        serum_creatinine: 0.9,
        SGOT_AST: 21,
        SGOT_ALT: 12,
        gamma_GTP: 17,
        DRK_YN: "Y",
        SMK_stat_type_cd: 3,
      },
    },
  };

  mkdirSync(join(process.cwd(), "src", "data"), { recursive: true });
  writeFileSync(
    join(process.cwd(), "src", "data", "siteData.generated.json"),
    `${JSON.stringify(siteData, null, 2)}\n`,
    "utf8",
  );

  console.log(`Site data snapshot written for project ${projectId}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
