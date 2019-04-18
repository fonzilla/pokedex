import React from "react";

function Cell({ poke_id, species, handleClick }) {
  return (
    <div key={poke_id} className="card" onClick={handleClick}>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke_id}.png`}
        alt={`${species.name} front-view`}
      />
      <span className="pokemon-name">{species.name.toUpperCase()}</span>
    </div>
  );
}

export default Cell;
