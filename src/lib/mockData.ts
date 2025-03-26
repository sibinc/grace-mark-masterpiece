
import { Rule, Application } from "@/types";

export const mockRules: Rule[] = [
  {
    id: "1",
    name: "NCC Rule",
    description: "Grace marks for NCC cadets who have participated in camps",
    theory_practical: {
      theory: true,
      practical: false
    },
    distribution_type: "percentage",
    mark_type: "max",
    marks_awarded: {
      pass_paper: {
        enabled: true,
        max_mark: 100,
        should_not_exceed: 50
      },
      supplementary_paper: {
        enabled: true,
        max_mark: 75,
        should_not_exceed: 40
      }
    },
    subject_limit: {
      enabled: true,
      limit: 3
    }
  },
  {
    id: "2",
    name: "NSS Rule",
    description: "Grace marks for NSS volunteers who have participated in special camps",
    theory_practical: {
      theory: true,
      practical: true
    },
    distribution_type: "mark",
    mark_type: "obtained",
    marks_awarded: {
      pass_paper: {
        enabled: true,
        max_mark: 100,
        should_not_exceed: 20
      },
      supplementary_paper: {
        enabled: false,
        max_mark: 0,
        should_not_exceed: 0
      }
    },
    subject_limit: {
      enabled: false,
      limit: 0
    }
  },
  {
    id: "3",
    name: "Sports Rule",
    description: "Grace marks for sports achievements at university level",
    theory_practical: {
      theory: true,
      practical: true
    },
    distribution_type: "percentage",
    mark_type: "max",
    marks_awarded: {
      pass_paper: {
        enabled: true,
        max_mark: 100,
        should_not_exceed: 25
      },
      supplementary_paper: {
        enabled: true,
        max_mark: 75,
        should_not_exceed: 20
      }
    },
    subject_limit: {
      enabled: true,
      limit: 2
    }
  },
  {
    id: "4",
    name: "Arts Rule",
    description: "Grace marks for arts festival participation",
    theory_practical: {
      theory: false,
      practical: true
    },
    distribution_type: "mark",
    mark_type: "obtained",
    marks_awarded: {
      pass_paper: {
        enabled: true,
        max_mark: 100,
        should_not_exceed: 15
      },
      supplementary_paper: {
        enabled: true,
        max_mark: 75,
        should_not_exceed: 10
      }
    },
    subject_limit: {
      enabled: false,
      limit: 0
    }
  }
];

export const mockApplications: Application[] = [
  {
    id: "APP001",
    name: "Engineering Degree Examination 2023",
    events: [
      { id: "event1", name: "NCC" },
      { id: "event2", name: "NSS" },
      { id: "event3", name: "Sports" }
    ],
    rules: [
      { eventId: "event1", ruleId: null, fromDate: null, toDate: null },
      { eventId: "event2", ruleId: null, fromDate: null, toDate: null },
      { eventId: "event3", ruleId: null, fromDate: null, toDate: null }
    ]
  },
  {
    id: "APP002",
    name: "BBA Examination June 2023",
    events: [
      { id: "event4", name: "Arts" },
      { id: "event5", name: "NCC" }
    ],
    rules: [
      { eventId: "event4", ruleId: null, fromDate: null, toDate: null },
      { eventId: "event5", ruleId: null, fromDate: null, toDate: null }
    ]
  },
  {
    id: "APP003",
    name: "BSc Computer Science Semester 5 Exam",
    events: [
      { id: "event6", name: "Sports" },
      { id: "event7", name: "NSS" },
      { id: "event8", name: "Arts" }
    ],
    rules: [
      { eventId: "event6", ruleId: null, fromDate: null, toDate: null },
      { eventId: "event7", ruleId: null, fromDate: null, toDate: null },
      { eventId: "event8", ruleId: null, fromDate: null, toDate: null }
    ]
  }
];
