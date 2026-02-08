// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function deleteUser(id) {
    return fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });
  }
  function removeOneCharacter(index) {
    const user = characters[index];
    const id = user._id;

    deleteUser(id)
      .then((res) => {
        if (res.status === 204) {
          setCharacters((prev) => prev.filter((u) => u._id !== id));
        } else if (res.status === 404) {
          console.log("User not found on server (404).");
        } else {
          throw new Error(`Unexpected status: ${res.status}`);
        }
      })
      .catch((error) => console.log(error));
  }
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then((res) => {
        if (res.status !== 201)
          throw new Error(`Expected 201, got ${res.status}`);
        return res.json();
      })
      .then((createdUser) => setCharacters((prev) => [...prev, createdUser]))
      .catch((error) => {
        console.log(error);
      });
  }

  (useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }),
    []);

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
