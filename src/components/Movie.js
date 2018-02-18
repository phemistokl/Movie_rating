import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import StarRating from './StarRating';

import { currentMovie, toggleModal } from '../actions';

@connect(undefined, { currentMovie, toggleModal })
export default class Movie extends Component {
  constructor(props) {
    super(props);

    this.currentMovie = this.currentMovie.bind(this);
  }

  currentMovie() {
    this.props.currentMovie(this.props.id);
    this.props.toggleModal();
  }

  render() {
    const { id, name, year, genre, rating, comment } = this.props;

    return (
      <tr>
        <td>{name}</td>
        <td>{year}</td>
        <td>{genre}</td>
        <td><StarRating starsSelected={rating} /></td>
        <td>{comment}</td>
        <td><Button bsStyle="info" onClick={this.currentMovie}>Edit</Button></td>
      </tr>
    );
  }
}