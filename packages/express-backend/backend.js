import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.post("/users", (req, res) => {
  userServices
    .addUser(req.body)
    .then((created) => res.status(201).json(created))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.get("/users/:id", (req, res) => {
  userServices
    .findUserById(req.params.id)
    .then((user) => {
      if (!user) return res.status(404).send("Resource not found.");
      res.json(user);
    })
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.delete("/users/:id", (req, res) => {
  userServices
    .deleteUserById(req.params.id)
    .then((deleted) => {
      if (!deleted) return res.status(404).send("Resource not found.");
      res.status(204).send();
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  userServices
    .getUsers(name, job)
    .then((users) => res.json({ users_list: users }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.get("/", (req, res) => {
  res.send("Hello!!!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
