const path = require("path");
const storage = require("../shared/storage");
const { AppError } = require("../errors");

const STORAGE = path.join(__dirname, "../../storage/reviews");
storage.ensureFolder(STORAGE);

const dao = {
  get(id) {
    try {
      return storage.readJson(STORAGE, id);
    } catch (e) {
      throw new AppError("failedToReadReview", e.message, 500);
    }
  },

  create(review) {
    try {
      const data = { ...review, id: storage.createId(), createdAt: new Date().toISOString() };
      return storage.writeJson(STORAGE, data.id, data);
    } catch (e) {
      throw new AppError("failedToWriteReview", e.message, 500);
    }
  },

  update(review) {
    const current = dao.get(review.id);
    if (!current) return null;
    try {
      const updated = { ...current, ...review, createdAt: current.createdAt };
      return storage.writeJson(STORAGE, review.id, updated);
    } catch (e) {
      throw new AppError("failedToWriteReview", e.message, 500);
    }
  },

  remove(id) {
    try {
      return storage.deleteJson(STORAGE, id);
    } catch (e) {
      throw new AppError("failedToRemoveReview", e.message, 500);
    }
  },

  list(filter = {}) {
    let reviews;
    try {
      reviews = storage.listJson(STORAGE);
    } catch (e) {
      throw new AppError("failedToListReviews", e.message, 500);
    }
    if (filter.filmId) {
      reviews = reviews.filter(r => r.filmId === filter.filmId);
    }
    return reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  listByFilmId(filmId) { return dao.list({ filmId }); },
};

module.exports = dao;
