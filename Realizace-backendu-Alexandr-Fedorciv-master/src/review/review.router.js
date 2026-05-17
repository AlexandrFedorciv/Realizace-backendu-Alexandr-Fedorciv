const express = require("express");
const reviewDao = require("./review.dao");
const filmDao = require("../film/film.dao");
const { createSchema, updateSchema, idSchema, listSchema } = require("./review.schema");
const { validate, rejectInvalidDto } = require("../shared/validation");
const { handleError } = require("../errors");

const router = express.Router();

function refreshFilmStats(filmId) {
  const reviews = reviewDao.listByFilmId(filmId);
  const reviewCount = reviews.length;
  const averageRating = reviewCount > 0
    ? +(reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount).toFixed(2)
    : null;
  filmDao.updateStats(filmId, reviewCount, averageRating);
}

router.post("/create", (req, res) => {
  try {
    const validation = validate(createSchema, req.body);
    if (!validation.valid) return rejectInvalidDto(res, validation.errors);

    const film = filmDao.get(req.body.filmId);
    if (!film) return res.status(400).json({
      code: "filmDoesNotExist",
      message: `Film with id ${req.body.filmId} does not exist`,
    });

    const created = reviewDao.create(req.body);
    refreshFilmStats(created.filmId);
    res.status(201).json({ ...created, film });
  } catch (e) { handleError(res, e); }
});

router.get("/list", (req, res) => {
  try {
    const validation = validate(listSchema, req.query);
    if (!validation.valid) return rejectInvalidDto(res, validation.errors);

    const reviews = reviewDao.list(req.query);

    const filmIds = [...new Set(reviews.map(r => r.filmId))];
    const filmMap = {};
    filmIds.forEach(id => { filmMap[id] = filmDao.get(id); });

    res.json({ itemList: reviews, filmMap });
  } catch (e) { handleError(res, e); }
});

router.get("/get", (req, res) => {
  try {
    const validation = validate(idSchema, req.query);
    if (!validation.valid) return rejectInvalidDto(res, validation.errors);

    const review = reviewDao.get(req.query.id);
    if (!review) return res.status(404).json({ code: "reviewNotFound", message: `Review ${req.query.id} not found` });

    res.json({ ...review, film: filmDao.get(review.filmId) });
  } catch (e) { handleError(res, e); }
});

router.post("/update", (req, res) => {
  try {
    const validation = validate(updateSchema, req.body);
    if (!validation.valid) return rejectInvalidDto(res, validation.errors);

    const updated = reviewDao.update(req.body);
    if (!updated) return res.status(404).json({ code: "reviewNotFound", message: `Review ${req.body.id} not found` });

    refreshFilmStats(updated.filmId);
    res.json(updated);
  } catch (e) { handleError(res, e); }
});

router.post("/delete", (req, res) => {
  try {
    const validation = validate(idSchema, req.body);
    if (!validation.valid) return rejectInvalidDto(res, validation.errors);

    const review = reviewDao.get(req.body.id);
    reviewDao.remove(req.body.id);
    if (review) refreshFilmStats(review.filmId);
    res.json({});
  } catch (e) { handleError(res, e); }
});

module.exports = router;
