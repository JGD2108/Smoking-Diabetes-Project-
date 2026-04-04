import { getBigQueryClient, getBigQueryContext } from "./bigquery";

const predictorFields = [
  "sex",
  "age",
  "height",
  "weight",
  "waistline",
  "sight_left",
  "sight_right",
  "hear_left",
  "hear_right",
  "SBP",
  "DBP",
  "BLDS",
  "tot_chole",
  "HDL_chole",
  "LDL_chole",
  "triglyceride",
  "hemoglobin",
  "urine_protein",
  "serum_creatinine",
  "SGOT_AST",
  "SGOT_ALT",
  "gamma_GTP",
  "DRK_YN",
  "SMK_stat_type_cd",
];

const numericFields = new Set(
  predictorFields.filter((field) => !["sex", "DRK_YN"].includes(field)),
);

function toNumber(value, field) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid numeric value for ${field}`);
  }

  return parsed;
}

export function normalizePayload(rawBody) {
  const normalized = {};

  for (const field of predictorFields) {
    if (!(field in rawBody)) {
      throw new Error(`Missing field: ${field}`);
    }

    if (field === "sex") {
      const value = String(rawBody[field]).toUpperCase();
      if (!["M", "F"].includes(value)) throw new Error("sex must be M or F");
      normalized[field] = value;
      continue;
    }

    if (field === "DRK_YN") {
      const value = String(rawBody[field]).toUpperCase();
      if (!["Y", "N"].includes(value)) throw new Error("DRK_YN must be Y or N");
      normalized[field] = value;
      continue;
    }

    normalized[field] = numericFields.has(field)
      ? toNumber(rawBody[field], field)
      : rawBody[field];
  }

  if (![1, 2, 3].includes(normalized.SMK_stat_type_cd)) {
    throw new Error("SMK_stat_type_cd must be 1, 2, or 3");
  }

  return normalized;
}

function probabilitiesFromRow(probabilities) {
  return (probabilities || [])
    .map((entry) => ({
      label: String(entry.label),
      prob: Number(entry.prob),
    }))
    .sort((a, b) => b.prob - a.prob);
}

export async function predictHealthSignals(payload) {
  const input = normalizePayload(payload);
  const { projectId, location } = getBigQueryContext();
  const bigquery = getBigQueryClient();

  const rowId = Date.now();
  const commonParams = {
    row_id: rowId,
    ...input,
  };

  const smokingQuery = `
    SELECT predicted_SMK_stat_type_cd, predicted_SMK_stat_type_cd_probs
    FROM ML.PREDICT(
      MODEL \`${projectId}.health_ml.smoking_rf_model\`,
      (
        SELECT
          @row_id AS row_id,
          @sex AS sex,
          @age AS age,
          @height AS height,
          @weight AS weight,
          @waistline AS waistline,
          @sight_left AS sight_left,
          @sight_right AS sight_right,
          @hear_left AS hear_left,
          @hear_right AS hear_right,
          @SBP AS SBP,
          @DBP AS DBP,
          @BLDS AS BLDS,
          @tot_chole AS tot_chole,
          @HDL_chole AS HDL_chole,
          @LDL_chole AS LDL_chole,
          @triglyceride AS triglyceride,
          @hemoglobin AS hemoglobin,
          @urine_protein AS urine_protein,
          @serum_creatinine AS serum_creatinine,
          @SGOT_AST AS SGOT_AST,
          @SGOT_ALT AS SGOT_ALT,
          @gamma_GTP AS gamma_GTP,
          @DRK_YN AS DRK_YN
      )
    )
  `;

  const drinkingQuery = `
    SELECT predicted_DRK_YN, predicted_DRK_YN_probs
    FROM ML.PREDICT(
      MODEL \`${projectId}.health_ml.drinking_rf_model\`,
      (
        SELECT
          @row_id AS row_id,
          @sex AS sex,
          @age AS age,
          @height AS height,
          @weight AS weight,
          @waistline AS waistline,
          @sight_left AS sight_left,
          @sight_right AS sight_right,
          @hear_left AS hear_left,
          @hear_right AS hear_right,
          @SBP AS SBP,
          @DBP AS DBP,
          @BLDS AS BLDS,
          @tot_chole AS tot_chole,
          @HDL_chole AS HDL_chole,
          @LDL_chole AS LDL_chole,
          @triglyceride AS triglyceride,
          @hemoglobin AS hemoglobin,
          @urine_protein AS urine_protein,
          @serum_creatinine AS serum_creatinine,
          @SGOT_AST AS SGOT_AST,
          @SGOT_ALT AS SGOT_ALT,
          @gamma_GTP AS gamma_GTP,
          @SMK_stat_type_cd AS SMK_stat_type_cd
      )
    )
  `;

  const [smokingRows] = await bigquery.query({
    query: smokingQuery,
    params: commonParams,
    location,
  });

  const [drinkingRows] = await bigquery.query({
    query: drinkingQuery,
    params: commonParams,
    location,
  });

  const smoking = smokingRows[0];
  const drinking = drinkingRows[0];

  return {
    projectId,
    predictedAt: new Date().toISOString(),
    smoking: {
      label: String(smoking.predicted_SMK_stat_type_cd),
      probabilities: probabilitiesFromRow(smoking.predicted_SMK_stat_type_cd_probs),
    },
    drinking: {
      label: String(drinking.predicted_DRK_YN),
      probabilities: probabilitiesFromRow(drinking.predicted_DRK_YN_probs),
    },
  };
}
