import { Button, Checkbox, FormControlLabel, FormLabel, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddGame = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    price: "",
    devs: "",
    image: "",
  });
  const [checked, setChecked] = useState(false);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      throw new Error("No file selected");
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded, URL:", response.data); // Check this log
      return response.data; // This should contain the image URL
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error; // Rethrow the error to handle it in handleSubmit
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form...");
      const imageUrl = await uploadFile();
      console.log("Image URL:", imageUrl); // Check the image URL
      const gameData = {
        ...inputs,
        image: imageUrl,
        available: checked,
      };
      console.log("Game Data:", gameData); // Check the game data
      await axios.post("http://localhost:5000/games", gameData);
      console.log("Game added successfully!");
      history("/games");
    } catch (error) {
      console.error("Error adding game:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent={"center"}
        maxWidth={700}
        alignContent={"center"}
        alignSelf="center"
        marginLeft={"auto"}
        marginRight="auto"
        marginTop={10}
      >
        <FormLabel>Name</FormLabel>
        <TextField
          value={inputs.name}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="name"
        />
        <FormLabel>Devs</FormLabel>
        <TextField
          value={inputs.devs}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="devs"
        />
        <FormLabel>Description</FormLabel>
        <TextField
          value={inputs.description}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="description"
        />
        <FormLabel>Price</FormLabel>
        <TextField
          value={inputs.price}
          onChange={handleChange}
          type="number"
          margin="normal"
          fullWidth
          variant="outlined"
          name="price"
        />
        <FormLabel>Image</FormLabel>
        <input type="file" onChange={handleFileChange} />
        <FormControlLabel
          control={
            <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
          }
          label="Available"
        />

        <Button variant="contained" type="submit">
          Add Game
        </Button>
      </Box>
    </form>
  );
};

export default AddGame;
