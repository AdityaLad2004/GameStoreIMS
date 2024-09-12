import { Box, Typography } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h2" gutterBottom>
        Welcome to the Game Store!
      </Typography>
      <Typography variant="h6" color="textSecondary">
        A platform to discover, buy, and manage your favorite games. Built using
        the MERN stack with modern UI/UX design.
      </Typography>
    </Box>
  );
};

export default About;
