import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import axios from "axios";
import Game from "./Game";
const URL = "http://localhost:5000/games";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const Games = () => {
  const [games, setGames] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setGames(data.games));
  }, []);

  return (
    <Grid container spacing={4} sx={{ padding: 3 }}>
      {games &&
  games.map((game, i) => (
    <Grid item xs={12} sm={6} md={4} key={i}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt={game.name}
          height="140"
          image={game.image}
          onError={() => console.log(`Error loading image: ${game.image}`)} 
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {game.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {game.description}
          </Typography>
          <Typography variant="h6" color="primary">
            Rs {game.price}
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} href={`/games/${game._id}`}>
            View Details
          </Button>
        </CardContent>
      </Card>
    </Grid>
  ))}

    </Grid>
  );
};

export default Games;
