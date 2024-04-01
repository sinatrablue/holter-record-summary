import { QRS_COMPLEX } from "@/app/constants";
import { CSVFile, DelineationProcessed } from "@/app/types";

export const generateHolterSummary = async (file: File) => {
  const csvFileContentLineByLine: CSVFile = Buffer.from(
    await file.arrayBuffer()
  )
    .toString()
    .split("\n");

  const computedMeanHeartRate = computeMeanHeartRateFromCSV(
    csvFileContentLineByLine
  );

  const res: DelineationProcessed = {
    originalFileName: file.name,
    meanHeartRate: computedMeanHeartRate,
  };
  return res;
};

const computeMeanHeartRateFromCSV = (csvFile: CSVFile) => {
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
  return computedMeanHeartRate;
};
