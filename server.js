import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/current", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/5day", (req, res) => {
    res.sendFile(path.join(__dirname, "index2.html"));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
