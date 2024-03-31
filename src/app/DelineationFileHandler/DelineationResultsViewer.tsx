import { Card } from "react-bootstrap";
import { DelineationProcessed } from "../types";

export default function DelineationResultsViewer(
  props: Readonly<DelineationProcessed>
) {
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
          Mean frequency of QRS complexes through the sample :{" "}
          {props.meanHeartRate}
        </div>
      </Card.Body>
    </Card>
  );
}
