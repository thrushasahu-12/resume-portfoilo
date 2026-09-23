export interface Project {
  id: string;
  num: string;
  title: string;
  type: string;
  githubUrl: string;
  summary: string;
  detailedContext: string;
  datasetStats: {
    rows: string;
    columns: string;
    source: string;
  };
  keyFindings: string[];
  techStack: string[];
  sqlSnippet?: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    highlight?: boolean;
    useCase: string;
  }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  credentialId: string;
  skillsGained: string[];
  date: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Thrusha Sahu",
    role: "Senior Data Analyst",
    location: "Hyderabad, India (Open to Remote)",
    email: "thrusha.sahu96@gmail.com",
    phone: "+91 9502033252",
    linkedin: "https://www.linkedin.com/in/thrusha-sahu-852293152/",
    linkedinHandle: "thrusha-sahu-852293152",
    github: "https://github.com/thrushasahu-12",
    githubHandle: "thrushasahu-12",
    status: "Available for new opportunities",
    bio: "Data Analyst with 3+ years turning messy enterprise data into high-stakes business decisions. Specialist in complex SQL querying, automated Python ETL pipelines, and executive Power BI dashboards — from raw ITSM exports to C-suite scorecards.",
    audioTranscript: "Hi, I'm Thrusha Sahu. I'm a Data Analyst with over 3 years of enterprise experience at ServiceNow through Magnit Global. I specialize in untangling messy datasets with advanced SQL, building automated Python pipelines, and creating Power BI dashboards that drive executive action. Feel free to explore my interactive project consoles below!",
  },
  stats: [
    { value: "3+", label: "Years of Enterprise Experience" },
    { value: "40%", label: "Manual Reporting Effort Automated" },
    { value: "30%", label: "Production Incidents Reduced via RCA" },
    { value: "1M+", label: "Enterprise Records Analyzed" },
  ],
  projects: [
    {
      id: "incident-sla",
      num: "01",
      title: "Incident SLA Breach Analysis",
      type: "SQL · ITSM Analytics · SQLite",
      githubUrl: "https://github.com/thrushasahu-12/Incident-project",
      summary: "Ingested 5,200 raw ServiceNow incident records riddled with duplicates, conflicting date formats, and null timestamps to reconstruct true SLA performance and eliminate reporting discrepancies.",
      detailedContext: "The Operations team suspected SLA breach rates were being systematically under-reported due to flawed default status transitions in legacy ServiceNow export scripts. By building a pure SQL analytics pipeline with chained Common Table Expressions (CTEs) and window functions, I cleansed historical records and delivered verified breach benchmarks to leadership.",
      datasetStats: {
        rows: "5,200 Records",
        columns: "14 Dimensions",
        source: "ServiceNow ITSM Raw DB Export",
      },
      keyFindings: [
        "P1 / Critical incidents had the highest breach rate (48.6%) because 4-hour resolution targets conflicted with multi-tier escalation paths.",
        "Infrastructure and Application Support departments generated over 62% of all volume-based SLA breaches.",
        "15.2% of resolved tickets contained null resolved_at values, falsely marking severe breaches as compliant in upstream tools.",
        "Reopened tickets demonstrated a 28% higher breach rate compared to single-cycle tickets.",
      ],
      techStack: [
        "SQLite",
        "Chained CTEs",
        "ROW_NUMBER() Dedup",
        "JULIANDAY() Diffs",
        "Rolling Averages",
        "RANK() OVER",
        "CASE Normalization",
      ],
      sqlSnippet: `WITH cleaned_incidents AS (
  SELECT
    incident_id,
    priority,
    assignment_group,
    CASE 
      WHEN datetime(created_at) IS NOT NULL THEN datetime(created_at)
      ELSE datetime(substr(created_at, 7, 4) || '-' || substr(created_at, 1, 2) || '-' || substr(created_at, 4, 2))
    END AS clean_created_at,
    COALESCE(datetime(resolved_at), datetime(closed_at)) AS clean_resolved_at,
    reopen_count,
    ROW_NUMBER() OVER (PARTITION BY incident_id ORDER BY sys_updated_on DESC) AS rn
  FROM raw_service_incidents
  WHERE incident_id IS NOT NULL
),
sla_calculations AS (
  SELECT
    incident_id,
    priority,
    assignment_group,
    ROUND((julianday(clean_resolved_at) - julianday(clean_created_at)) * 24.0, 2) AS duration_hours,
    CASE priority
      WHEN 'P1 - Critical' THEN 4.0
      WHEN 'P2 - High'     THEN 8.0
      WHEN 'P3 - Moderate' THEN 24.0
      ELSE 72.0
    END AS sla_target_hours
  FROM cleaned_incidents
  WHERE rn = 1 AND clean_resolved_at IS NOT NULL
)
SELECT 
  priority,
  COUNT(*) AS total_incidents,
  ROUND(AVG(duration_hours), 1) AS avg_duration_hrs,
  SUM(CASE WHEN duration_hours > sla_target_hours THEN 1 ELSE 0 END) AS breaches,
  ROUND(SUM(CASE WHEN duration_hours > sla_target_hours THEN 1.0 ELSE 0.0 END) * 100.0 / COUNT(*), 1) AS breach_rate_pct
FROM sla_calculations
GROUP BY priority
ORDER BY breach_rate_pct DESC;`,
      metrics: [
        { label: "Dataset Cleaned", value: "5,200 rows" },
        { label: "Breach Reporting Accuracy", value: "99.8%" },
        { label: "P1 Breach Uncovered", value: "48.6%" },
        { label: "Ghost Resolutions Fixed", value: "790 tickets" },
      ],
    },
    {
      id: "etl-pipeline",
      num: "02",
      title: "Change Management ETL Pipeline",
      type: "Python · Pandas · SQLite3 · Automated Audit",
      githubUrl: "https://github.com/thrushasahu-12/ETL_Project",
      summary: "Engineered an end-to-end Python ETL pipeline that replaced a 3-hour manual monthly review. Cleanses 5,600-row change request batches, normalizes timestamps, enforces compliance rules, and generates tiered audit reports.",
      detailedContext: "Change Advisory Boards (CAB) were bogged down by messy Excel spreadsheets with disparate date formats, trailing whitespace, and unassigned approvers. This idempotent pipeline performs automated schema validation, logs audit entries, flags compliance risks, and writes clean data into SQLite with zero duplicate risk.",
      datasetStats: {
        rows: "5,600 CSV Rows",
        columns: "18 Attributes",
        source: "Change Management System Exports",
      },
      keyFindings: [
        "Identified and removed 301 duplicate change_ids before any analytical queries ran.",
        "Detected 2,674 records lacking required manager approval (critical SOX compliance vulnerability).",
        "Categorized 11 separate anomaly types into High, Medium, and Low severity risk queues.",
        "Idempotent design guarantees seamless pipeline reruns without database clutter or data duplication.",
      ],
      techStack: [
        "Python 3.11",
        "Pandas",
        "SQLite3",
        "Multi-Format Date Parsing",
        "Audit Trail Logging",
        "DataFrame.to_sql()",
        "Automated DQ Scoring",
      ],
      sqlSnippet: `# Sample Python Pipeline Validation Step
def validate_and_transform(df: pd.DataFrame) -> Tuple[pd.DataFrame, dict]:
    dq_stats = {'duplicates': 0, 'missing_approver': 0, 'normalized_dates': 0}
    
    # 1. Deduplication on natural key
    init_count = len(df)
    df = df.drop_duplicates(subset=['change_id'], keep='last')
    dq_stats['duplicates'] = init_count - len(df)
    
    # 2. Robust Multi-Format Date Normalization
    df['planned_start_dt'] = pd.to_datetime(
        df['planned_start'], 
        format='mixed', 
        errors='coerce'
    )
    
    # 3. High-Severity Compliance Check
    missing_mask = df['approver_id'].isna() | (df['approver_id'] == '')
    dq_stats['missing_approver'] = int(missing_mask.sum())
    df['compliance_risk_tier'] = np.where(missing_mask, 'HIGH', 'NORMAL')
    
    return df, dq_stats`,
      metrics: [
        { label: "Review Time Cut", value: "3h to 45s" },
        { label: "Duplicates Deduplicated", value: "301" },
        { label: "Missing Approvers Caught", value: "2,674" },
        { label: "Pipeline Idempotency", value: "100%" },
      ],
    },
    {
      id: "cohort-retention",
      num: "03",
      title: "Cohort Retention & Trend Analysis",
      type: "SQL · Python · Power BI · DAX",
      githubUrl: "https://github.com/thrushasahu-12/Cohort_Project",
      summary: "End-to-end analyst pipeline: SQL data extraction → Python aggregation → 3-page Power BI dashboard detailing 18-month customer onboarding cohorts and SLA performance stability.",
      detailedContext: "Designed to reveal which onboarding periods generated durable customer retention and how service level compliance evolved over an 18-month span across 5,700 records. Built dynamic DAX measures for Month-over-Month drop-off, dual-axis trend tracking, and cohort retention matrices.",
      datasetStats: {
        rows: "5,700 Records",
        columns: "18 Monthly Cohorts",
        source: "User Onboarding & Support Activity DB",
      },
      keyFindings: [
        "Average 6-month retention stabilized at 54.8%, demonstrating consistent mid-funnel stickiness.",
        "October 2023 was the weakest cohort (dropped 60 percentage points by M6), while November 2023 achieved 75% retention.",
        "Systemic 42.3% SLA breach rate persisted throughout 2023–2024, indicating process bottleneck rather than individual team failure.",
        "Interactive Power BI dashboard featured cohort matrix heatmap, DAX MoM variance measures, and SLA breach correlation scatter plot.",
      ],
      techStack: [
        "SQL Windowing",
        "Python Pandas",
        "Pandas pivot_table",
        "Power BI",
        "DAX Measures",
        "MoM Pct Change",
        "Conditional Heatmaps",
      ],
      sqlSnippet: `-- Cohort Retention Rate Calculation
WITH cohort_sizes AS (
  SELECT 
    cohort_month,
    COUNT(DISTINCT user_id) AS cohort_size
  FROM user_cohorts
  GROUP BY cohort_month
),
retention_activity AS (
  SELECT
    c.cohort_month,
    a.period_month,
    COUNT(DISTINCT a.user_id) AS active_users
  FROM user_cohorts c
  JOIN user_activity a ON c.user_id = a.user_id
  GROUP BY c.cohort_month, a.period_month
)
SELECT
  r.cohort_month,
  r.period_month,
  r.active_users,
  s.cohort_size,
  ROUND((r.active_users * 100.0) / s.cohort_size, 2) AS retention_rate_pct
FROM retention_activity r
JOIN cohort_sizes s ON r.cohort_month = s.cohort_month
ORDER BY r.cohort_month, r.period_month;`,
      metrics: [
        { label: "M6 Avg Retention", value: "54.8%" },
        { label: "Top Cohort (Nov 23)", value: "75.0%" },
        { label: "Tracked Cohorts", value: "18 Months" },
        { label: "SLA Breach Baseline", value: "42.3%" },
      ],
    },
  ],
  skills: [
    {
      title: "Query & Analytics",
      description: "Complex relational queries, analytical window functions, and data aggregation.",
      skills: [
        { name: "SQL", highlight: true, useCase: "Authored multi-CTE queries and window aggregations over 1M+ rows." },
        { name: "Window Functions", highlight: true, useCase: "ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD for sequential and cohort calculations." },
        { name: "Chained CTEs", highlight: true, useCase: "Modular query architectures that simplify complex multi-step transformations." },
        { name: "Query Optimization", highlight: false, useCase: "Optimized indexing, join conditions, and execution plans for faster queries." },
        { name: "Exploratory Data Analysis", highlight: false, useCase: "Surfaced statistical distributions, outliers, and data drift in enterprise telemetry." },
        { name: "Statistical Analysis", highlight: false, useCase: "Mean, median, percentile distribution, and variance modeling on SLA datasets." },
      ],
    },
    {
      title: "Python Data Stack",
      description: "Automating repetitive data pipelines, validation, and schema normalization.",
      skills: [
        { name: "Pandas", highlight: true, useCase: "High-performance vector operations, pivot_tables, and data frame manipulation." },
        { name: "NumPy", highlight: true, useCase: "Array computing and numerical data operations for high-speed normalization." },
        { name: "ETL Pipelines", highlight: true, useCase: "Built resilient, idempotent ingestion and cleaning scripts with audit logs." },
        { name: "Data Validation", highlight: false, useCase: "Automated schema validation, missing data flags, and type casting guards." },
        { name: "Process Automation", highlight: false, useCase: "Reduced manual reporting time from 3 hours to 45 seconds per cycle." },
      ],
    },
    {
      title: "BI & Visualization",
      description: "Translating data insights into executive-ready dashboards and operational scorecards.",
      skills: [
        { name: "Power BI", highlight: true, useCase: "Built 3-page interactive executive dashboards with cohort heatmaps & drilldowns." },
        { name: "DAX", highlight: true, useCase: "Crafted custom time intelligence, MoM variance, and dynamic cohort measures." },
        { name: "Power Query", highlight: true, useCase: "Structured reusable M-code transformations for automated ETL pipelines." },
        { name: "Tableau", highlight: false, useCase: "Created visual analytics, dual-axis charts, and cross-filter dashboards." },
        { name: "KPI Dashboards", highlight: false, useCase: "Executive metrics tracking SLA compliance, team velocity, and incident burn-down." },
        { name: "Looker & Qlik", highlight: false, useCase: "Enterprise BI modeling, data dictionary alignment, and ad-hoc visual queries." },
      ],
    },
    {
      title: "Cloud & Warehouse Data",
      description: "Navigating enterprise cloud data ecosystems, storage, and governance.",
      skills: [
        { name: "AWS Redshift", highlight: true, useCase: "Queried petabyte-scale cloud data warehouses with distribution keys." },
        { name: "Google BigQuery", highlight: true, useCase: "Executed serverless SQL queries on partitioned enterprise analytics tables." },
        { name: "AWS S3", highlight: false, useCase: "Extracted and staged raw CSV and JSON objects in enterprise data lakes." },
        { name: "Data Modeling", highlight: false, useCase: "Star and snowflake schema design for Kimball-style dimensional reporting." },
        { name: "Data Governance", highlight: false, useCase: "Enforced compliance, RBAC audit trails, and data dictionary consistency." },
        { name: "Snowflake", highlight: false, useCase: "Zero-copy cloning and virtual warehouse querying for analytics." },
      ],
    },
    {
      title: "Tools & Methods",
      description: "Core analytical frameworks, spreadsheet mastery, and team collaboration tools.",
      skills: [
        { name: "Advanced Excel", highlight: true, useCase: "Power Pivot, dynamic array formulas, nested XLOOKUP, and complex SUMIFS." },
        { name: "Cohort Analysis", highlight: false, useCase: "Tracked multi-month retention trends and onboarding drop-off points." },
        { name: "RCA Frameworks", highlight: false, useCase: "Root cause analysis methodologies that slashed repeat production defects by 30%." },
        { name: "JIRA & Confluence", highlight: false, useCase: "Sprint tracking, ticket analysis, and technical documentation." },
        { name: "Git & GitHub", highlight: false, useCase: "Version control for analytical codebases, SQL scripts, and documentation." },
      ],
    },
    {
      title: "AI & Modern Workflows",
      description: "Leveraging state-of-the-art AI tooling to accelerate analytics and reporting.",
      skills: [
        { name: "GitHub Copilot", highlight: false, useCase: "Code acceleration for Python ETL scripts and regex pattern definitions." },
        { name: "Prompt Engineering", highlight: false, useCase: "Crafting structured prompts for rapid query drafting and data synthesis." },
        { name: "n8n Automation", highlight: false, useCase: "Workflow automation connecting webhook alerts to reporting pipelines." },
        { name: "LLM Data Assistants", highlight: false, useCase: "Automated report summarization and preliminary data anomaly classification." },
      ],
    },
  ],
  experience: {
    role: "Data Analyst",
    company: "Magnit Global Pvt Ltd (Client: ServiceNow)",
    period: "2022 – 2025",
    location: "Hyderabad, India",
    overview: "3+ years embedded in enterprise data workflows at ServiceNow, collaborating directly with IT Service Management, engineering leads, and business operations to surface trends, eliminate operational bottlenecks, and automate core reporting.",
    bullets: [
      "Analyzed millions of enterprise records across ServiceNow ITSM to surface trends, anomalies, and business opportunities supporting data-driven decisions during executive reviews.",
      "Developed advanced SQL queries utilizing Joins, Chained CTEs, Window Functions, and Multi-Level Aggregations for mission-critical validation and ad-hoc analysis at scale.",
      "Built and maintained production Power BI and Tableau dashboards tracking KPIs, operational performance, customer engagement, and SLA benchmarks.",
      "Automated reporting and data validation utilizing Python (Pandas), SQL, and Power Query — slashing manual weekly analyst effort by 40%.",
      "Designed scalable ETL workflows and reusable Power Query transformations for automated extraction, cleansing, and warehouse loading.",
      "Performed cohort, funnel, retention, and time-series trend analysis to isolate customer behavior patterns and conversion opportunities.",
      "Implemented automated data quality monitoring protocols to detect duplicates, null values, schema mismatches, and compliance violations.",
      "Managed and queried reporting datasets across AWS S3, Amazon Redshift, and BigQuery cloud data environments.",
    ],
    highlights: [
      { num: "40%", label: "Manual Effort Reduced via Python & Power Query Automation" },
      { num: "30%", label: "Production Incidents Reduced Through Systematic Root Cause Analysis" },
      { num: "25%", label: "Data Quality Improvement Across Ingested Reporting Feeds" },
      { num: "1M+", label: "Enterprise Records Cleansed, Modeled & Reported to Leadership" },
    ],
  },
  certifications: [
    {
      id: "cert-1",
      title: "Advanced Functions and Data Analysis in Microsoft Excel",
      issuer: "Microsoft Professional Certification",
      credentialId: "MS-EXCEL-ADV-2024",
      skillsGained: ["Advanced Modeling", "Dynamic Arrays", "Power Query", "Statistical Functions"],
      date: "Verified Professional Credential",
    },
    {
      id: "cert-2",
      title: "Enabling Technologies for Data Science and Analytics",
      issuer: "edX Verified Professional Certificate",
      credentialId: "EDX-DATASCI-VERIFIED",
      skillsGained: ["Cloud Infrastructure", "Relational Databases", "Python for Analytics", "Data Cleaning"],
      date: "Verified Professional Credential",
    },
    {
      id: "cert-3",
      title: "Enterprise Data Tracking with Microsoft Office Excel",
      issuer: "Microsoft Certified Application Specialist",
      credentialId: "MCAS-DATA-TRACK-ENT",
      skillsGained: ["Data Auditing", "KPI Scorecards", "Data Governance", "Pivot Table Architecture"],
      date: "Certified Specialist",
    },
  ],
};
