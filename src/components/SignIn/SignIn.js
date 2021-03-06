import {
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Loading, Notify } from "notiflix";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sigin.css";
import React from 'react';
export default function SignIn(props) {
  const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;
  const [form, setForm] = useState({
    name: "",
    username: "",
    biografia: "",
    password: "",
  });
  const [logged, setlogged] = useState(false);
  const [user, setUser] = useState({});
  const handleUpdate = (e) => {
    setForm((prev) => {
      let newValue = e.target.value;
      prev[e.target.name] = newValue;
      return prev;
    });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (logged) {
      //  props.handleLogin(true, user);
      navigate("/");


    }
  }, [logged]);
  async function handleCreate() {
    Loading.circle();
    await fetch(`${ENDPOINT}/user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (response.ok) {
          Notify.success("Account created", { timeout: 1000 });
          return response.json();
        }
        throw Error;
      })
      .then(async function (actualData) {
        setUser(actualData);

        setlogged(true);
      })
      .catch((err) => {
        Notify.failure("Could not create account", { timeout: 1000 });
      });
    Loading.remove();
  }
  return (
    <div className="signin__container">
      <Container maxWidth="sm" sx={{ position: "relative", top: "10vh" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h3"
            component="div"
            gutterBottom
            sx={{ textAlign: "center", color: "#E64545" }}
          >
            Create account
          </Typography>
          <FormControl>
            <TextField
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              sx={{ margin: "2vh 0" }}
              onChange={handleUpdate}
              required
            />
          </FormControl>
          <FormControl>
            <TextField
              id="username"
              name="username"
              onChange={handleUpdate}
              label="Username"
              variant="outlined"
              sx={{ margin: "2vh 0" }}
              required
            />
          </FormControl>

          <FormControl sx={{ marginRight: "1vw", width: "100%" }}>
            <TextField
              id="biografia"
              onChange={handleUpdate}
              label="Biografia"
              name="biografia"
              variant="outlined"
              sx={{ margin: "2vh 0" }}
              required
            />
          </FormControl>

          <FormControl>
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              sx={{ margin: "2vh 0" }}
              onChange={handleUpdate}
              required
            />
          </FormControl>

          <Button
            onClick={handleCreate}
            variant="contained"
            sx={{ margin: "2vh 0" }}
          >
            Create
          </Button>
        </Box>
      </Container>
    </div>
  );
}
