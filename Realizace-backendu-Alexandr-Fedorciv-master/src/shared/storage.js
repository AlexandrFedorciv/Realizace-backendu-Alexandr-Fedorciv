const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

function ensureFolder(folderPath) {
  fs.mkdirSync(folderPath, { recursive: true });
}

function createId() {
  return crypto.randomBytes(16).toString("hex");
}

function getFilePath(folderPath, id) {
  return path.join(folderPath, `${id}.json`);
}

function readJson(folderPath, id) {
  try {
    const data = fs.readFileSync(getFilePath(folderPath, id), "utf8");
    return JSON.parse(data);
  } catch (e) {
    if (e.code === "ENOENT") return null;
    throw e;
  }
}

function writeJson(folderPath, id, data) {
  fs.writeFileSync(getFilePath(folderPath, id), JSON.stringify(data), "utf8");
  return data;
}

function deleteJson(folderPath, id) {
  try {
    fs.unlinkSync(getFilePath(folderPath, id));
  } catch (e) {
    if (e.code !== "ENOENT") throw e;
  }
  return {};
}

function listJson(folderPath) {
  ensureFolder(folderPath);
  return fs.readdirSync(folderPath)
    .filter(file => file.endsWith(".json"))
    .map(file => JSON.parse(fs.readFileSync(path.join(folderPath, file), "utf8")));
}

module.exports = { ensureFolder, createId, readJson, writeJson, deleteJson, listJson };
