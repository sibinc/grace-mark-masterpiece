
export interface Rule {
  id: string;
  name: string;
  description: string;
  theory_practical: {
    theory: boolean;
    practical: boolean;
  };
  distribution_type: "percentage" | "mark";
  mark_type: "max" | "obtained";
  marks_awarded: {
    pass_paper: {
      enabled: boolean;
      max_mark: number;
      should_not_exceed: number;
    };
    supplementary_paper: {
      enabled: boolean;
      max_mark: number;
      should_not_exceed: number;
    };
  };
  subject_limit: {
    enabled: boolean;
    limit: number;
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
