import { Card } from "react-bootstrap";
import { DelineationResultsViewerProps } from "../types";
import { useEffect, useState } from "react";

export default function DelineationResultsViewer(
  props: Readonly<DelineationResultsViewerProps>
) {
  const [timeMinHeartRate, setTimeMinHeartRate] = useState<string>();
  const [timeMaxHeartRate, setTimeMaxHeartRate] = useState<string>();
  useEffect(() => {
    if (props.selectedDate) {
      setTimeMinHeartRate(
        new Date(
          new Date(props.selectedDate).getTime() +
            props.minHeartRateMinute * 60000
        ).toLocaleString()
      );
      setTimeMaxHeartRate(
        new Date(
          new Date(props.selectedDate).getTime() +
            props.maxHeartRateMinute * 60000
        ).toLocaleString()
      );
    }
  }, [props.selectedDate, props.minHeartRateMinute, props.maxHeartRateMinute]);

  return (
    <Card className="p-3">
      <Card.Title className="mb-1">
        <h3 className="">Results :</h3>
      </Card.Title>
      <Card.Subtitle className="mb-3 text-muted">
        From file {props.originalFileName}
      </Card.Subtitle>
      <Card.Body>
        <div>
          Mean heart rate through the sample : {props.meanHeartRate} BPM
        </div>
        <div>
          Minimum heart rate was : {props.minHeartRate} BPM reached{" "}
          {timeMinHeartRate ? (
            <span>at time {timeMinHeartRate}</span>
          ) : (
            <span>after {props.minHeartRateMinute} minutes</span>
          )}
        </div>
        <div>
          Maximum heart rate was : {props.maxHeartRate} BPM reached{" "}
          {timeMaxHeartRate ? (
            <span>at time {timeMaxHeartRate}</span>
          ) : (
            <span>after {props.maxHeartRateMinute} minutes</span>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
