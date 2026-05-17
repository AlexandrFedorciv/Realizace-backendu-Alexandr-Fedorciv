# Filmcenze

Filmcenze je full-stack webová aplikace pro osobní evidenci a recenzování filmů. Umožňuje spravovat filmovou knihovnu – přidávat filmy, filtrovat je podle názvu a žánru, zobrazovat jejich detaily a psát recenze.

## Architektura

Projekt se skládá ze dvou samostatných aplikací:

```
Realizace-backendu-Alexandr-Fedorciv-master/   – REST API (Node.js + Express)
Realizace-Frontendu-Alexandr-Fedorciv/         – Webový klient (React)
```

Backend a frontend běží jako oddělené procesy a komunikují přes HTTP.

---

## Backend

**Složka:** `Realizace-backendu-Alexandr-Fedorciv-master/`

### Technologie
- Node.js + Express 4
- AJV – validace vstupních dat
- JSON souborové úložiště (každý záznam = jeden `.json` soubor)

### Spuštění

```bash
cd Realizace-backendu-Alexandr-Fedorciv-master
npm install
npm start
```

Backend běží na **http://localhost:8888**

### API přehled

| Metoda | Endpoint | Popis |
|--------|----------|-------|
| `GET` | `/film/list` | Seznam filmů (filtr: `title`, `genre`) |
| `GET` | `/film/get?id=` | Detail filmu + recenze + průměrné hodnocení |
| `POST` | `/film/create` | Vytvoření filmu |
| `POST` | `/film/update` | Úprava filmu |
| `POST` | `/film/delete` | Smazání filmu (zakázáno pokud má recenze) |
| `GET` | `/review/list` | Seznam recenzí (filtr: `filmId`) |
| `GET` | `/review/get?id=` | Detail recenze |
| `POST` | `/review/create` | Vytvoření recenze |
| `POST` | `/review/update` | Úprava recenze |
| `POST` | `/review/delete` | Smazání recenze |

---

## Frontend

**Složka:** `Realizace-Frontendu-Alexandr-Fedorciv/`

### Technologie
- React 19 + React Router DOM 7
- React Bootstrap 2 + Bootstrap 5
- MDI Icons
- Create React App

### Spuštění

```bash
cd Realizace-Frontendu-Alexandr-Fedorciv
npm install
npm start
```

Frontend běží na **http://localhost:3000**

> Backend musí být spuštěn před startem frontendu.

### Stránky

| Cesta | Popis |
|-------|-------|
| `/films` | Knihovna filmů – seznam, filtrování, přidání, smazání |
| `/films/:id` | Detail filmu – informace, úprava, správa recenzí |

---

## Jak spustit celý projekt

1. Otevři dva terminály

2. **Terminál 1 – Backend:**
   ```bash
   cd Realizace-backendu-Alexandr-Fedorciv-master
   npm install
   npm start
   ```

3. **Terminál 2 – Frontend:**
   ```bash
   cd Realizace-Frontendu-Alexandr-Fedorciv
   npm install
   npm start
   ```

4. Otevři prohlížeč na **http://localhost:3000**

---

## Autor

Alexandr Fedorciv
