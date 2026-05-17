const express = require("express");
const filmDao = require("./film.dao");
const reviewDao = require("../review/review.dao");
const { createSchema, updateSchema, idSchema, listSchema } = require("./film.schema");
const { validate, rejectInvalidDto } = require("../shared/validation");
const { handleError } = require("../errors");

const router = express.Router();

router.post("/create", (req, res) => {
  try {
    const validation = validate(createSchema, req.body);
    if (!validation.valid) return rejectInvalidDto(res, validation.errors);
    res.status(201).json(filmDao.create(req.body));
  } catch (e) { handleError(res, e); }
});

router.get("/list", (req, res) => {
  try {
    const validation = validate(listSchema, req.query);
    if (!validation.valid) return rejectInvalidDto(res, validation.errors);
    const films = filmDao.list(req.query);
    res.json({ itemList: films });
  } catch (e) { handleError(res, e); }
});

router.get("/get", (req, res) => {
  try {
    const validation = validate(idSchema, req.query);
    if (!validation.valid) return rejectInvalidDto(res, validation.errors);

    const film = filmDao.get(req.query.id);
    if (!film) return res.status(404).json({ code: "filmNotFound", message: `Film ${req.query.id} not found` });

    const reviews = reviewDao.listByFilmId(film.id);
    const averageRating = reviews.length > 0
      ? +(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2)
      : null;

    res.json({ ...film, reviews, averageRating });
  } catch (e) { handleError(res, e); }
});

router.post("/update", (req, res) => {
  try {
    const validation = validate(updateSchema, req.body);
    if (!validation.valid) return rejectInvalidDto(res, validation.errors);

    const updated = filmDao.update(req.body);
    if (!updated) return res.status(404).json({ code: "filmNotFound", message: `Film ${req.body.id} not found` });
    res.json(updated);
  } catch (e) { handleError(res, e); }
});

router.post("/delete", (req, res) => {
  try {
    const validation = validate(idSchema, req.body);
    if (!validation.valid) return rejectInvalidDto(res, validation.errors);

    if (reviewDao.listByFilmId(req.body.id).length > 0) {
      return res.status(400).json({
        code: "filmHasReviews",
        message: "Film has reviews and cannot be deleted. Delete all reviews first.",
      });
    }

    filmDao.remove(req.body.id);
    res.json({});
  } catch (e) { handleError(res, e); }
});

module.exports = router;
