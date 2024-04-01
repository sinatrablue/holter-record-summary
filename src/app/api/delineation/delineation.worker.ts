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
      ...computedHeartRateData,
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
    let minHeartRate = Number.POSITIVE_INFINITY;
    let minHeartRateMinute = 0;
    let maxHeartRate = Number.NEGATIVE_INFINITY;
    let maxHeartRateMinute = 0;
    let currentMinuteNumber = 0;
    let currentMinuteQRSCount = 0;

    csvFile.forEach(line => {
      const elementsOfCurrentLine = line.split(",");
      // get the important elements of the line (won't be using the tags)
      const [phase, start, end] = elementsOfCurrentLine;
      // if there is no interesting data for the phase, stop here and skip to next line
      if (!start || !end || phase !== QRS_COMPLEX) return;
      // current phase is QRS, add it to global count
      globalQRSCount += 1;

      // get the minute number of the current phase
      // 60000 => 60 sec in ms => 1 minute
      const minuteForCurrentQRSPhase = Math.round(parseInt(start) / 60000);
      // if we reached the next minute, analyse data for the minute that just ended
      // check if it can become the min or max BPM of the recording
      // Minute n°0 is excluded because the result was weird
      // Maybe the device was configured during it ?
      if (minuteForCurrentQRSPhase > currentMinuteNumber) {
        if (currentMinuteQRSCount < minHeartRate && currentMinuteNumber > 0) {
          minHeartRate = currentMinuteQRSCount;
          minHeartRateMinute = currentMinuteNumber;
        } else if (
          currentMinuteQRSCount > maxHeartRate &&
          currentMinuteNumber > 0
        ) {
          maxHeartRate = currentMinuteQRSCount;
          maxHeartRateMinute = currentMinuteNumber;
        }
        // lastly, increment minute count and reset QRS counter
        currentMinuteNumber = minuteForCurrentQRSPhase;
        currentMinuteQRSCount = 1;
      } else currentMinuteQRSCount += 1;
    });

    const computedMeanHeartRate = Math.round(globalQRSCount / 24 / 60);
    return {
      meanHeartRate: computedMeanHeartRate,
      minHeartRate,
      minHeartRateMinute,
      maxHeartRate,
      maxHeartRateMinute,
    };
  } catch (error) {
    throw new Error("failed to compute heart rate analysis from CSV");
  }
};
