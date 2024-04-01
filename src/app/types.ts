// Delineation
export type DelineationComputedData = {
  meanHeartRate: number;
  minHeartRate: number;
  minHeartRateMinute: number;
  maxHeartRate: number;
  maxHeartRateMinute: number;
};

export type DelineationProcessed = DelineationComputedData & {
  originalFileName: string;
};

export type DelineationResultsViewerProps = DelineationProcessed & {
  selectedDate?: string;
};

export type CSVFile = string[];
