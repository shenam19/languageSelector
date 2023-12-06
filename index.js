const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");

require("dotenv").config();
const app = express();
app.use(cors());

const port = process.env.PORT || 5500;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "myDatabase",
  password: "Letmein@19",
  port: 5432,
});

app.use(bodyParser.json());

app.get("/api/data", async (req, res) => {
  const { index = 0, limit = 1 } = req.query;

  try {
    const result = await pool.query("SELECT * FROM images OFFSET $1 LIMIT $2", [
      index,
      limit,
    ]);

    if (result.rows.length > 0) {
      const { id, url, language, updated_by } = result.rows[0];
      res.json({ id, url, language, updated_by });
    } else {
      const totalImages = await pool.query("SELECT COUNT(*) FROM images");
      const totalImageCount = parseInt(totalImages.rows[0].count, 10);

      if (index >= totalImageCount) {
        res.json({ message: "You have reached the last image" });
      } else {
        res.status(404).json({ error: "Record not found" });
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/update", async (req, res) => {
  const { id, language, updatedBy } = req.body;

  try {
    const result = await pool.query(
      "UPDATE images SET language = $1, updated_by = $2 WHERE id = $3 RETURNING *",
      [language, updatedBy, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
