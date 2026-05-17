const GENRES = [
  "Drama", "Action", "Comedy", "Horror",
  "Sci-fi", "Thriller", "Animation", "Documentary",
];

const baseProps = {
  title:       { type: "string", minLength: 1, maxLength: 200 },
  year:        { type: "number", minimum: 1888, maximum: 2100 },
  genre:       { type: "string", enum: GENRES },
  image:       { type: "string", format: "uri" },
  language:    { type: "string", maxLength: 50 },
  description: { type: "string", maxLength: 500 },
};

const createSchema = {
  type: "object",
  properties: baseProps,
  required: ["title", "year", "genre"],
  additionalProperties: false,
};

const updateSchema = {
  type: "object",
  properties: { id: { type: "string", minLength: 32, maxLength: 32 }, ...baseProps },
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
    title: { type: "string" },
    genre: { type: "string", enum: GENRES },
  },
  additionalProperties: false,
};

module.exports = { GENRES, createSchema, updateSchema, idSchema, listSchema };
