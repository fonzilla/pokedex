import React, { Component } from "react";
import Cell from "./Cell";
import Modal from "./Modal";
import { fetchAllPokemon, getPokeData } from "../utils/api";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
      selected: null,
      show: false
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    fetchAllPokemon().then(pokemon => this.setState({ pokemon }));
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleCloseModal() {
    this.setState({
      show: false,
      selected: null
    });
  }

  handleClick(id) {
    getPokeData(id).then(selected => {
      this.setState({ selected });
    });
    this.handleShow();
  }

  render() {
    let { pokemon, selected } = this.state;

    return (
      <div className="container">
        <Modal
          show={this.state.show}
          handleClose={this.handleCloseModal}
          pokemon={selected}
        />
        <div className="card-list">
          {pokemon.map(({ entry_number, pokemon_species }) => {
            return (
              <Cell
                key={entry_number}
                poke_id={entry_number}
                species={pokemon_species}
                handleClick={() => this.handleClick(entry_number)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
