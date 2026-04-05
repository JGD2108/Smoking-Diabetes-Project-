export const siteMeta = {
  title:
    "Predicting Smoking and Alcohol Consumption Behaviors Through Biometric Indicators: A Machine Learning Approach on National Health Data",
  description:
    "A formal academic research page presenting exploratory analysis, predictive modeling, and health-signal interpretation for smoking and alcohol consumption behaviors in NHIS Korea data.",
};

export const lookerStudioReportUrl =
  "https://lookerstudio.google.com/reporting/52df4c88-9a16-4b51-a83c-d2eb29cbbc38/page/p_hf9owv8e2d";

export const lookerStudioEmbedUrl = lookerStudioReportUrl.replace(
  "/reporting/",
  "/embed/reporting/",
);

export const studyHeader = {
  title:
    "Predicting Smoking and Alcohol Consumption Behaviors Through Biometric Indicators: A Machine Learning Approach on National Health Data",
  subtitle:
    "Exploratory analysis, predictive modeling, and interpretation of biometric signals across 991,346 records from the Korean National Health Insurance Service",
  badge: "Applied Research Project",
  publicationDate: "April 2026",
  dataSource: "NHIS Korea / Kaggle",
};

export const studyOverviewRows = [
  ["Publication date", "April 2026"],
  ["Data source", "Korean National Health Insurance Service screening records distributed through Kaggle"],
  ["Study population", "991,346 anonymized adult health screening observations"],
  ["Primary outcomes", "Smoking status (never, former, current) and alcohol consumption status (yes/no)"],
  ["Analytical approach", "Exploratory data analysis, random-forest classification, and warehouse-based monitoring"],
];

export const externalResources = [
  {
    label: "Kaggle dataset",
    href: "https://www.kaggle.com/datasets/sooyoungher/smoking-drinking-dataset",
  },
  {
    label: "Looker Studio dashboard",
    href: lookerStudioReportUrl,
  },
];

export const tableOfContents = [
  { id: "introduction", label: "1. Introduction" },
  { id: "dataset", label: "2. Dataset Description" },
  { id: "eda", label: "3. Exploratory Data Analysis" },
  { id: "pipeline", label: "4. System Architecture & Data Pipeline" },
  { id: "models", label: "5. Predictive Models & Results" },
  { id: "dashboard", label: "6. Interactive Dashboard" },
  { id: "explorer", label: "7. Prediction Explorer" },
  { id: "conclusions", label: "8. Conclusions" },
  { id: "references", label: "9. References" },
];

export const abstractText =
  "This applied research project examined whether routinely collected biometric indicators can be used to predict smoking status and alcohol consumption behavior at population scale. The study analyzed 991,346 anonymized records from the Korean National Health Insurance Service, including anthropometric, cardiovascular, metabolic, and hepatic measurements. Exploratory analysis was conducted to characterize behavioral patterns across sex, age, and laboratory markers, after which random-forest classifiers were trained for smoking and drinking outcomes. The resulting models achieved approximately 70.3% accuracy for smoking classification and 73.3% accuracy for drinking classification, indicating moderate but operationally useful discriminative performance. Feature-importance patterns suggested that waistline, fasting glucose, triglycerides, cholesterol fractions, hemoglobin, and liver-related enzymes carry meaningful predictive information. A monitored data pipeline and an interactive dashboard were then used to expose the findings in a reproducible format. The results indicate that biometric screening data can support behavior-oriented risk stratification, while also underscoring the limitations of observational data and non-causal inference.";

export const introductionParagraphs = [
  "Smoking and harmful alcohol consumption remain among the most consequential modifiable behavioral risk factors in public health. Both behaviors are associated with substantial burdens of cardiovascular disease, cancer, hepatic dysfunction, metabolic disturbance, and premature mortality. Because these exposures are also entangled with social, demographic, and physiological variation, they present an analytically important setting for population-level predictive modeling.",
  "The present study was designed to examine whether routinely collected biometric indicators can be used to distinguish smoking and alcohol consumption behaviors within a large national screening dataset. Three research questions guided the work: first, which biometric variables exhibit the clearest population-level variation across smoking and drinking groups; second, to what extent can supervised machine-learning models classify those behaviors from health screening variables; and third, how should the resulting model outputs be interpreted in light of practical deployment constraints and epidemiologic limitations.",
  "Machine-learning methods were selected because the relationships among body measurements, laboratory values, and health behaviors are unlikely to be purely linear. Ensemble methods, particularly random-forest classifiers, offer a useful compromise between predictive power, robustness to mixed variable types, and interpretability through feature-importance summaries. Such methods are therefore well suited to exploratory health-behavior prediction tasks in which signal may be distributed across multiple correlated biomarkers.",
  "The remainder of this document is organized as follows. Section 2 describes the NHIS-Korea dataset and the variables used in the analysis. Section 3 presents the exploratory data analysis. Section 4 documents the system architecture and data pipeline. Section 5 reports predictive model performance and interpretive results. Section 6 introduces the interactive dashboard, Section 7 summarizes representative profile predictions, and Sections 8 and 9 provide conclusions and references, respectively.",
];

export const datasetParagraphs = [
  "The dataset was obtained from a public Kaggle release based on Korean National Health Insurance Service screening records. It contains large-scale adult health measurements derived from routine examinations, including anthropometric measures, blood pressure, visual and auditory screening values, serum biomarkers, and two behavioral labels related to smoking and alcohol use. The volume of observations enables subgroup comparisons with substantial statistical support and improves the stability of downstream descriptive and predictive analyses.",
  "Although the dataset should not be interpreted as a perfectly representative portrait of all populations or all health systems, its scale and standardized screening origin make it especially valuable for studying broad associations between measurable physiological indicators and self-reported behaviors. The data were released in anonymized form, and no directly identifying information is present in the project repository. Accordingly, the analysis is framed as a secondary study of de-identified records, suitable for methodological and educational research rather than clinical decision-making.",
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

export const variableSchema = [
  ["sex", "Categorical", "Administrative sex variable used for stratification and modeling.", "None"],
  ["age", "Integer", "Age grouped in five-year increments at the time of screening.", "Years"],
  ["height", "Integer", "Standing body height rounded to screening intervals.", "cm"],
  ["weight", "Integer", "Body weight recorded at the screening examination.", "kg"],
  ["waistline", "Continuous", "Waist circumference used as a marker of central adiposity.", "cm"],
  ["sight_left", "Continuous", "Visual acuity recorded for the left eye.", "Acuity score"],
  ["sight_right", "Continuous", "Visual acuity recorded for the right eye.", "Acuity score"],
  ["hear_left", "Binary", "Hearing screening result for the left ear.", "Screening code"],
  ["hear_right", "Binary", "Hearing screening result for the right ear.", "Screening code"],
  ["SBP", "Continuous", "Systolic blood pressure.", "mmHg"],
  ["DBP", "Continuous", "Diastolic blood pressure.", "mmHg"],
  ["BLDS", "Continuous", "Fasting blood glucose level.", "mg/dL"],
  ["tot_chole", "Continuous", "Total cholesterol concentration.", "mg/dL"],
  ["HDL_chole", "Continuous", "High-density lipoprotein cholesterol concentration.", "mg/dL"],
  ["LDL_chole", "Continuous", "Low-density lipoprotein cholesterol concentration.", "mg/dL"],
  ["triglyceride", "Continuous", "Serum triglyceride concentration.", "mg/dL"],
  ["hemoglobin", "Continuous", "Hemoglobin concentration.", "g/dL"],
  ["urine_protein", "Ordinal", "Urine protein screening category.", "Ordinal score"],
  ["serum_creatinine", "Continuous", "Serum creatinine concentration.", "mg/dL"],
  ["SGOT_AST", "Continuous", "Aspartate aminotransferase biomarker.", "U/L"],
  ["SGOT_ALT", "Continuous", "Alanine aminotransferase biomarker.", "U/L"],
  ["gamma_GTP", "Continuous", "Gamma-glutamyl transferase biomarker.", "U/L"],
  ["SMK_stat_type_cd", "Categorical", "Smoking-status class indicating never, former, or current smoking.", "None"],
  ["DRK_YN", "Binary", "Alcohol consumption indicator.", "Yes/No"],
];

export const edaFigures = [
  {
    number: 1,
    src: "eda/sex-distribution.png",
    alt: "Bar chart showing the distribution of male and female records in the dataset.",
    title: "Sex distribution",
    caption:
      "Distribution of records by sex in the NHIS-Korea screening dataset, showing a slight male predominance.",
    analysis:
      "The sex distribution remains relatively balanced, with men accounting for 53.1% of observations and women 46.9%. This balance is analytically useful because it reduces the risk that downstream behavioral patterns are driven entirely by one demographic subgroup. It also supports the interpretation of later biomarker differences as broad population signals rather than artifacts of extreme sampling imbalance.",
  },
  {
    number: 2,
    src: "eda/smoking-distribution.png",
    alt: "Bar chart showing counts for never smokers, former smokers, and current smokers.",
    title: "Smoking status distribution",
    caption:
      "Observed distribution of smoking-status classes, with the never-smoking group forming the majority class.",
    analysis:
      "Smoking status is unevenly distributed across the cohort, with never smokers representing approximately 60.8% of observations, current smokers 21.6%, and former smokers 17.6%. This class structure is important because it reflects a realistic epidemiologic imbalance while still preserving sufficient representation in all three groups for supervised classification. The former-smoker class is notably smaller and therefore likely to be more difficult to separate cleanly from the adjacent never- and current-smoking classes.",
  },
  {
    number: 3,
    src: "eda/drinking-distribution.png",
    alt: "Bar chart showing counts for drinking and non-drinking groups.",
    title: "Drinking status distribution",
    caption:
      "Distribution of the binary alcohol-consumption label, showing an almost equal split between drinkers and non-drinkers.",
    analysis:
      "The alcohol label is close to perfectly balanced, with approximately half of the cohort classified as drinkers and half as non-drinkers. This balance is advantageous from a predictive perspective because the drinking classifier is not forced to learn from a severely skewed outcome. It also suggests that the decision boundary for alcohol consumption is more likely to reflect physiological and demographic signal than simple majority-class dominance.",
  },
  {
    number: 4,
    src: "eda/age-by-drinking.png",
    alt: "Age distribution plot split by alcohol consumption status.",
    title: "Age distribution by drinking status",
    caption:
      "Age-profile comparison between drinkers and non-drinkers across the adult screening population.",
    analysis:
      "Alcohol consumption is more prominent in early and middle adulthood than in older age categories. The drinker group expands through the thirties and forties before declining in later age bands, whereas non-drinkers become relatively more prevalent among older adults. This pattern is consistent with a life-course interpretation in which social and occupational contexts shape alcohol exposure differently across age strata.",
  },
  {
    number: 5,
    src: "eda/age-by-smoking.png",
    alt: "Age distribution plot split by smoking history.",
    title: "Age distribution by smoking status",
    caption:
      "Age-profile comparison among never smokers, former smokers, and current smokers.",
    analysis:
      "Current smoking is concentrated more strongly in younger and middle-aged adults, while the former-smoker group becomes more visible with increasing age. That shift is epidemiologically plausible because smoking cessation accumulates over the life course. The figure therefore suggests that age is not merely a background demographic covariate but part of the behavioral transition structure linking initiation, continuation, and cessation.",
  },
  {
    number: 6,
    src: "eda/outlier-counts.png",
    alt: "Bar chart showing counts of high-variability or outlying observations across numeric variables.",
    title: "Outlier counts by variable",
    caption:
      "Relative concentration of extreme values across laboratory and metabolic variables in the dataset.",
    analysis:
      "The distribution of outlying observations is especially pronounced in metabolic and hepatic indicators, including triglycerides and liver-enzyme-related features. Such dispersion is analytically meaningful because the same biomarkers are often implicated in alcohol exposure, metabolic syndrome, and smoking-associated physiologic stress. The figure therefore highlights where clinically relevant heterogeneity is concentrated within the cohort and where models may be learning the strongest behavior-linked separation.",
  },
];

export const edaSummary =
  "Taken together, the exploratory analysis indicates that smoking and drinking behaviors are not randomly distributed across the population and that the cohort is analytically well behaved for downstream modeling. Retention after validation is effectively complete, sex composition is broad rather than extreme, the drinking target is almost perfectly balanced, and the smoking target remains realistically imbalanced because former smokers occupy a narrower intermediate class. Age patterns further reveal a crossover in alcohol prevalence around age 50 and a lagged transition from current smoking to former smoking in later adulthood. At the biomarker level, the strongest heterogeneity appears in metabolic and hepatic measures, supporting the later finding that lipid, glucose, adiposity, hemoglobin, and liver-related variables contribute prominently to classification performance.";

export const pipelineParagraphs = [
  "The analytical workflow was implemented as a warehouse-centered pipeline in which raw health records were ingested, validated, transformed into feature-ready tables, and then passed to predictive models and monitoring outputs. This architecture reflects a lightweight MLOps pattern in which data engineering, model execution, and reporting are coordinated through scheduled cloud services rather than ad hoc local scripts.",
  "From a systems perspective, the pipeline was designed to ensure reproducibility, data-quality traceability, and predictable refresh behavior. The separation between staging, feature generation, prediction outputs, and monitoring tables permits each analytical stage to be inspected independently while also supporting dashboard publication and future retraining. The resulting structure is appropriate for an applied research setting in which methodological transparency and operational continuity are both required.",
];

export const pipelineStages = [
  [
    "Data ingestion",
    "Raw NHIS-derived records are loaded into warehouse storage for controlled downstream processing.",
    "Cloud Storage, BigQuery raw tables",
    "Per scheduled refresh",
  ],
  [
    "Quality screening",
    "Duplicate records and invalid values are detected before records are promoted to clean staging tables.",
    "Dataform assertions, BigQuery validation logic",
    "Per scheduled refresh",
  ],
  [
    "Staging transformation",
    "Validated records are standardized into analysis-ready staging tables.",
    "Dataform, BigQuery SQL",
    "Per scheduled refresh",
  ],
  [
    "Feature preparation",
    "Smoking and drinking feature tables are generated from the staged data for model input.",
    "BigQuery feature tables",
    "Per scheduled refresh",
  ],
  [
    "Model training and scoring",
    "Random-forest classifiers are executed and prediction tables are refreshed.",
    "BigQuery ML",
    "Per scheduled refresh",
  ],
  [
    "Metric logging",
    "Evaluation outputs, promotions, and model-monitoring values are written to monitoring tables.",
    "BigQuery monitoring schema",
    "Per scheduled refresh",
  ],
  [
    "Workflow orchestration",
    "End-to-end execution is coordinated through a managed workflow definition.",
    "Google Cloud Workflows",
    "Weekly",
  ],
  [
    "Publication and reporting",
    "Summary outputs are surfaced to the research website and interactive dashboard.",
    "Astro, Looker Studio",
    "Weekly snapshot with on-demand viewing",
  ],
];

export const featureImportanceInterpretation =
  "Feature-importance rankings indicate that the models draw heavily on cardiometabolic and hepatometabolic signals. Waistline, fasting glucose, triglycerides, systolic blood pressure, and cholesterol measures dominate split frequency, suggesting that adiposity and metabolic burden encode substantial information about both behaviors. At the same time, hemoglobin, HDL cholesterol, and gamma-GTP show high discriminative gain and therefore deserve explicit interpretation. Hemoglobin elevation is physiologically plausible in smoking because chronic carbon monoxide exposure may be associated with compensatory erythropoietic response. HDL cholesterol is behaviorally relevant because both smoking and alcohol use are linked to lipid remodeling, although often in different directions and magnitudes. Gamma-GTP is especially plausible as a signal of alcohol-related hepatic stress and broader metabolic dysregulation. These results suggest that the models are not relying on arbitrary correlates but on biomarkers with interpretable physiological relationships to the target behaviors.";

export const confusionInterpretation = {
  smoking:
    "The smoking confusion matrix shows that the never-smoking class is identified most reliably, whereas former smokers are the most difficult subgroup to classify. This error pattern is expected in a health context because former smokers often retain residual metabolic or vascular signatures that overlap with both never smokers and current smokers. False positives from the never-smoking class into current smoking may therefore reflect individuals whose biomarker profile resembles active exposure, while false negatives among current smokers may arise when physiologic effects are attenuated or partially normalized.",
  drinking:
    "The drinking confusion matrix is more symmetric, with similar counts of false positives and false negatives across drinker and non-drinker categories. In practice, a false positive indicates that a non-drinker exhibits a biomarker pattern resembling the drinking group, whereas a false negative indicates that a drinker presents a comparatively lower-risk metabolic or hepatic profile. The pattern is consistent with alcohol use being partially observable in screening data but not deterministically encoded by biomarkers alone.",
};

export const modelLimitations = [
  "The observed accuracy range of roughly 70% to 73% indicates moderate predictive utility rather than clinical-grade discrimination. The models capture meaningful signal, but a substantial proportion of behavioral variation remains unexplained by the available health-screening variables.",
  "The source cohort is Korean and derived from a specific national screening system. As a consequence, the learned patterns may not generalize without recalibration to populations with different demographic structures, health behaviors, clinical pathways, or laboratory baselines.",
  "The analysis is observational and predictive. Even when physiologically plausible biomarkers are highly ranked, the results do not imply that those variables cause smoking or alcohol use, nor that the behaviors can be inferred with certainty from biometric measurements alone.",
];

export const dashboardParagraph =
  "The interactive dashboard extends the static analysis by enabling readers to inspect the project outputs through a navigable reporting interface. Whereas the main article presents a curated narrative, the dashboard provides an exploratory complement in which model metrics, refresh status, and derived summary views can be consulted directly. This pairing is useful in an applied research setting because it combines the interpretive discipline of a written report with the transparency and flexibility of live reporting panels.";

export const conclusionParagraphs = [
  "This study demonstrated that large-scale biometric screening data can be used to characterize and moderately predict smoking and alcohol consumption behaviors at population scale. By combining exploratory analysis, random-forest classification, and a monitored reporting workflow, the project translated a public health behavior question into a reproducible analytical product. The resulting evidence suggests that health screening variables retain enough structured signal to support probabilistic classification, even when the underlying behaviors remain socially and clinically complex.",
  "Among the two models, the drinking classifier performed slightly better overall, reaching approximately 73.3% accuracy and a stronger F1 score than the smoking classifier. This advantage is likely related to the near-balanced drinking label and to the prominence of hepatic and metabolic variables that track alcohol-associated physiology with comparatively clear signal. Across both models, central adiposity, glucose regulation, triglycerides, cholesterol fractions, hemoglobin, and liver enzymes emerged as the most informative predictors, reinforcing the view that smoking and drinking are embedded within broader cardiometabolic profiles.",
  "From a public health perspective, such models may be useful for stratified surveillance, behavioral-risk screening research, and targeted health communication, especially when integrated into broader decision-support and monitoring systems. Future work should emphasize external validation, population transferability, richer behavioral covariates, and calibration-oriented model design. Additional research should also examine longitudinal data so that cessation, relapse, and incident drinking behaviors can be studied dynamically rather than as static classification problems.",
];

export const references = [
  "Dumortier, A., Beckjord, E., Shiffman, S., & Sejdić, E. (2016). Classifying smoking urges via machine learning. <em>Computer Methods and Programs in Biomedicine, 137</em>, 203–213. https://doi.org/10.1016/j.cmpb.2016.09.016",
  "Yavuz, Ö. (2022). Analyzing influence of smoking and alcohol drinking behaviors on body type with deep learning, machine learning and data mining techniques. <em>Premium E-Journal of Social Science, 6</em>(19), 46–58.",
  "Her, S. (n.d.). <em>Smoking and drinking dataset with body signal</em> [Data set]. Kaggle. https://www.kaggle.com/datasets/sooyoungher/smoking-drinking-dataset",
  "Abo-Tabik, M., Benn, Y., & Costen, N. (2021). Are machine learning methods the future for smoking cessation apps? <em>Sensors, 21</em>(13), Article 4254. https://doi.org/10.3390/s21134254",
  "Bickel, W. K., Tomlinson, D. C., Craft, W. H., Ma, M., Dwyer, C. L., Yeh, Y.-H., Tegge, A. N., Freitas-Lemos, R., & Athamneh, L. N. (2023). Predictors of smoking cessation outcomes identified by machine learning: A systematic review. <em>Addiction Neuroscience, 6</em>, Article 100068. https://doi.org/10.1016/j.addicn.2023.100068",
  "Huang, X., Dai, Z., Wang, K., & Luo, X. (2024). Machine learning-based prediction of binge drinking among adults in the United States: Analysis of the 2022 Health Information National Trends Survey. <em>Proceedings of the 2024 9th International Conference on Mathematics and Artificial Intelligence</em>, 1–10. https://doi.org/10.1145/3670085.3670090",
  "Johnson, K. A., McDaniel, J. T., Okine, J., Graham, H. K., Robertson, E. T., McIntosh, S., Wallace, J., & Albright, D. L. (2024). A machine learning model for the prediction of unhealthy alcohol use among women of childbearing age in Alabama. <em>Alcohol and Alcoholism, 59</em>(2), agad075. https://doi.org/10.1093/alcalc/agad075",
];
