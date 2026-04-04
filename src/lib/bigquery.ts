import { BigQuery } from "@google-cloud/bigquery";

const projectId =
  process.env.GCP_PROJECT_ID ||
  process.env.GOOGLE_CLOUD_PROJECT ||
  "pipeline-smoking-drinking";

const location = process.env.GCP_LOCATION || "us-central1";

let client;

export function getBigQueryClient() {
  if (!client) {
    client = new BigQuery({ projectId, location });
  }

  return client;
}

export function getBigQueryContext() {
  return { projectId, location };
}
