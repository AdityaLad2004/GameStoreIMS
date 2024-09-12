import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const GameDetail = () => {
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    price: "",
    devs: "",
    image: "",
    available: false,
  });
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/games/${id}`);
      setInputs(res.data.game);
      setChecked(res.data.game.available);
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/games/${id}`, {
      ...inputs,
      available: checked,
    });
    navigate("/games");
  };

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      marginTop={5}
    >
      <Typography variant="h4">Edit Game</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={inputs.name}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Developer"
          name="devs"
          value={inputs.devs}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          value={inputs.description}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Price"
          name="price"
          value={inputs.price}
          type="number"
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Image URL"
          name="image"
          value={inputs.image}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
          }
          label="Available"
        />
        <Button variant="contained" type="submit" color="primary">
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default GameDetail;
