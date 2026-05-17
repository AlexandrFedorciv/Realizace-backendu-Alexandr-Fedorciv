import React from "react";
import Alert from "react-bootstrap/Alert";

function Error({ error }) {
  if (!error) return null;

  return (
    <Alert variant="danger" className="mb-0">
      {error.message || error.code || "Akci se nepodařilo dokončit."}
    </Alert>
  );
}

export default Error;
