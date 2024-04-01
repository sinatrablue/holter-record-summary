import { QRS_COMPLEX } from "@/app/constants";
import {
  CSVFile,
  DelineationComputedData,
  DelineationProcessed,
} from "@/app/types";

export const generateHolterSummary = async (file: File) => {
  try {
    const csvFileContentLineByLine: CSVFile = Buffer.from(
      await file.arrayBuffer()
    )
      .toString()
      .split("\n");

    const computedHeartRateData = computeHeartRateAnalysisFromCSV(
      csvFileContentLineByLine
    );

    const res: DelineationProcessed = {
      originalFileName: file.name,
      meanHeartRate: computedHeartRateData.meanHeartRate,
    };
    return res;
  } catch (error) {
    throw new Error(`Error while generating Holter summary : ${error}`);
  }
};

const computeHeartRateAnalysisFromCSV = (
  csvFile: CSVFile
): DelineationComputedData => {
  try {
    let globalQRSCount = 0;
    // let minMinuteQRSCount = 0;
    // let minMinuteNumber = 0;
    // let maxMinuteQRSCount = 0;
    // let maxMinuteNumber = 0;
    csvFile.forEach(line => {
      const elementsOfCurrentLine = line.split(",");
      const [phase, start, end] = elementsOfCurrentLine;
      if (!start || !end) return;
      // add time spend during current phase to count if the current phase is QRS
      if (phase === QRS_COMPLEX) globalQRSCount += 1;
    });

    const computedMeanHeartRate = Math.round(globalQRSCount / 24 / 60);
    return { meanHeartRate: computedMeanHeartRate };
  } catch (error) {
    throw new Error("failed to compute heart rate analysis from CSV");
  }
};
