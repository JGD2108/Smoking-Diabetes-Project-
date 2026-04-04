export const siteMeta = {
  title: "Smoking and Drinking Prediction",
  description:
    "An interactive experience for exploring health patterns, predictive signals, and dashboard insights around smoking and drinking behavior.",
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
];

export const architectureFlow = [
  "Health screening records",
  "Quality screening",
  "Feature preparation",
  "Behavior modeling",
  "Prediction summaries",
  "Monitoring checks",
  "Scheduled refreshes",
  "Interactive reporting",
];

export const modelContextNotes = [
  "Smoking and drinking patterns are shown side by side so visitors can compare how both behaviors relate to the same health profile.",
  "The detailed form includes lifestyle context fields to keep each prediction aligned with the information already known about a person.",
  "Predictions are directional estimates based on population patterns and should be interpreted as behavioral signals, not as medical diagnoses.",
];

export const dashboardNotes = [
  "Browse multiple dashboard pages directly inside the site without losing context.",
  "Open the report in a new tab whenever you want more room for filtering, comparison, or presentation.",
  "The surrounding summary cards highlight model accuracy, refresh cadence, and overall system status at a glance.",
];

export const edaFigures = [
  {
    src: "eda/sex-distribution.png",
    alt: "Chart showing the sex distribution in the dataset.",
    title: "Sex distribution",
    summary:
      "The dataset is relatively balanced by sex, with a slight male majority. That makes the exploratory comparisons more trustworthy across the two groups.",
  },
  {
    src: "eda/smoking-distribution.png",
    alt: "Bar chart showing smoking status counts.",
    title: "Smoking status distribution",
    summary:
      "Most individuals are in the never-smoked class, while current and former smokers remain large enough to support supervised classification.",
  },
  {
    src: "eda/drinking-distribution.png",
    alt: "Bar chart showing drinking status counts.",
    title: "Drinking status distribution",
    summary:
      "Drinking is almost perfectly balanced between drinkers and non-drinkers, which is one reason the drinking model is the more stable classifier.",
  },
  {
    src: "eda/age-by-drinking.png",
    alt: "Age distribution plot split by drinking status.",
    title: "Age distribution by drinking status",
    summary:
      "Drinking peaks through the 30-50 age range, then declines after the mid-50s. The non-drinker group becomes more prominent in older ages.",
  },
  {
    src: "eda/age-by-smoking.png",
    alt: "Age distribution plot split by smoking status.",
    title: "Age distribution by smoking status",
    summary:
      "Current smoking is strongest in earlier adulthood, while the quit-smoking class becomes more visible as age increases.",
  },
  {
    src: "eda/outlier-counts.png",
    alt: "Bar chart showing the number of unusual values across numeric features.",
    title: "Outlier counts by variable",
    summary:
      "Liver and metabolic measures show the widest spread in the population, highlighting where individuals tend to differ most strongly from one another.",
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
