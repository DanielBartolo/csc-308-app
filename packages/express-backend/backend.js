import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors())._router;
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

function generateId() {
  return Math.random().toString(36).slice(2, 8);
}

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const findUsers = ({ name, job }) => {
  return users.users_list.filter((user) => {
    const matchName = name === undefined || user.name === name;
    const matchJob = job === undefined || user.job === job;
    return matchName && matchJob;
  });
};

const deleteUserById = (id) => {
  const index = users.users_list.findIndex((user) => user.id === id);
  if (index === -1) return false;

  users.users_list.splice(index, 1);
  return true;
};

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const deleted = deleteUserById(id);

  if (!deleted) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).send();
  }
});

app.post("/users", (req, res) => {
  const userToAdd = { ...req.body, id: generateId() };
  addUser(userToAdd);
  res.status(201).json(userToAdd);
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  if (name !== undefined || job !== undefined) {
    const result = findUsers({ name, job });
    res.send({ users_list: result });
  } else {
    res.send(users);
  }
});

app.get("/", (req, res) => {
  res.send("Hello!!!");
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
