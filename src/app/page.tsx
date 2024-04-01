import "bootstrap/dist/css/bootstrap.min.css";
import { DelineationFileHandler } from "./DelineationAnalyser/DelineationFileHandler";

export default function Home() {
  return (
    <>
      <h2
        id="topbar"
        className="bg-white d-flex justify-content-center align-items-center py-3 mb-3 shadow-sm"
      >
        HOLTER RECORD SUMMARY
      </h2>
      <main className="p-5">
        <DelineationFileHandler />
      </main>
    </>
  );
}
