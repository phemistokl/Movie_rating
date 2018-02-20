export const addMovie = movie => {
	return {
		type: "ADD_MOVIE",
		id: Date.now(),
		name: movie.name,
		year: movie.year,
		genre: movie.genre,
		rating: movie.rating,
		comment: movie.comment
	};
};

export const updateMovie = (id, movie) => {
	return {
		type: "UPDATE_MOVIE",
		id,
		name: movie.name,
		year: movie.year,
		genre: movie.genre,
		rating: movie.rating,
		comment: movie.comment
	};
};

export const deleteMovie = id => {
    return {
        type: 'DELETE_MOVIE',
        id
    };
};

export const createMovie = () => {
	return {
    	type: 'CREATE_MOVIE'
	};
};

export const rateMovie = (id, rating) => {
	return {
		type: 'RATE_MOVIE',
		id,
		rating: rating
	}
};

export const currentMovie = id => {
	return {
    	type: 'CURRENT_MOVIE',
		id
	};
};

export const searchMovie = search => {
	return {
		type: 'SEARCH_MOVIE',
		search
	}
};

export const toggleModal = () => {
	return {
    	type: 'TOGGLE_MODAL'
	};
};
