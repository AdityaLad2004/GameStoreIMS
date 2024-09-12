import { Button } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Game.css";
const Game = (props) => {
  const history = useNavigate();
  const { _id, name, devs, description, price, image } = props.game;
  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/games/${_id}`)
      .then((res) => res.data)
      .then(() => history("/"))
      .then(() => history("/games"));
  };

  return (
    <div className="card">
      <img src={image} alt={name} />
      <article>By {devs}</article>
      <h3>{name}</h3>
      <p>{description}</p>
      <h3>Rs {price}</h3>
      <Button LinkComponent={Link} to={`/games/${_id}`} sx={{ mt: "auto" }}>
        Update
      </Button>
      <Button color="error" onClick={deleteHandler} sx={{ mt: "auto" }}>
        Delete
      </Button>
    </div>
  );
};

export default Game;
