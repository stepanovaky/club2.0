import React from "react";
import DisplayPdf from "../../Shared Components/display pdf/DisplayPdf";
const pdf =
  "https://firebasestorage.googleapis.com/v0/b/cfs-racing-club.appspot.com/o/time%20trial%20meet%20results.pdf?alt=media&token=292ca388-f0f5-403a-b08b-535ea6e4edfd";

function Results() {
  return (
    <div className="results">
      <DisplayPdf pdfUrl={pdf} />
    </div>
  );
}

export default Results;
