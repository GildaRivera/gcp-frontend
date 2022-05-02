import React from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginR } from "../../redux/user/reducer";
import "./login.css";

// const dotenv = require("dotenv");
// // get config vars
// dotenv.config();
// const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;
const ENDPOINT = "http://localhost:3001/api";
export const Login = (props) => {
  const [form, setForm] = useState({
    username: "",
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
  const dispatch = useDispatch();
  useEffect(() => {
    if (logged) {
      navigate("/home");
    }
  }, [logged]);
  async function handleLog() {

  
  
    Loading.circle();
    if (form.password == "" || form.username == "") {
      Loading.remove();
      Notify.failure("Please enter the rigth username and password");
      return null;
    }
    await fetch(`${ENDPOINT}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (response.ok) {
          Notify.success("Logged in", { timeout: 1000 });
          return response.json();
        }
        throw Error;
      })
      .then(async function (actualData) {
        setlogged(true);
       await dispatch(loginR({user:actualData.data[0], token:actualData.token}));
      })
      .catch((err) => {
        Notify.failure("User does not exists", { timeout: 1000 });
      });

    Loading.remove();
  }


  return (
    <div className="login__container">
      <Container maxWidth="sm" sx={{ position: "relative", top: "20vh" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            component="div"
            sx={{ textAlign: "center", color: "#E64545" }}
          >
            Welcome back
          </Typography>
          <FormControl>
            <TextField
              name="username"
              label="Username"
              variant="outlined"
              sx={{ margin: "2vh 0" }}
              onChange={handleUpdate}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="password"
              name="password"
              type="password"
              onChange={handleUpdate}
              label="Password"
              variant="outlined"
              sx={{ margin: "2vh 0" }}
            />
          </FormControl>

          <Button
            onClick={handleLog}
            variant="contained"
            sx={{ marginBottom: "2vh" }}
          >
            Login
          </Button>
          <Button onClick={() => navigate("/create")}>Create account</Button>
        </Box>
      </Container>
    </div>
  );
};
