import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row  from 'react-bootstrap/lib/Row';
import Col  from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Table from 'react-bootstrap/lib/Table';

import Movie from './Movie';
import Modal from './Modal';
import Search from './Search';

import { updateMovie, createMovie, toggleModal, searchMovie } from '../actions';

@connect(mapStateToProps, { updateMovie, createMovie, toggleModal, searchMovie })
export default class MoviesBox extends Component {
  constructor(props) {
    super(props);

    this.createMovie = this.createMovie.bind(this);
    this.logSearch = this.logSearch.bind(this);

    this.state ={
      movies: []
    };
  }

  createMovie() {
    this.props.createMovie();
    this.props.toggleModal();
  }

  logSearch(search) {
    this.props.searchMovie(search);
  }

  render() {
    return (
      <div className="MoviesBox">
        { this.props.isOpen ? <Modal /> : null }
        <Row className="show-grid">
          <Col xs={12} sm={12} md={12} lg={12}>
            <h1>List of movies</h1>
            <Button bsStyle="primary" onClick={this.createMovie}>Add movie rating</Button>
            <Search showSearch={this.logSearch} />
          </Col>
        </Row>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Year</th>
              <th>Genre</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.movies.map(movie => 
                <Movie key={movie.id} {...movie} />
              )
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.filter)
  return {
    movies: state.movies.movies.filter(movie => movie.name.toLowerCase().includes(state.filter.toLowerCase())),
    isOpen: state.modal.isOpen
  };
}