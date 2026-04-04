# Health Pipeline Dataform

An Astro showcase for the smoking and drinking prediction project. The site combines:

- exploratory analysis from the original notebook
- the current GCP pipeline state from `pipeline-smoking-drinking`
- live BigQuery ML predictions through an Astro API route
- dashboard-ready SQL and Looker Studio embed support

The notebook is now an exploratory artifact only. The production story in this project is BigQuery, Dataform, BigQuery ML, Workflows, Cloud Scheduler, and Looker Studio.

## What is in this repo

- `src/`: Astro pages, components, styles, and the live prediction API route
- `scripts/generate-site-data.mjs`: refreshes the site snapshot from BigQuery, Workflows, and Scheduler
- `sql/dashboard/`: reusable SQL for dashboard-facing views
- `docs/looker-studio.md`: how to connect Looker Studio and embed it into the site
- `workflows/health_pipeline.yaml`: current workflow definition used by the cloud pipeline
- `notebooks/DMproject.ipynb`: the original exploratory notebook retained as historical context

## Local development

```bash
npm install
npm run sync:data
npm run sync:eda
npm run dev
```

Then open `http://localhost:4321`.

## Live prediction requirements

The `/api/predict` endpoint uses BigQuery ML directly. For it to work:

- `gcloud auth application-default login` must be set up locally, or
- the deployed environment must have a service account with access to BigQuery

Default project assumptions:

- project: `pipeline-smoking-drinking`
- location: `us-central1`

Override them with:

- `GCP_PROJECT_ID`
- `GCP_LOCATION`

## GitHub Pages deployment

This repo includes a dedicated `npm run build:pages` flow plus a GitHub Actions workflow for
Pages. The Pages version is intentionally static:

- it publishes the project story, dashboard, and the 5-person prediction demo
- it does **not** run `/api/predict`, because GitHub Pages cannot host Astro server endpoints

If you want the live manual predictor, run the site locally with `npm run dev` or deploy the
server build to a backend platform.

## Dataset file

The raw CSV is intentionally ignored in git because it exceeds GitHub's file-size limit. Keep it
local and use the generated site snapshot plus notebook assets that are already tracked in the repo.

## Optional Looker Studio embed

If you create a public Looker Studio report, add:

```bash
PUBLIC_LOOKER_STUDIO_EMBED_URL=https://lookerstudio.google.com/embed/reporting/...
PUBLIC_LOOKER_STUDIO_REPORT_URL=https://lookerstudio.google.com/reporting/...
```

The site already includes a built-in dashboard section, so the embed is additive rather than required.
