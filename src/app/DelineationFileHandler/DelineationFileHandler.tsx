"use client";
import { ChangeEvent, useState } from "react";
import { DelineationProcessed } from "../types";
import DelineationResultsViewer from "./DelineationResultsViewer";

export function DelineationFileHandler() {
  const [resultsToDisplay, setResultsToDisplay] = useState<
    DelineationProcessed | undefined
  >(undefined);
  const [selectedDate, setSelectedDate] = useState<string>();

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      window.alert("No valid file was uploaded !");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/delineation", {
      method: "POST",
      body: formData,
    }).then(resp => resp.json());

    setResultsToDisplay(res.data);
  };

  return (
    <>
      <div className="mb-5 d-flex justify-content-between">
        <input
          id="csv-file-input"
          type="file"
          onChange={onFileChange}
          multiple={false}
          accept="csv"
        />

        <input
          type="datetime-local"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
        />
      </div>
      {resultsToDisplay && (
        <DelineationResultsViewer
          {...resultsToDisplay}
          selectedDate={selectedDate}
        />
      )}
    </>
  );
}
