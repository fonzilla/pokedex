import React, { Component } from "react";
import { getEvolutionChain, getDescription } from "../utils/helper";

function EvolutionChain({ chain }) {
  return (
    <div className="evolution-detail">
      {getEvolutionChain(chain).map((ev1, index) => {
        return (
          <div className="ev-box" key={index}>
            <p className="ev-box-heading">Evolution {index + 1}</p>
            {ev1.map(ev2 => {
              return (
                <div className="evbox-detail" key={ev2[0].name}>
                  <div>
                    <p className="ev-name">{ev2[0].name.toUpperCase()} </p>
                    {ev2[0].via && (
                      <span className="via">(via: {ev2[0].via})</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function EvolutionStats({ stats }) {
  return (
    <div className="ev-stats">
      <h5> Baseline Stats </h5>
      {stats.map((statObj, index) => {
        return (
          <div className="ev-stat-list" key={`${index} name`}>
            <span>{statObj.stat.name}</span>
            <span>{statObj.base_stat}</span>
          </div>
        );
      })}
    </div>
  );
}

class Modal extends Component {
  render() {
    const { pokemon } = this.props;
    const showHideClassName = this.props.show
      ? "modal display-block"
      : "modal display-none";
    if (!pokemon) {
      return null;
    }
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <button onClick={this.props.handleClose}>X</button>
          <div className="detail-container">
            <div className="detail-title">
              <span>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    pokemon.id
                  }.png`}
                  alt={`${pokemon.name} detail-view`}
                />
              </span>
              <div>
                <h2>{pokemon.name.toUpperCase()}</h2>
                {pokemon.habitat && (
                  <p>HABITAT: {pokemon.habitat.name.toUpperCase()}</p>
                )}
              </div>
            </div>
            <div className="evolution-stats-and-chain">
              <p>{getDescription(pokemon.flavor_text_entries)}</p>
              <EvolutionStats stats={pokemon.stats} />
            </div>
            <EvolutionChain chain={pokemon.chain} />
          </div>
        </section>
      </div>
    );
  }
}

export default Modal;
