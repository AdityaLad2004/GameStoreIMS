import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddGame from "./components/AddGame";
import Games from "./components/Game/Games";
import About from "./components/About";
import GameDetail from "./components/Game/GameDetail";

function App() {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddGame />} />
          <Route path="/games" element={<Games />} />
          <Route path="/about" element={<About />} />
          <Route path="/games/:id" element={<GameDetail />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
