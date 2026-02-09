
export interface AthleteData {
  age: number;
  weight: number;
  height: number;
  restingHeartRate: number;
  maxHeartRate: number;
  weeklyTrainingFrequency: number;
  runningTime5k: number;
}

export interface MetricBenchmark {
  name: string;
  userValue: number;
  benchmarkValue: number;
  unit: string;
}

export interface EvaluationResult {
  performanceLevel: 'High' | 'Low';
  overallScore: number;
  analysisSummary: string;
  recommendations: string[];
  benchmarks: MetricBenchmark[];
  physicalInsights: {
    bmi: number;
    vo2MaxEstimate: number;
    cardioHealth: string;
  };
}
