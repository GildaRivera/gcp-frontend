import React from "react";
import {
  Avatar,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { Loading, Notify } from "notiflix";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateR } from "../../../redux/user/reducer";
export function Profile(props) {
  const ENDPOINT = "http://localhost:3001/api";
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [changed, setChanged] = useState(false);
  const [update, setUpdate] = useState([]);
  const [form, setForm] = useState({
    name: user.name,
    username: user.username,
    biografia: user.biografia,
    password: user.password,
    gravatar: user.gravatar,
  });

  const handleUpdate = (e) => {
    setForm((prev) => {
      let newValue = e.target.value;
      prev[e.target.name] = newValue;
      return prev;
    });
  };
  const style = {
    // backgroundImage: `url(${image})`,
    height: "20vh",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
  };
  async function handleSave() {
    Loading.circle();
    await fetch(`${ENDPOINT}/user/${user.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `token ${user.token}`,
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (response.ok) {
          Notify.success("User info updated", { timeout: 1000 });
          return response.json();
        }
      })
      .then(async (actualData) => {
        setChanged(true);
        setUpdate(actualData);
        console.log(form,actualData)
        await dispatch(updateR({ user: actualData }));
      })
      .catch((err) => {
        Notify.failure("Error in updating", { timeout: 1000 });
      });
    Loading.remove();
  }
  useEffect(() => {
    if (changed) {
      //  user.handleLogin(true, update);
    }
    setChanged(false);
  }, [update]);

  return (
    <div>
      <div
        style={{
          position: "relative",
          left: "4vw",
          display: "block",
          top: "8vh",
        }}
      >
        <Avatar
          sx={{ bgcolor: "#1976d2", width: "140px", height: "140px" }}
          alt="Remy Sharp"
          src={user.gravatar}
          style={style}
        ></Avatar>
      </div>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormControl>
            <TextField
              id="name"
              name="name"
              label="Name"
              defaultValue={user.name}
              variant="outlined"
              sx={{ margin: "2vh 0" }}
              onChange={handleUpdate}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="username"
              name="username"
              onChange={handleUpdate}
              label="Username"
              defaultValue={user.username}
              variant="outlined"
              sx={{ margin: "2vh 0" }}
            />
          </FormControl>

          <FormControl>
            <TextField
              id="biografia"
              label="Biografia"
              name="biografia"
              defaultValue={user.biografia}
              onChange={handleUpdate}
              variant="outlined"
              sx={{ margin: "2vh 0" }}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              value={user.password}
              sx={{ margin: "2vh 0" }}
              onChange={handleUpdate}
              required
            />
          </FormControl>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </Box>
      </Container>
    </div>
  );
}
