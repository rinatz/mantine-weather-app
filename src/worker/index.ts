import { Hono } from "hono";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/prefectures/", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM prefectures ORDER BY id"
  ).all();

  return c.json({ prefectures: results });
});

app.get("/prefectures/:prefectureId/cities/", async (c) => {
  const prefectureId = c.req.param("prefectureId");

  const { results } = await c.env.DB.prepare(
    "SELECT * FROM cities WHERE prefecture_id = ? ORDER BY id"
  )
    .bind(prefectureId)
    .all();

  return c.json({ cities: results });
});

app.get("/cities/:cityId/weather/", async (c) => {
  const cityId = c.req.param("cityId");
  const url = new URL(
    `https://weather.tsukumijima.net/api/forecast/city/${cityId}`
  );

  const response = await fetch(url.toString());
  const weather = await response.json();

  return c.json({ weather });
});

export default app;
