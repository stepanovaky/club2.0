import React from "react";

function DisplayPdf(props) {
  const pdf = props.pdfUrl;
  return (
    <div className="display-image">
      <iframe
        src={`https://docs.google.com/gview?url=${pdf}&embedded=true`}
        style={{
          width: "100%",
          minHeight: "500px",
        }}
        frameBorder="0"
      ></iframe>
    </div>
  );
}

export default DisplayPdf;
