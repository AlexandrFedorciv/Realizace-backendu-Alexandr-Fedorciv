import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Icon from "@mdi/react";
import { mdiDeleteOutline, mdiPencilOutline, mdiStar } from "@mdi/js";

function FilmCard({ film, onEdit, onDelete }) {
  const navigate = useNavigate();
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = film.image && !imageFailed;

  return (
    <Card className="film-card h-100">
      <button
        className="poster-button"
        type="button"
        onClick={() => navigate(`/films/${film.id}`)}
        aria-label={`Otevřít detail filmu ${film.title}`}
      >
        {showImage ? (
          <Card.Img
            variant="top"
            src={film.image}
            alt={film.title}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="no-image">No image</div>
        )}
      </button>
      <Card.Body>
        <div className="card-title-row">
          <div>
            <Card.Title>{film.title}</Card.Title>
            <Card.Subtitle>{film.year}</Card.Subtitle>
          </div>
          <Badge bg="secondary">{film.genre}</Badge>
        </div>
        <Card.Text>{film.description || "Bez popisu."}</Card.Text>
        <div className="film-meta">
          <span>
            <Icon path={mdiStar} size={0.75} />
            {film.averageRating ?? "N/A"}
          </span>
          <span>{film.reviewCount || 0} recenzí</span>
        </div>
      </Card.Body>
      <Card.Footer>
        <Button variant="outline-primary" size="sm" onClick={() => onEdit(film)}>
          <Icon path={mdiPencilOutline} size={0.75} />
          Upravit
        </Button>
        <Button variant="outline-danger" size="sm" onClick={() => onDelete(film)}>
          <Icon path={mdiDeleteOutline} size={0.75} />
          Smazat
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default FilmCard;
