import React, { Component } from 'react';
import { connect } from 'react-redux';
import StarRating from './StarRating';

import { addMovie, editMovie, updateMovie, deleteMovie, toggleModal } from '../actions';

@connect(mapStateToModalProps, { addMovie, editMovie, updateMovie, deleteMovie, toggleModal })
export default class Modal extends Component {
  constructor(props) {
    super(props);

      this.closeModal = this.closeModal.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleYearChange = this.handleYearChange.bind(this);
      this.handleGenreChange = this.handleGenreChange.bind(this);
      this.handleRatingChange = this.handleRatingChange.bind(this);
      this.handleCommentChange = this.handleCommentChange.bind(this);
      this.handleCreate = this.handleCreate.bind(this);
      this.handleDelete = this.handleDelete.bind(this);

      if (!this.props.newEntry) {
        this.state = ({
          name: props.name,
          year: props.year,
          genre: props.genre,
          rating: props.rating,
          comment: props.comment
        });
      } else {
        this.state = ({
          name: '',
          year: '',
          genre: '',
          rating: '',
          comment: ''
        });
      }
    }

    componentDidMount() {
      $('#editMovie').modal('show');
    }

    closeModal() {
      let modalComponent = this;
      $('#editMovie').modal('hide');
      $('#editMovie').on('hidden.bs.modal', function () {
        modalComponent.props.toggleModal();
      });
    }

    handleDelete() {
      if (this.props.id && !this.props.newEntry) {
        this.props.deleteMovie(this.props.id);
      }
      this.closeModal();
    }

    handleCreate() {
      const movie = {
        name: this.state.name,
        year: this.state.year,
        genre: this.state.genre,
        rating: this.state.rating,
        comment: this.state.comment
      };


      if (!this.props.newEntry) {
        this.props.updateMovie(this.props.id, movie);
      } else {
        this.props.addMovie(movie);
      }

      this.closeModal();
    }

    handleNameChange(e) {
        e.preventDefault();
        this.setState({
          name: e.target.value
        });
      }
    
    handleYearChange(e) {
        e.preventDefault();
        this.setState({
          year: e.target.value
        });
      }
    
    handleGenreChange(e) {
      e.preventDefault();
      this.setState({
        genre: e.target.value
      });
    }
    
    handleRatingChange(selected) {
      this.setState({
        rating: selected
      });
    }
    
    handleCommentChange(e) {
      e.preventDefault();
      this.setState({
        comment: e.target.value
      });
    }

    logMe(s) {
      console.log(s);
    }

    render() {
      if (!this.props.isOpen) {
        this.closeModal();
      }
      return <div
        id={"editMovie"}
        className="modal fade"
        data-backdrop="static"
        tabIndex="-1"
        role="dialog"
          >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  onClick={this.closeModal}
                  type="button" className="close"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                {
                  !this.props.newEntry ?
                  <h4 className="modal-title">Edit Movie</h4>
                  : <h4 className="modal-title">Create Movie</h4>
                }
              </div>
              <div className="modal-body">
                <div className="input-form-group">
                  <label htmlFor="movie-name">Name</label>
                  <input type="text"
                    onChange={this.handleNameChange}
                    id="movie-name"
                    className="form-control"
                    value={this.state.name}
                  />
                </div>

                <div className="input-form-group">
                  <label htmlFor="movie-year">Year</label>
                  <input type="number"
                    onChange={this.handleYearChange}
                    id="movie-year"
                    min="1800" max="2100"
                    className="form-control"
                    value={this.state.year}
                  />
                </div>

                <div className="input-form-group">
                  <label htmlFor="movie-genre">Genre</label>
                  <select value={this.state.genre} onChange={this.handleGenreChange} id="movie-genre">
                    <option value="Comedy">Comedy</option>
                    <option value="Drama">Drama</option>
                    <option value="Horror fiction">Horror fiction</option>
                    <option value="Literary realism">Literary realism</option>
                    <option value="Romance">Romance</option>
                    <option value="Satire">Satire</option>
                    <option value="Tragedy">Tragedy</option>
                    <option value="Tragicomedy">Tragicomedy</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Mythology">Mythology</option>
                    <option value="Adventure">Adventure</option>
                  </select>
                </div>

                {/* <div className="input-form-group">
                  <label htmlFor="movie-rating">Rating</label>
                  <input type="number"
                    onChange={this.handleRatingChange}
                    id="movie-rating"
                    className="form-control"
                    value={this.state.rating}
                  />
                </div> */}

                <div>
                  <StarRating starsSelected={this.state.rating} onRate={this.handleRatingChange} />
                </div>

                <div className="input-form-group">
                  <label htmlFor="movie-comment">Comment</label>
                  <textarea
                    onChange={this.handleCommentChange}
                    id="movie-comment"
                    className="form-control"
                    value={this.state.comment}
                  />
                </div>

              </div>
              <div className="modal-footer">
                <button onClick={this.closeModal} type="button" className="btn btn-default mystyle">
                  Cancel
                </button>
                <button onClick={this.handleCreate} type="button" className="btn btn-primary">
                  Save changes
                </button>
                <button onClick={this.handleDelete} type="button" className="btn btn-danger bottom-left">
                  Delete
                </button>
              </div>
            </div>
          </div>
      </div>
    }
}

function mapStateToModalProps(state) {
  return {
    id: state.movies.current[0].id,
    name: state.movies.current[0].name,
    year: state.movies.current[0].year,
    genre: state.movies.current[0].genre,
    rating: state.movies.current[0].rating,
    comment: state.movies.current[0].comment,
    isOpen: state.modal.isOpen,
    newEntry: state.modal.newEntry
  };
}