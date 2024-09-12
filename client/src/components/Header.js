import React, { useState } from "react";
import { AppBar, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [value, setValue] = useState();
  return (
    <div>
      <AppBar sx={{ backgroundColor: "#2E3B55" }} position="sticky">
        <Toolbar>
          <NavLink to="/" style={{ color: "white" }}>
            <Typography variant="h6">
              <SportsEsportsIcon /> Game Store
            </Typography>
          </NavLink>
          <Tabs
            sx={{ ml: "auto" }}
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={NavLink} to="/add" label="Add Game" />
            <Tab LinkComponent={NavLink} to="/games" label="Games" />
            <Tab LinkComponent={NavLink} to="/about" label="About Us" />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
