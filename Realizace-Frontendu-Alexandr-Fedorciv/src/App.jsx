import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout.jsx";
import Films from "./films/films.jsx";
import FilmDetail from "./films/film-detail.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/films" replace />} />
          <Route path="/films" element={<Films />} />
          <Route path="/films/:id" element={<FilmDetail />} />
          <Route path="*" element={<Navigate to="/films" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
