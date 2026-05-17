import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Icon from "@mdi/react";
import {
  mdiArrowLeft,
  mdiDeleteOutline,
  mdiPencilOutline,
  mdiPlus,
  mdiStar,
} from "@mdi/js";
import FetchHelper from "../fetch-helper.js";
import DeleteDialog from "../common/delete-confirmation-dialog.jsx";
import {
  ErrorMessage,
  LoadingMessage,
} from "../common/state-message.jsx";
import ReviewForm from "../reviews/review-form.jsx";
import ReviewList from "../reviews/review-list.jsx";
import FilmForm from "./film-form.jsx";

function FilmDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState("pending");
  const [film, setFilm] = useState(null);
  const [error, setError] = useState(null);
  const [imageFailed, setImageFailed] = useState(false);
  const [filmFormOpen, setFilmFormOpen] = useState(false);
  const [filmFormError, setFilmFormError] = useState(null);
  const [reviewForm, setReviewForm] = useState(null);
  const [reviewFormError, setReviewFormError] = useState(null);
  const [deleteReview, setDeleteReview] = useState(null);
  const [deleteFilmOpen, setDeleteFilmOpen] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  async function loadFilm() {
    setState("pending");
    setError(null);
    const result = await FetchHelper.film.get({ id });
    if (result.ok) {
      setFilm(result.data);
      setImageFailed(false);
      setState("ready");
    } else {
      setError(result.data);
      setState("error");
    }
  }

  useEffect(() => {
    loadFilm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function saveFilm(dtoIn) {
    setState("savingFilm");
    setFilmFormError(null);
    const result = await FetchHelper.film.update(dtoIn);
    if (result.ok) {
      setFilmFormOpen(false);
      await loadFilm();
    } else {
      setFilmFormError(result.data);
      setState("ready");
    }
  }

  async function saveReview(dtoIn) {
    setState("savingReview");
    setReviewFormError(null);
    const payload = reviewForm?.id ? dtoIn : { ...dtoIn, filmId: film.id };
    const result = reviewForm?.id
      ? await FetchHelper.review.update(payload)
      : await FetchHelper.review.create(payload);

    if (result.ok) {
      setReviewForm(null);
      await loadFilm();
    } else {
      setReviewFormError(result.data);
      setState("ready");
    }
  }

  async function confirmDeleteReview() {
    setState("deletingReview");
    setDeleteError(null);
    const result = await FetchHelper.review.delete({ id: deleteReview.id });
    if (result.ok) {
      setDeleteReview(null);
      await loadFilm();
    } else {
      setDeleteError(result.data);
      setState("ready");
    }
  }

  async function confirmDeleteFilm() {
    setState("deletingFilm");
    setDeleteError(null);
    const result = await FetchHelper.film.delete({ id: film.id });
    if (result.ok) {
      navigate("/films");
    } else {
      setDeleteError(result.data);
      setState("ready");
    }
  }

  if (state === "pending") {
    return (
      <Container className="page">
        <LoadingMessage />
      </Container>
    );
  }

  if (state === "error") {
    return (
      <Container className="page">
        <ErrorMessage error={error} />
        <Button as={Link} to="/films" variant="outline-secondary" className="mt-3">
          Zpět do knihovny
        </Button>
      </Container>
    );
  }

  const showImage = film.image && !imageFailed;

  return (
    <Container className="page">
      <Button as={Link} to="/films" variant="outline-secondary" className="mb-3">
        <Icon path={mdiArrowLeft} size={0.8} />
        Knihovna
      </Button>

      <section className="detail-layout">
        {showImage ? (
          <img
            className="detail-poster"
            src={film.image}
            alt={film.title}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="detail-poster no-image">No image</div>
        )}
        <div className="detail-content">
          <Stack direction="horizontal" gap={2} className="mb-2">
            <Badge bg="secondary">{film.genre}</Badge>
            <span>{film.year}</span>
          </Stack>
          <h1>{film.title}</h1>
          <p>{film.description || "Bez popisu."}</p>
          <div className="detail-stats">
            <span>
              <Icon path={mdiStar} size={0.8} />
              {film.averageRating ?? "N/A"}
            </span>
            <span>{film.reviewCount || film.reviews?.length || 0} recenzí</span>
            {film.language ? <span>{film.language}</span> : null}
          </div>
          <Stack direction="horizontal" gap={2} className="detail-actions">
            <Button variant="primary" onClick={() => setFilmFormOpen(true)}>
              <Icon path={mdiPencilOutline} size={0.8} />
              Upravit film
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => {
                setDeleteError(null);
                setDeleteFilmOpen(true);
              }}
            >
              <Icon path={mdiDeleteOutline} size={0.8} />
              Smazat film
            </Button>
          </Stack>
        </div>
      </section>

      <section className="section-heading">
        <h2>Recenze</h2>
        <Button variant="success" onClick={() => setReviewForm({})}>
          <Icon path={mdiPlus} size={0.8} />
          Nová recenze
        </Button>
      </section>

      <ReviewList
        reviews={film.reviews || []}
        onEdit={(review) => {
          setReviewFormError(null);
          setReviewForm(review);
        }}
        onDelete={(review) => {
          setDeleteError(null);
          setDeleteReview(review);
        }}
      />

      <FilmForm
        show={filmFormOpen}
        film={film}
        pending={state === "savingFilm"}
        error={filmFormError}
        onClose={() => setFilmFormOpen(false)}
        onSubmit={saveFilm}
      />

      <ReviewForm
        show={!!reviewForm}
        review={reviewForm?.id ? reviewForm : null}
        pending={state === "savingReview"}
        error={reviewFormError}
        onClose={() => setReviewForm(null)}
        onSubmit={saveReview}
      />

      <DeleteDialog
        show={!!deleteReview}
        title="Smazat recenzi"
        text={`Opravdu chcete smazat recenzi od autora "${deleteReview?.author}"?`}
        pending={state === "deletingReview"}
        error={deleteError}
        onClose={() => setDeleteReview(null)}
        onConfirm={confirmDeleteReview}
      />

      <DeleteDialog
        show={deleteFilmOpen}
        title="Smazat film"
        text={`Opravdu chcete smazat film "${film.title}"? Film s recenzemi backend nesmaže.`}
        pending={state === "deletingFilm"}
        error={deleteError}
        onClose={() => setDeleteFilmOpen(false)}
        onConfirm={confirmDeleteFilm}
      />
    </Container>
  );
}

export default FilmDetail;
