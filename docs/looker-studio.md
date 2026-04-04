# Looker Studio Setup

This repo already includes a built-in Astro dashboard. If you also want a Looker Studio report embedded in the site, use the BigQuery monitoring and ML tables from the `pipeline-smoking-drinking` project.

## Recommended data sources

- `pipeline-smoking-drinking.health_monitoring.pipeline_runs`
- `pipeline-smoking-drinking.health_monitoring.model_metrics`
- `pipeline-smoking-drinking.health_monitoring.data_quality_runs`
- `pipeline-smoking-drinking.health_monitoring.model_promotions`
- `pipeline-smoking-drinking.health_ml.smoking_predictions`
- `pipeline-smoking-drinking.health_ml.drinking_predictions`

## Suggested report pages

1. Pipeline overview
   - latest run status
   - raw vs staging row counts
   - duplicates removed
   - workflow cadence

2. Model performance
   - accuracy by model
   - F1 by model
   - evaluation history over time

3. Data quality
   - latest assertion results
   - failed rows by check

4. Prediction outputs
   - predicted smoking label mix
   - predicted drinking label mix

## Embed into the Astro site

Once the Looker Studio report is shareable, add:

```bash
PUBLIC_LOOKER_STUDIO_EMBED_URL=https://lookerstudio.google.com/embed/reporting/...
PUBLIC_LOOKER_STUDIO_REPORT_URL=https://lookerstudio.google.com/reporting/...
```

The Astro dashboard section will automatically switch from the placeholder card to the embedded iframe.

## Important note

The report itself is not provisioned directly from this repo. The reliable path here is:

1. create the report in Looker Studio
2. connect it to the BigQuery tables above
3. publish/share it
4. paste the embed URL into the Astro environment variables
