import { Hono } from "hono";
import { getWeatherByLocation } from "./services/weatherService";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/weather", async (c) => {
  const location = c.req.query("q");
  if (!location) {
    return c.json({ error: "Query parameter 'q' is required" }, 400);
  }

  const response = await getWeatherByLocation(location);

  return c.json(response);
});

export default app;
