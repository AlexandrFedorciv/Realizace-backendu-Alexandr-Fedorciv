# Filmcenze – Backend

Backend pro aplikaci Filmcenze – osobní evidence a recenzování filmů. REST API postavené na Node.js a Express s JSON souborovým úložištěm.

## Technologie

- **Node.js** – runtime prostředí
- **Express 4** – HTTP server a routing
- **AJV + ajv-formats** – validace vstupních dat pomocí JSON schémat
- **JSON souborové úložiště** – každý záznam uložen jako samostatný `.json` soubor

## Funkce

Aplikace umožňuje kompletní správu filmové knihovny – přidávání, úpravu a mazání filmů i jejich recenzí. Endpoint `GET /film/get` automaticky připojuje seznam recenzí a průměrné hodnocení. Mazání filmu s existujícími recenzemi je zablokováno (recenze je nutné nejdříve smazat).

## Požadavky

- Node.js 18+

## Instalace a spuštění

```bash
npm install
npm start
```

Backend běží na `http://localhost:8888`.

## API endpointy

### Filmy

| Metoda | Endpoint | Popis |
|--------|----------|-------|
| `GET` | `/film/list` | Seznam filmů (volitelný filtr `title`, `genre`) |
| `GET` | `/film/get?id=` | Detail filmu včetně recenzí a průměrného hodnocení |
| `POST` | `/film/create` | Vytvoření nového filmu |
| `POST` | `/film/update` | Úprava existujícího filmu |
| `POST` | `/film/delete` | Smazání filmu (nelze smazat film s recenzemi) |

### Recenze

| Metoda | Endpoint | Popis |
|--------|----------|-------|
| `GET` | `/review/list` | Seznam recenzí (volitelný filtr `filmId`) |
| `GET` | `/review/get?id=` | Detail recenze |
| `POST` | `/review/create` | Vytvoření recenze (vyžaduje `filmId`) |
| `POST` | `/review/update` | Úprava recenze |
| `POST` | `/review/delete` | Smazání recenze |

## Struktura projektu

```
app.js                    – vstupní bod, konfigurace Express
src/
  film/
    film.router.js        – HTTP handlery pro filmy
    film.dao.js           – přístup k datům filmů
    film.schema.js        – AJV validační schémata
  review/
    review.router.js      – HTTP handlery pro recenze
    review.dao.js         – přístup k datům recenzí
    review.schema.js      – AJV validační schémata
  shared/
    storage.js            – JSON souborové úložiště (CRUD operace)
    validation.js         – pomocné funkce pro AJV validaci
  errors.js               – centrální zpracování chyb
storage/
  films/                  – uložené záznamy filmů
  reviews/                – uložené záznamy recenzí
```

## Autor

Alexandr Fedorciv
