export const siteMeta = {
  title: "Smoking and Drinking Prediction",
  description:
    "An Astro site that documents the exploratory analysis, GCP migration, BQML modeling, and monitoring for the health pipeline project.",
};

export const lookerStudioReportUrl =
  "https://lookerstudio.google.com/reporting/52df4c88-9a16-4b51-a83c-d2eb29cbbc38/page/p_hf9owv8e2d";

export const lookerStudioEmbedUrl = lookerStudioReportUrl.replace(
  "/reporting/",
  "/embed/reporting/",
);

export const projectLinks = [
  {
    label: "Kaggle Dataset",
    href: "https://www.kaggle.com/datasets/sooyoungher/smoking-drinking-dataset",
  },
  {
    label: "Looker Studio Report",
    href: lookerStudioReportUrl,
  },
  {
    label: "BigQuery ML Docs",
    href: "https://cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-random-forest",
  },
  {
    label: "Workflows Docs",
    href: "https://cloud.google.com/workflows/docs",
  },
];

export const architectureFlow = [
  "Cloud Storage landing bucket",
  "BigQuery raw table",
  "Dataform staging + assertions",
  "Feature tables in BigQuery",
  "BigQuery ML training",
  "Prediction + monitoring tables",
  "Workflows orchestration",
  "Cloud Scheduler automation",
];

export const modelContextNotes = [
  "The deployed cloud models are not the same execution path as the original notebook. They retrain in BigQuery ML after Dataform refreshes the feature tables.",
  "The current smoking model uses drinking status as a feature, and the drinking model uses smoking status as a feature. The playground exposes those context inputs explicitly so the model behavior is truthful.",
  "The cloud pipeline keeps nearly the full dataset instead of dropping more than a third of rows with a blanket IQR filter.",
];

export const dashboardNotes = [
  "The site now ships with the public Looker Studio report already wired into the dashboard section.",
  "Visitors can move across the report's multiple pages inside the embed or open the same report in a new tab.",
  "The surrounding cards still summarize the latest pipeline snapshot so the report and the project narrative stay connected.",
];

export const edaFigures = [
  {
    src: "eda/sex-distribution.png",
    alt: "Notebook plot showing the sex distribution in the dataset.",
    title: "Sex distribution",
    summary:
      "The dataset is relatively balanced by sex, with a slight male majority. That makes the exploratory comparisons more trustworthy across the two groups.",
  },
  {
    src: "eda/smoking-distribution.png",
    alt: "Notebook bar chart showing smoking status counts.",
    title: "Smoking status distribution",
    summary:
      "Most individuals are in the never-smoked class, while current and former smokers remain large enough to support supervised classification.",
  },
  {
    src: "eda/drinking-distribution.png",
    alt: "Notebook bar chart showing drinking status counts.",
    title: "Drinking status distribution",
    summary:
      "Drinking is almost perfectly balanced between drinkers and non-drinkers, which is one reason the drinking model is the more stable classifier.",
  },
  {
    src: "eda/age-by-drinking.png",
    alt: "Notebook age distribution plot split by drinking status.",
    title: "Age distribution by drinking status",
    summary:
      "Drinking peaks through the 30-50 age range, then declines after the mid-50s. The non-drinker group becomes more prominent in older ages.",
  },
  {
    src: "eda/age-by-smoking.png",
    alt: "Notebook age distribution plot split by smoking status.",
    title: "Age distribution by smoking status",
    summary:
      "Current smoking is strongest in earlier adulthood, while the quit-smoking class becomes more visible as age increases.",
  },
  {
    src: "eda/outlier-counts.png",
    alt: "Notebook bar chart with the number of IQR outliers per numeric feature.",
    title: "Outlier counts by variable",
    summary:
      "The notebook's blanket IQR filter flagged many rows across liver and metabolic variables. That visualization was useful diagnostically, but it was too aggressive for production cleaning.",
  },
];

export const sampleRows = [
  {
    index: 0,
    Sex: "Male",
    Age: 35,
    Height: 170,
    Weight: 75,
    Waistline: 90.0,
    "Sight Left": 1.0,
    "Sight Right": 1.0,
    "Hear Left": 1.0,
    "Hear Right": 1.0,
    SBP: 120.0,
    DBP: 80.0,
    BLDS: 99.0,
    "Total Cholesterol": 193.0,
    "HDL Cholesterol": 48.0,
    "LDL Cholesterol": 126.0,
    Triglyceride: 92.0,
    Hemoglobin: 17.1,
    "Urine Protein": 1.0,
    "Serum Creatinine": 1.0,
    "SGOT AST": 21.0,
    "SGOT ALT": 35.0,
    "Gamma GTP": 40.0,
    "Smoking Status": 1.0,
    "Drinking Status": "Y",
  },
  {
    index: 1,
    Sex: "Male",
    Age: 30,
    Height: 180,
    Weight: 80,
    Waistline: 89.0,
    "Sight Left": 0.9,
    "Sight Right": 1.2,
    "Hear Left": 1.0,
    "Hear Right": 1.0,
    SBP: 130.0,
    DBP: 82.0,
    BLDS: 106.0,
    "Total Cholesterol": 228.0,
    "HDL Cholesterol": 55.0,
    "LDL Cholesterol": 148.0,
    Triglyceride: 121.0,
    Hemoglobin: 15.8,
    "Urine Protein": 1.0,
    "Serum Creatinine": 0.9,
    "SGOT AST": 20.0,
    "SGOT ALT": 36.0,
    "Gamma GTP": 27.0,
    "Smoking Status": 3.0,
    "Drinking Status": "N",
  },
  {
    index: 2,
    Sex: "Male",
    Age: 40,
    Height: 165,
    Weight: 75,
    Waistline: 91.0,
    "Sight Left": 1.2,
    "Sight Right": 1.5,
    "Hear Left": 1.0,
    "Hear Right": 1.0,
    SBP: 120.0,
    DBP: 70.0,
    BLDS: 98.0,
    "Total Cholesterol": 136.0,
    "HDL Cholesterol": 41.0,
    "LDL Cholesterol": 74.0,
    Triglyceride: 104.0,
    Hemoglobin: 15.8,
    "Urine Protein": 1.0,
    "Serum Creatinine": 0.9,
    "SGOT AST": 47.0,
    "SGOT ALT": 32.0,
    "Gamma GTP": 68.0,
    "Smoking Status": 1.0,
    "Drinking Status": "N",
  },
  {
    index: 3,
    Sex: "Male",
    Age: 50,
    Height: 175,
    Weight: 80,
    Waistline: 91.0,
    "Sight Left": 1.5,
    "Sight Right": 1.2,
    "Hear Left": 1.0,
    "Hear Right": 1.0,
    SBP: 145.0,
    DBP: 87.0,
    BLDS: 95.0,
    "Total Cholesterol": 201.0,
    "HDL Cholesterol": 76.0,
    "LDL Cholesterol": 104.0,
    Triglyceride: 106.0,
    Hemoglobin: 17.6,
    "Urine Protein": 1.0,
    "Serum Creatinine": 1.1,
    "SGOT AST": 29.0,
    "SGOT ALT": 34.0,
    "Gamma GTP": 18.0,
    "Smoking Status": 1.0,
    "Drinking Status": "N",
  },
  {
    index: 4,
    Sex: "Male",
    Age: 50,
    Height: 165,
    Weight: 60,
    Waistline: 80.0,
    "Sight Left": 1.0,
    "Sight Right": 1.2,
    "Hear Left": 1.0,
    "Hear Right": 1.0,
    SBP: 138.0,
    DBP: 82.0,
    BLDS: 101.0,
    "Total Cholesterol": 199.0,
    "HDL Cholesterol": 61.0,
    "LDL Cholesterol": 117.0,
    Triglyceride: 104.0,
    Hemoglobin: 13.8,
    "Urine Protein": 1.0,
    "Serum Creatinine": 0.8,
    "SGOT AST": 19.0,
    "SGOT ALT": 12.0,
    "Gamma GTP": 25.0,
    "Smoking Status": 1.0,
    "Drinking Status": "N",
  },
];

export const variableDescriptions = [
  ["sex", "Gender encoded in the source data as Male or Female."],
  ["age", "Age rounded to the nearest 5 years."],
  ["height", "Height rounded to the nearest 5 cm."],
  ["weight", "Weight in kilograms."],
  ["waistline", "Waist circumference measurement."],
  ["sight_left", "Visual acuity of the left eye."],
  ["sight_right", "Visual acuity of the right eye."],
  ["hear_left", "Hearing status of the left ear."],
  ["hear_right", "Hearing status of the right ear."],
  ["SBP", "Systolic blood pressure in mmHg."],
  ["DBP", "Diastolic blood pressure in mmHg."],
  ["BLDS", "Fasting blood glucose in mg/dL."],
  ["tot_chole", "Total cholesterol level."],
  ["HDL_chole", "HDL cholesterol level."],
  ["LDL_chole", "LDL cholesterol level."],
  ["triglyceride", "Triglyceride level."],
  ["hemoglobin", "Hemoglobin concentration in the blood."],
  ["urine_protein", "Urine protein score."],
  ["serum_creatinine", "Serum creatinine level."],
  ["SGOT_AST", "Aspartate aminotransferase level."],
  ["SGOT_ALT", "Alanine aminotransferase level."],
  ["gamma_GTP", "Gamma-glutamyl transferase level."],
  ["SMK_stat_type_cd", "Smoking status: never, quit, or still smoking."],
  ["DRK_YN", "Whether the individual drinks alcohol."],
];

export const references = [
  "Dumortier, A., Beckjord, E., Shiffman, S., & Sejdic, E. (2016). Classifying smoking urges via machine learning.",
  "Yavuz, O. (2022). Analyzing influence of smoking and alcohol drinking behaviors on body type with deep learning, machine learning and data mining techniques.",
  "Smoking and drinking dataset with body signals, National Health Insurance Service in Korea via Kaggle.",
];
