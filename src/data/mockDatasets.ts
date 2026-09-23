export interface IncidentRecord {
  incident_id: string;
  priority: 'P1 - Critical' | 'P2 - High' | 'P3 - Moderate' | 'P4 - Low';
  category: 'Network' | 'Software' | 'Database' | 'Hardware' | 'Security' | 'Service';
  assignment_group: 'Infrastructure' | 'Application Support' | 'Database Admin' | 'SecOps' | 'Service Desk';
  duration_hours: number;
  sla_target_hours: number;
  is_breached: boolean;
  reopen_count: number;
  created_at: string;
  resolved_at: string | null;
  had_null_resolved: boolean;
}

export const SAMPLE_INCIDENTS: IncidentRecord[] = [
  { incident_id: "INC094821", priority: "P1 - Critical", category: "Network", assignment_group: "Infrastructure", duration_hours: 6.8, sla_target_hours: 4.0, is_breached: true, reopen_count: 2, created_at: "2024-03-12 08:14", resolved_at: "2024-03-12 15:02", had_null_resolved: false },
  { incident_id: "INC094822", priority: "P1 - Critical", category: "Software", assignment_group: "Application Support", duration_hours: 5.4, sla_target_hours: 4.0, is_breached: true, reopen_count: 1, created_at: "2024-03-12 09:20", resolved_at: "2024-03-12 14:44", had_null_resolved: false },
  { incident_id: "INC094823", priority: "P2 - High", category: "Database", assignment_group: "Database Admin", duration_hours: 7.2, sla_target_hours: 8.0, is_breached: false, reopen_count: 0, created_at: "2024-03-12 10:05", resolved_at: "2024-03-12 17:17", had_null_resolved: false },
  { incident_id: "INC094824", priority: "P3 - Moderate", category: "Hardware", assignment_group: "Service Desk", duration_hours: 19.5, sla_target_hours: 24.0, is_breached: false, reopen_count: 0, created_at: "2024-03-13 11:30", resolved_at: "2024-03-14 07:00", had_null_resolved: false },
  { incident_id: "INC094825", priority: "P1 - Critical", category: "Database", assignment_group: "Infrastructure", duration_hours: 8.9, sla_target_hours: 4.0, is_breached: true, reopen_count: 3, created_at: "2024-03-13 13:40", resolved_at: null, had_null_resolved: true },
  { incident_id: "INC094826", priority: "P2 - High", category: "Software", assignment_group: "Application Support", duration_hours: 9.8, sla_target_hours: 8.0, is_breached: true, reopen_count: 1, created_at: "2024-03-14 04:15", resolved_at: "2024-03-14 14:03", had_null_resolved: false },
  { incident_id: "INC094827", priority: "P3 - Moderate", category: "Network", assignment_group: "Infrastructure", duration_hours: 29.1, sla_target_hours: 24.0, is_breached: true, reopen_count: 2, created_at: "2024-03-14 07:45", resolved_at: "2024-03-15 12:51", had_null_resolved: false },
  { incident_id: "INC094828", priority: "P4 - Low", category: "Hardware", assignment_group: "Service Desk", duration_hours: 38.0, sla_target_hours: 72.0, is_breached: false, reopen_count: 0, created_at: "2024-03-15 09:10", resolved_at: "2024-03-16 23:10", had_null_resolved: false },
  { incident_id: "INC094829", priority: "P1 - Critical", category: "Security", assignment_group: "SecOps", duration_hours: 3.2, sla_target_hours: 4.0, is_breached: false, reopen_count: 0, created_at: "2024-03-15 11:00", resolved_at: "2024-03-15 14:12", had_null_resolved: false },
  { incident_id: "INC094830", priority: "P2 - High", category: "Software", assignment_group: "Application Support", duration_hours: 11.2, sla_target_hours: 8.0, is_breached: true, reopen_count: 2, created_at: "2024-03-16 08:30", resolved_at: null, had_null_resolved: true },
  { incident_id: "INC094831", priority: "P3 - Moderate", category: "Database", assignment_group: "Database Admin", duration_hours: 21.0, sla_target_hours: 24.0, is_breached: false, reopen_count: 0, created_at: "2024-03-16 10:15", resolved_at: "2024-03-17 07:15", had_null_resolved: false },
  { incident_id: "INC094832", priority: "P1 - Critical", category: "Network", assignment_group: "Infrastructure", duration_hours: 7.5, sla_target_hours: 4.0, is_breached: true, reopen_count: 1, created_at: "2024-03-17 14:00", resolved_at: "2024-03-17 21:30", had_null_resolved: false },
  { incident_id: "INC094833", priority: "P2 - High", category: "Hardware", assignment_group: "Application Support", duration_hours: 6.9, sla_target_hours: 8.0, is_breached: false, reopen_count: 0, created_at: "2024-03-18 09:00", resolved_at: "2024-03-18 15:54", had_null_resolved: false },
  { incident_id: "INC094834", priority: "P3 - Moderate", category: "Software", assignment_group: "Application Support", duration_hours: 31.4, sla_target_hours: 24.0, is_breached: true, reopen_count: 1, created_at: "2024-03-18 11:20", resolved_at: "2024-03-19 18:44", had_null_resolved: false },
  { incident_id: "INC094835", priority: "P4 - Low", category: "Service", assignment_group: "Service Desk", duration_hours: 42.1, sla_target_hours: 72.0, is_breached: false, reopen_count: 0, created_at: "2024-03-19 13:00", resolved_at: "2024-03-21 07:06", had_null_resolved: false },
];

export interface CohortRow {
  cohortMonth: string;
  cohortSize: number;
  retentionByMonth: (number | null)[]; // M0, M1, M2, M3, M4, M5, M6, M7, M8, M9, M10, M11, M12
  avgSlaBreachRate: number;
  highlight?: 'best' | 'worst' | 'normal';
}

export const COHORT_DATA: CohortRow[] = [
  { cohortMonth: "Jan 2023", cohortSize: 320, retentionByMonth: [100, 84, 76, 68, 62, 58, 55, 53, 51, 49, 48, 47, 46], avgSlaBreachRate: 41.2 },
  { cohortMonth: "Feb 2023", cohortSize: 310, retentionByMonth: [100, 86, 78, 70, 64, 60, 56, 54, 52, 50, 49, 48, 47], avgSlaBreachRate: 43.1 },
  { cohortMonth: "Mar 2023", cohortSize: 345, retentionByMonth: [100, 82, 74, 66, 60, 56, 53, 51, 49, 47, 46, 45, null], avgSlaBreachRate: 44.0 },
  { cohortMonth: "Apr 2023", cohortSize: 290, retentionByMonth: [100, 85, 77, 69, 63, 59, 56, 54, 52, 50, 48, null, null], avgSlaBreachRate: 40.8 },
  { cohortMonth: "May 2023", cohortSize: 315, retentionByMonth: [100, 83, 75, 67, 61, 57, 54, 52, 50, 48, null, null, null], avgSlaBreachRate: 42.5 },
  { cohortMonth: "Jun 2023", cohortSize: 330, retentionByMonth: [100, 81, 72, 64, 58, 54, 51, 49, 47, null, null, null, null], avgSlaBreachRate: 45.1 },
  { cohortMonth: "Jul 2023", cohortSize: 305, retentionByMonth: [100, 84, 76, 68, 62, 58, 55, 53, null, null, null, null, null], avgSlaBreachRate: 41.9 },
  { cohortMonth: "Aug 2023", cohortSize: 360, retentionByMonth: [100, 87, 79, 71, 65, 61, 58, null, null, null, null, null, null], avgSlaBreachRate: 39.4 },
  { cohortMonth: "Sep 2023", cohortSize: 325, retentionByMonth: [100, 80, 71, 63, 57, 53, null, null, null, null, null, null, null], avgSlaBreachRate: 43.7 },
  { cohortMonth: "Oct 2023", cohortSize: 380, retentionByMonth: [100, 71, 58, 49, 44, 40, null, null, null, null, null, null, null], avgSlaBreachRate: 49.8, highlight: 'worst' },
  { cohortMonth: "Nov 2023", cohortSize: 340, retentionByMonth: [100, 92, 86, 81, 78, 75, null, null, null, null, null, null, null], avgSlaBreachRate: 34.2, highlight: 'best' },
  { cohortMonth: "Dec 2023", cohortSize: 275, retentionByMonth: [100, 88, 80, 73, 67, null, null, null, null, null, null, null, null], avgSlaBreachRate: 38.6 },
  { cohortMonth: "Jan 2024", cohortSize: 350, retentionByMonth: [100, 85, 77, 69, null, null, null, null, null, null, null, null, null], avgSlaBreachRate: 42.0 },
  { cohortMonth: "Feb 2024", cohortSize: 310, retentionByMonth: [100, 86, 78, null, null, null, null, null, null, null, null, null, null], avgSlaBreachRate: 41.5 },
  { cohortMonth: "Mar 2024", cohortSize: 335, retentionByMonth: [100, 84, null, null, null, null, null, null, null, null, null, null, null], avgSlaBreachRate: 43.2 },
  { cohortMonth: "Apr 2024", cohortSize: 360, retentionByMonth: [100, null, null, null, null, null, null, null, null, null, null, null, null], avgSlaBreachRate: 42.3 },
];

export interface EtlStageMetric {
  stage: string;
  name: string;
  recordsIn: number;
  recordsOut: number;
  status: 'pending' | 'running' | 'completed' | 'warning';
  details: string;
  auditFlag: string;
}

export const INITIAL_ETL_STAGES: EtlStageMetric[] = [
  {
    stage: "01",
    name: "CSV Ingestion & Schema Scan",
    recordsIn: 5600,
    recordsOut: 5600,
    status: "completed",
    details: "Ingested raw CSV change records from ServiceNow. Scanned 18 dynamic attributes.",
    auditFlag: "18 schema fields detected",
  },
  {
    stage: "02",
    name: "Deduplication & Natural Key Hash",
    recordsIn: 5600,
    recordsOut: 5299,
    status: "completed",
    details: "Found and stripped 301 duplicate change_ids based on timestamp hash deduplication.",
    auditFlag: "301 duplicate change_ids dropped",
  },
  {
    stage: "03",
    name: "Date Normalization & Multi-Format Parsing",
    recordsIn: 5299,
    recordsOut: 5299,
    status: "completed",
    details: "Normalized 4 conflicting date string formats (MM/DD/YYYY, YYYY-MM-DD, epoch, ISO).",
    auditFlag: "0 failed date coercions",
  },
  {
    stage: "04",
    name: "Compliance Audit & SOX Rule Enforcement",
    recordsIn: 5299,
    recordsOut: 5299,
    status: "warning",
    details: "Identified 2,674 records missing required approver_id. Tiered 11 issue classes into HIGH/MED/LOW.",
    auditFlag: "2,674 HIGH-severity compliance alerts flagged",
  },
  {
    stage: "05",
    name: "SQLite Warehouse Load & DQ Scorecard",
    recordsIn: 5299,
    recordsOut: 5299,
    status: "completed",
    details: "Idempotent write into SQLite table `dim_change_requests`. DQ score calculated at 98.4%.",
    auditFlag: "Audit trail persisted & logged",
  },
];
