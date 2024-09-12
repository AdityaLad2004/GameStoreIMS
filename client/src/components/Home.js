import { Button, Typography, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Button
          LinkComponent={Link}
          to="/games"
          sx={{ marginTop: 15, background: "#FF5733" }}
          variant="contained"
        >
          <Typography variant="h3" color="white">View All Games</Typography>
        </Button>
      </Box>
    </div>
  );
};

export default Home;
