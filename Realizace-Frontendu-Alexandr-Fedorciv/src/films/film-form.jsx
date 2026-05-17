import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { GENRES } from "../constants.js";
import { ErrorMessage } from "../common/state-message.jsx";

const emptyFilm = {
  title: "",
  year: new Date().getFullYear(),
  genre: "Drama",
  image: "",
  language: "",
  description: "",
};

function FilmForm({ show, film, pending, error, onClose, onSubmit }) {
  const [values, setValues] = useState(emptyFilm);

  useEffect(() => {
    setValues({
      ...emptyFilm,
      ...film,
      image: film?.image || "",
      language: film?.language || "",
      description: film?.description || "",
    });
  }, [film, show]);

  function updateValue(key, value) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const dtoIn = {
      ...(film?.id ? { id: film.id } : {}),
      title: values.title.trim(),
      year: Number(values.year),
      genre: values.genre,
    };

    if (values.image.trim()) dtoIn.image = values.image.trim();
    if (values.language.trim()) dtoIn.language = values.language.trim();
    if (values.description.trim()) {
      dtoIn.description = values.description.trim();
    }

    onSubmit(dtoIn);
  }

  return (
    <Modal show={show} onHide={pending ? undefined : onClose} size="lg" centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton={!pending}>
          <Modal.Title>{film?.id ? "Upravit film" : "Nový film"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-grid">
            <Form.Group>
              <Form.Label>Název</Form.Label>
              <Form.Control
                value={values.title}
                onChange={(e) => updateValue("title", e.target.value)}
                maxLength={200}
                disabled={pending}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rok</Form.Label>
              <Form.Control
                type="number"
                min={1888}
                max={2100}
                value={values.year}
                onChange={(e) => updateValue("year", e.target.value)}
                disabled={pending}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Žánr</Form.Label>
              <Form.Select
                value={values.genre}
                onChange={(e) => updateValue("genre", e.target.value)}
                disabled={pending}
                required
              >
                {GENRES.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Jazyk</Form.Label>
              <Form.Control
                value={values.language}
                onChange={(e) => updateValue("language", e.target.value)}
                maxLength={50}
                disabled={pending}
              />
            </Form.Group>
            <Form.Group className="form-grid-wide">
              <Form.Label>URL obrázku</Form.Label>
              <Form.Control
                type="url"
                value={values.image}
                onChange={(e) => updateValue("image", e.target.value)}
                disabled={pending}
                placeholder="https://..."
              />
            </Form.Group>
            <Form.Group className="form-grid-wide">
              <Form.Label>Popis</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={values.description}
                onChange={(e) => updateValue("description", e.target.value)}
                maxLength={500}
                disabled={pending}
              />
              <Form.Text>{values.description.length}/500</Form.Text>
            </Form.Group>
          </div>
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

export default FilmForm;
