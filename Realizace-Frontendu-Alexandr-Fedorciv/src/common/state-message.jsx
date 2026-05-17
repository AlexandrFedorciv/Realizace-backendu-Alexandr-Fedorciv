import React from "react";
import Error from "./error.jsx";
import Loading from "./loading.jsx";

export function LoadingMessage({ text = "Načítám data..." }) {
  return <Loading text={text} />;
}

export function ErrorMessage({ error }) {
  return <Error error={error} />;
}

export function EmptyMessage({ title, text }) {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}
