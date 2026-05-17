import React from "react";
import Spinner from "react-bootstrap/Spinner";

function Loading({ text = "Načítám data..." }) {
  return (
    <div className="state-message">
      <Spinner animation="border" role="status" size="sm" />
      <span>{text}</span>
    </div>
  );
}

export default Loading;
