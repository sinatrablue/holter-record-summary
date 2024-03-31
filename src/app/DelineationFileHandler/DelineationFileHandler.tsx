"use client";
import { ChangeEvent, useState } from "react";
import { DelineationProcessed } from "../types";
import DelineationResultsViewer from "./DelineationResultsViewer";

export function DelineationFileHandler() {
  const [resultsToDiplay, setResultsToDisplay] = useState<
    DelineationProcessed | undefined
  >(undefined);

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
      <input
        id="csv-file-input"
        type="file"
        className="mb-5"
        onChange={onFileChange}
        multiple={false}
        accept="csv"
      />
      {resultsToDiplay && <DelineationResultsViewer {...resultsToDiplay} />}
    </>
  );
}
