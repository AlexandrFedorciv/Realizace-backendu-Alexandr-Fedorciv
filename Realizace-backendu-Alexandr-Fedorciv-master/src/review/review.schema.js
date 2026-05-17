const createSchema = {
  type: "object",
  properties: {
    filmId:  { type: "string", minLength: 32, maxLength: 32 },
    author:  { type: "string", minLength: 1, maxLength: 100 },
    rating:  { type: "integer", minimum: 1, maximum: 10 },
    comment: { type: "string", maxLength: 2000 },
  },
  required: ["filmId", "author", "rating"],
  additionalProperties: false,
};

const updateSchema = {
  type: "object",
  properties: {
    id:      { type: "string", minLength: 32, maxLength: 32 },
    author:  { type: "string", minLength: 1, maxLength: 100 },
    rating:  { type: "integer", minimum: 1, maximum: 10 },
    comment: { type: "string", maxLength: 2000 },
  },
  required: ["id"],
  additionalProperties: false,
};

const idSchema = {
  type: "object",
  properties: { id: { type: "string", minLength: 32, maxLength: 32 } },
  required: ["id"],
  additionalProperties: false,
};

const listSchema = {
  type: "object",
  properties: {
    filmId: { type: "string" },
  },
  additionalProperties: false,
};

module.exports = { createSchema, updateSchema, idSchema, listSchema };
