import React, { Component } from 'react';
import { formatNumber } from '../../helpers/formatHelpers';
import css from './header.module.css';

export default class Header extends Component {
  handleInputChange = (event) => {
    const newText = event.target.value;
    this.props.onChangeFilter(newText);
  }
  
  render() {
    const { filter, countryCount, totalPopulation } = this.props;

    return (
      <div className={css.flexRow}>
        <input style={{ maxWidth: '300px', marginRight: '10px' }} placeholder="Filtro" type="text" value={filter} onChange={this.handleInputChange} /> |
        <span className={css.info}>Países: <strong>{countryCount}</strong></span> |
        <span lassName={css.info}>População: <strong>{formatNumber(totalPopulation)}</strong></span> |
      </div>
    )
  }
}
