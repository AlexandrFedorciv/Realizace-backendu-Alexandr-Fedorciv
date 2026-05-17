# Filmcenze – Frontend

Frontend pro aplikaci Filmcenze – osobní evidence a recenzování filmů. React aplikace komunikující s REST API backendu.

## Technologie

- **React 19** – UI framework
- **React Router DOM 7** – klientské routování
- **React Bootstrap 2 + Bootstrap 5** – komponenty a stylování
- **MDI Icons** – ikonová sada (@mdi/react, @mdi/js)
- **Create React App** – build nástroj

## Funkce

Aplikace slouží jako přehledná knihovna filmů s možností filtrování podle názvu a žánru. Ke každému filmu lze přidávat, upravovat a mazat recenze. Detail filmu zobrazuje plakát (URL), základní informace, průměrné hodnocení a seznam recenzí.

## Požadavky

- Node.js 18+
- Běžící backend na `http://localhost:8888`

## Instalace a spuštění

```bash
npm install
npm start
```

Aplikace běží na `http://localhost:3000`.

## Stránky

| Cesta | Popis |
|-------|-------|
| `/films` | Knihovna filmů – seznam s filtry, přidání a smazání filmu |
| `/films/:id` | Detail filmu – info, úprava, recenze |

## Struktura projektu

```
src/
  films/
    films.jsx             – stránková komponenta /films
    film-list.jsx         – seznam filmů se stavem, filtry a CRUD
    film.jsx              – karta jednoho filmu
    film-form.jsx         – modální formulář pro vytvoření/úpravu
    film-detail.jsx       – detail filmu s recenzemi
  reviews/
    review-list.jsx       – seznam recenzí
    review-form.jsx       – modální formulář pro recenzi
  common/
    delete-confirmation-dialog.jsx  – potvrzovací dialog mazání
    error.jsx             – chybová hláška
    loading.jsx           – spinner načítání
    state-message.jsx     – obálka stavových zpráv
  App.jsx                 – definice rout
  layout.jsx              – společný layout s navigací
  navigation.jsx          – navbar
  fetch-helper.js         – Fetch API wrapper pro komunikaci s backendem
  constants.js            – seznam žánrů
  styles.css              – vlastní CSS styly
```

## Autor

Alexandr Fedorciv
