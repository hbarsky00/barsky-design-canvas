
interface KeyMetric {
  value: string;
  label: string;
}

export const generateKeyMetrics = (): KeyMetric[] => {
  return [
    { value: "2x", label: "User Engagement" },
    { value: "45%", label: "Task Completion" },
    { value: "95%", label: "User Satisfaction" },
    { value: "30%", label: "Time Saved" }
  ];
};
