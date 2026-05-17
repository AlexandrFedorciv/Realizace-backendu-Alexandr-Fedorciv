import React from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Icon from "@mdi/react";
import { mdiDeleteOutline, mdiPencilOutline, mdiStar } from "@mdi/js";
import { EmptyMessage } from "../common/state-message.jsx";

function ReviewList({ reviews, onEdit, onDelete }) {
  if (!reviews.length) {
    return (
      <EmptyMessage
        title="Bez recenzí"
        text="K tomuto filmu zatím není uložená žádná recenze."
      />
    );
  }

  return (
    <div className="review-list">
      {reviews.map((review) => (
        <article key={review.id} className="review-item">
          <div className="review-main">
            <Stack direction="horizontal" gap={2} className="review-heading">
              <strong>{review.author}</strong>
              <span>
                <Icon path={mdiStar} size={0.75} />
                {review.rating}/10
              </span>
            </Stack>
            <p>{review.comment || "Bez komentáře."}</p>
            <small>
              {review.createdAt
                ? new Date(review.createdAt).toLocaleString("cs-CZ")
                : ""}
            </small>
          </div>
          <div className="review-actions">
            <Button variant="outline-primary" size="sm" onClick={() => onEdit(review)}>
              <Icon path={mdiPencilOutline} size={0.75} />
            </Button>
            <Button variant="outline-danger" size="sm" onClick={() => onDelete(review)}>
              <Icon path={mdiDeleteOutline} size={0.75} />
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default ReviewList;
