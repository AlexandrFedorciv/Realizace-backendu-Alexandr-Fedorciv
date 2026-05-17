import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ErrorMessage } from "../common/state-message.jsx";

const emptyReview = {
  author: "",
  rating: 8,
  comment: "",
};

function ReviewForm({ show, review, pending, error, onClose, onSubmit }) {
  const [values, setValues] = useState(emptyReview);

  useEffect(() => {
    setValues({ ...emptyReview, ...review, comment: review?.comment || "" });
  }, [review, show]);

  function updateValue(key, value) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const dtoIn = {
      ...(review?.id ? { id: review.id } : {}),
      author: values.author.trim(),
      rating: Number(values.rating),
    };
    if (values.comment.trim()) dtoIn.comment = values.comment.trim();
    onSubmit(dtoIn);
  }

  return (
    <Modal show={show} onHide={pending ? undefined : onClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton={!pending}>
          <Modal.Title>
            {review?.id ? "Upravit recenzi" : "Nová recenze"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              value={values.author}
              onChange={(e) => updateValue("author", e.target.value)}
              maxLength={100}
              disabled={pending}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hodnocení</Form.Label>
            <Form.Control
              type="number"
              min={1}
              max={10}
              step={1}
              value={values.rating}
              onChange={(e) => updateValue("rating", e.target.value)}
              disabled={pending}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Komentář</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={values.comment}
              onChange={(e) => updateValue("comment", e.target.value)}
              maxLength={2000}
              disabled={pending}
            />
            <Form.Text>{values.comment.length}/2000</Form.Text>
          </Form.Group>
          <ErrorMessage error={error} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onClose} disabled={pending}>
            Zrušit
          </Button>
          <Button variant="primary" type="submit" disabled={pending}>
            {pending ? "Ukládám..." : "Uložit"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ReviewForm;
