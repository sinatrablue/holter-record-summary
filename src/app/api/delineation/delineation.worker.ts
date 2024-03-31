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
  const timeInQRSPhaseAndGlobalTime = csvFile.reduce(
    (acc, curr) => {
      const elementsOfCurrentLine = curr.split(",");
      const [phase, start, end] = elementsOfCurrentLine;
      if (!start || !end) return acc;
      const timeOfThePhase = parseInt(end) - parseInt(start);
      // add time spend during current phase to count if the current phase is QRS
      if (phase === QRS_COMPLEX) acc[0] += timeOfThePhase;
      // add the time to global accumulator every time
      acc[1] += timeOfThePhase;
      return acc;
    },
    [0, 0]
  );

  const [QRSTimeAccumulator, globalTimeAccumulator] =
    timeInQRSPhaseAndGlobalTime;
  const computedMeanHeartRate = QRSTimeAccumulator / globalTimeAccumulator;
  return computedMeanHeartRate;
};
