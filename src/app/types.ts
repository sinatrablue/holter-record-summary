// Delineation
export type DelineationComputedData = {
  meanHeartRate: number;
};

export type DelineationProcessed = DelineationComputedData & {
  originalFileName: string;
};

export type CSVFile = string[];
