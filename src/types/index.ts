
export interface Rule {
  id: string;
  name: string;
  description: string;
  theory_practical: {
    theory: boolean;    // Whether the rule applies to theory exams
    practical: boolean; // Whether the rule applies to practical exams
  };
  distribution_type: "percentage" | "mark";  // Whether to calculate grace mark as percentage or fixed mark
  mark_type: "max" | "obtained";  // Whether to base calculation on maximum possible mark or marks obtained by student
  marks_awarded: {
    pass_paper: {
      enabled: boolean;  // Whether to apply grace marks for pass papers
      max_mark: number;  // Maximum grace mark that can be awarded (typically 10-30)
      should_not_exceed: number;  // Upper limit after adding grace mark (e.g., 80)
    };
    supplementary_paper: {
      enabled: boolean;  // Whether to apply grace marks for supplementary papers
      max_mark: number;  // Maximum grace mark that can be awarded (typically 5-15)
      should_not_exceed: number;  // Upper limit after adding grace mark (e.g., 45)
    };
  };
  subject_limit: {
    enabled: boolean;  // Whether to limit the number of subjects grace marks can be applied to
    limit: number;     // Maximum number of subjects
  };
}

export interface Event {
  id: string;
  name: string;
}

export interface Application {
  id: string;
  name: string;
  events: Event[];
  rules: Array<{
    eventId: string;
    ruleId: string | null;
    fromDate: string | null;
    toDate: string | null;
  }>;
}

export interface AssignmentFormData {
  ruleId: string | null;
  fromDate: string | null;
  toDate: string | null;
}
