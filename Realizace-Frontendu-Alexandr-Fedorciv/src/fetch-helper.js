const BASE_URI = "http://localhost:8888";

async function call(useCase, dtoIn, method = "get") {
  const isGet = method.toLowerCase() === "get";
  const query =
    isGet && dtoIn && Object.keys(dtoIn).length
      ? `?${new URLSearchParams(dtoIn)}`
      : "";

  const response = await fetch(`${BASE_URI}/${useCase}${query}`, {
    method: isGet ? "GET" : "POST",
    headers: isGet ? undefined : { "Content-Type": "application/json" },
    body: isGet ? undefined : JSON.stringify(dtoIn),
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = { message: response.statusText || "Server nevratil JSON odpoved." };
  }

  return { ok: response.ok, status: response.status, data };
}

const FetchHelper = {
  film: {
    list: (dtoIn) => call("film/list", dtoIn, "get"),
    get: (dtoIn) => call("film/get", dtoIn, "get"),
    create: (dtoIn) => call("film/create", dtoIn, "post"),
    update: (dtoIn) => call("film/update", dtoIn, "post"),
    delete: (dtoIn) => call("film/delete", dtoIn, "post"),
  },
  review: {
    list: (dtoIn) => call("review/list", dtoIn, "get"),
    get: (dtoIn) => call("review/get", dtoIn, "get"),
    create: (dtoIn) => call("review/create", dtoIn, "post"),
    update: (dtoIn) => call("review/update", dtoIn, "post"),
    delete: (dtoIn) => call("review/delete", dtoIn, "post"),
  },
};

export default FetchHelper;
