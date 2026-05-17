const path = require("path");
const storage = require("../shared/storage");
const { AppError } = require("../errors");

const STORAGE = path.join(__dirname, "../../storage/films");
storage.ensureFolder(STORAGE);

function cleanTitle(title) {
  return String(title).trim().replace(/\s+/g, " ");
}

function titleKey(title) {
  return cleanTitle(title).normalize("NFKC").toLowerCase();
}

const dao = {
  get(id) {
    try {
      return storage.readJson(STORAGE, id);
    } catch (e) {
      throw new AppError("failedToReadFilm", e.message, 500);
    }
  },

  create(film) {
    const normalizedFilm = { ...film, title: cleanTitle(film.title) };
    const allFilms = dao.list();
    const duplicate = allFilms.find(
      f => titleKey(f.title) === titleKey(normalizedFilm.title) && f.year === normalizedFilm.year
    );
    if (duplicate) {
      throw new AppError("filmAlreadyExists", `A film "${normalizedFilm.title}" (${normalizedFilm.year}) already exists`);
    }
    try {
      const data = { ...normalizedFilm, id: storage.createId(), reviewCount: 0, averageRating: null };
      return storage.writeJson(STORAGE, data.id, data);
    } catch (e) {
      throw new AppError("failedToWriteFilm", e.message, 500);
    }
  },

  update(film) {
    // single pass — read all films once for both current lookup and duplicate check
    const allFilms = dao.list();
    const current = allFilms.find(f => f.id === film.id);
    if (!current) return null;

    const normalizedFilm = film.title === undefined ? film : { ...film, title: cleanTitle(film.title) };
    const newTitle = normalizedFilm.title ?? current.title;
    const newYear  = film.year  ?? current.year;
    if (titleKey(newTitle) !== titleKey(current.title) || newYear !== current.year) {
      const duplicate = allFilms.find(
        f => f.id !== film.id &&
             titleKey(f.title) === titleKey(newTitle) &&
             f.year === newYear
      );
      if (duplicate) {
        throw new AppError("filmAlreadyExists", `A film "${newTitle}" (${newYear}) already exists`);
      }
    }

    try {
      const updated = { ...current, ...normalizedFilm };
      return storage.writeJson(STORAGE, film.id, updated);
    } catch (e) {
      throw new AppError("failedToWriteFilm", e.message, 500);
    }
  },

  remove(id) {
    try {
      return storage.deleteJson(STORAGE, id);
    } catch (e) {
      throw new AppError("failedToRemoveFilm", e.message, 500);
    }
  },

  updateStats(filmId, reviewCount, averageRating) {
    try {
      const film = storage.readJson(STORAGE, filmId);
      if (!film) return;
      storage.writeJson(STORAGE, filmId, { ...film, reviewCount, averageRating });
    } catch (e) {
      throw new AppError("failedToWriteFilm", e.message, 500);
    }
  },

  list(filter = {}) {
    let films;
    try {
      films = storage.listJson(STORAGE);
    } catch (e) {
      throw new AppError("failedToListFilms", e.message, 500);
    }
    if (filter.title) {
      const needle = titleKey(filter.title);
      films = films.filter(f => f.title && titleKey(f.title).includes(needle));
    }
    if (filter.genre) {
      films = films.filter(f => f.genre === filter.genre);
    }
    return films.sort((a, b) =>
      String(a.title || "").localeCompare(String(b.title || ""))
    );
  },

};

module.exports = dao;
