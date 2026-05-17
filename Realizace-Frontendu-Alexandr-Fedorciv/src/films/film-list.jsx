import React, { useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Icon from "@mdi/react";
import { mdiMagnify, mdiMoviePlus, mdiRefresh } from "@mdi/js";
import FetchHelper from "../fetch-helper.js";
import DeleteDialog from "../common/delete-confirmation-dialog.jsx";
import {
  EmptyMessage,
  ErrorMessage,
  LoadingMessage,
} from "../common/state-message.jsx";
import { GENRES } from "../constants.js";
import FilmCard from "./film.jsx";
import FilmForm from "./film-form.jsx";

function FilmLibrary() {
  const [filters, setFilters] = useState({ title: "", genre: "" });
  const [appliedFilters, setAppliedFilters] = useState({});
  const [state, setState] = useState("pending");
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);
  const [formFilm, setFormFilm] = useState(null);
  const [formError, setFormError] = useState(null);
  const [deleteFilm, setDeleteFilm] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const dtoFilters = useMemo(() => {
    const dtoIn = {};
    if (appliedFilters.title?.trim()) dtoIn.title = appliedFilters.title.trim();
    if (appliedFilters.genre) dtoIn.genre = appliedFilters.genre;
    return dtoIn;
  }, [appliedFilters]);

  async function loadFilms() {
    setState("pending");
    setError(null);
    const result = await FetchHelper.film.list(dtoFilters);
    if (result.ok) {
      setFilms(result.data.itemList || []);
      setState("ready");
    } else {
      setError(result.data);
      setState("error");
    }
  }

  useEffect(() => {
    loadFilms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dtoFilters]);

  async function saveFilm(dtoIn) {
    setState("saving");
    setFormError(null);
    const result = dtoIn.id
      ? await FetchHelper.film.update(dtoIn)
      : await FetchHelper.film.create(dtoIn);

    if (result.ok) {
      setFormFilm(null);
      await loadFilms();
    } else {
      setFormError(result.data);
      setState("ready");
    }
  }

  async function confirmDelete() {
    setState("deleting");
    setDeleteError(null);
    const result = await FetchHelper.film.delete({ id: deleteFilm.id });
    if (result.ok) {
      setDeleteFilm(null);
      await loadFilms();
    } else {
      setDeleteError(result.data);
      setState("ready");
    }
  }

  function applyFilters(event) {
    event.preventDefault();
    setAppliedFilters(filters);
  }

  return (
    <Container className="page">
      <section className="page-header">
        <h1>Knihovna filmů</h1>
        <Button variant="primary" onClick={() => setFormFilm({})}>
          <Icon path={mdiMoviePlus} size={0.8} />
          Nový film
        </Button>
      </section>

      <Form className="toolbar" onSubmit={applyFilters}>
        <Form.Control
          value={filters.title}
          onChange={(e) =>
            setFilters((current) => ({ ...current, title: e.target.value }))
          }
          placeholder="Hledat podle názvu"
        />
        <Form.Select
          value={filters.genre}
          onChange={(e) =>
            setFilters((current) => ({ ...current, genre: e.target.value }))
          }
          aria-label="Filtr podle žánru"
        >
          <option value="">Všechny žánry</option>
          {GENRES.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </Form.Select>
        <Stack direction="horizontal" gap={2}>
          <Button type="submit" variant="dark">
            <Icon path={mdiMagnify} size={0.8} />
            Hledat
          </Button>
          <Button variant="outline-secondary" onClick={loadFilms}>
            <Icon path={mdiRefresh} size={0.8} />
          </Button>
        </Stack>
      </Form>

      {state === "pending" ? <LoadingMessage /> : null}
      {state === "error" ? <ErrorMessage error={error} /> : null}

      {state !== "pending" && films.length === 0 ? (
        <EmptyMessage
          title="Žádné filmy"
          text="Zkuste změnit filtr nebo přidejte první film."
        />
      ) : null}

      <Row xs={1} md={2} lg={3} className="g-3">
        {films.map((film) => (
          <Col key={film.id}>
            <FilmCard
              film={film}
              onEdit={setFormFilm}
              onDelete={(selectedFilm) => {
                setDeleteError(null);
                setDeleteFilm(selectedFilm);
              }}
            />
          </Col>
        ))}
      </Row>

      <FilmForm
        show={!!formFilm}
        film={formFilm?.id ? formFilm : null}
        pending={state === "saving"}
        error={formError}
        onClose={() => setFormFilm(null)}
        onSubmit={saveFilm}
      />

      <DeleteDialog
        show={!!deleteFilm}
        title="Smazat film"
        text={`Opravdu chcete smazat film "${deleteFilm?.title}"? Film s recenzemi backend nesmaže.`}
        pending={state === "deleting"}
        error={deleteError}
        onClose={() => setDeleteFilm(null)}
        onConfirm={confirmDelete}
      />
    </Container>
  );
}

export default FilmLibrary;
