import React from "react";

function DisplayPdf(props) {
  console.log(props);
  const pdf = props.pdfUrl;
  console.log(pdf);
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
