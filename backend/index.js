const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

app.get("/links", async (req, res) => {
  const result = await pool.query("SELECT id, url, description FROM links ORDER BY id DESC");
  res.json(result.rows);
});

app.post("/links", async (req, res) => {
  const { url, description } = req.body;
  await pool.query("INSERT INTO links (url, description) VALUES ($1, $2)", [
    url,
    description,
  ]);
  res.json({ status: "ok" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`API running on port ${port}`);
});

