export type Example = {
  title: string;
  language: string;
  code: string;
};

export type Lesson = {
  id: string;
  number: string;
  title: string;
  level: string;
  summary: string;
  methods: Array<{
    title: string;
    detail: string;
  }>;
  examples: Example[];
  review: Array<{
    question: string;
    answer: string;
  }>;
};
