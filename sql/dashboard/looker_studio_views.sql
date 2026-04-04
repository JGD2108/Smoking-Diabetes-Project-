-- Dashboard-ready views for Looker Studio or ad hoc reporting.
-- Run these in BigQuery under project `pipeline-smoking-drinking`.

CREATE OR REPLACE VIEW `pipeline-smoking-drinking.health_monitoring.dashboard_pipeline_overview` AS
SELECT
  pipeline_run_id,
  run_timestamp,
  source_file,
  raw_row_count,
  staging_row_count,
  raw_row_count - staging_row_count AS rows_dropped,
  duplicates_removed,
  training_status,
  evaluation_status,
  final_status
FROM `pipeline-smoking-drinking.health_monitoring.pipeline_runs`;

CREATE OR REPLACE VIEW `pipeline-smoking-drinking.health_monitoring.dashboard_model_metrics` AS
SELECT
  pipeline_run_id,
  model_name,
  evaluation_timestamp,
  data_version,
  accuracy,
  precision,
  recall,
  f1_score
FROM `pipeline-smoking-drinking.health_monitoring.model_metrics`;

CREATE OR REPLACE VIEW `pipeline-smoking-drinking.health_monitoring.dashboard_data_quality` AS
SELECT
  pipeline_run_id,
  check_name,
  check_timestamp,
  status,
  failed_rows
FROM `pipeline-smoking-drinking.health_monitoring.data_quality_runs`;

CREATE OR REPLACE VIEW `pipeline-smoking-drinking.health_monitoring.dashboard_model_promotions` AS
SELECT
  pipeline_run_id,
  model_name,
  promotion_timestamp,
  status,
  notes
FROM `pipeline-smoking-drinking.health_monitoring.model_promotions`;

CREATE OR REPLACE VIEW `pipeline-smoking-drinking.health_monitoring.dashboard_prediction_mix` AS
SELECT
  'smoking' AS model_name,
  CAST(predicted_label AS STRING) AS predicted_label,
  COUNT(*) AS row_count,
  MAX(prediction_timestamp) AS latest_prediction_timestamp
FROM `pipeline-smoking-drinking.health_ml.smoking_predictions`
GROUP BY predicted_label

UNION ALL

SELECT
  'drinking' AS model_name,
  CAST(predicted_label AS STRING) AS predicted_label,
  COUNT(*) AS row_count,
  MAX(prediction_timestamp) AS latest_prediction_timestamp
FROM `pipeline-smoking-drinking.health_ml.drinking_predictions`
GROUP BY predicted_label;
