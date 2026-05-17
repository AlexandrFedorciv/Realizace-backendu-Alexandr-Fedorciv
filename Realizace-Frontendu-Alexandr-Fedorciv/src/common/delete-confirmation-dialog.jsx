import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ErrorMessage } from "./state-message.jsx";

function DeleteDialog({
  show,
  title,
  text,
  pending,
  error,
  onClose,
  onConfirm,
}) {
  return (
    <Modal show={show} onHide={pending ? undefined : onClose} centered>
      <Modal.Header closeButton={!pending}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{text}</p>
        <ErrorMessage error={error} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose} disabled={pending}>
          Zrušit
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={pending}>
          {pending ? "Mažu..." : "Smazat"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteDialog;
