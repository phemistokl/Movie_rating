import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux'

const InitialState = {
	movies: [
		{
			id: 0,
			name: "Home Along",
			year: 1990,
			genre: "Comedy",
			rating: 3,
			comment: "Lorem Ipsum - это текст, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
		},
		{
			id: 1,
			name: "Terminator",
			year: 1989,
			genre: "Fantasy",
			rating: 0,
			comment: "Lorem Ipsum - это текст, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
		},
		{
			id: 2,
			name: "Titanic",
			year: 1996,
			genre: "Romance",
			rating: 0,
			comment: "Lorem Ipsum - это текст, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
		},
		{
			id: 3,
			name: "Avatar",
			year: 2012,
			genre: "Adventure",
			rating: 0,
			comment: "Lorem Ipsum - это текст, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
		},
		{
			id: 4,
			name: "Interstellar",
			year: 2016,
			genre: "Fantasy",
			rating: 0,
			comment: "Lorem Ipsum - это текст, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
		},
	],
	current: {id: null}
}

function movie(state = {}, action) {
	switch (action.type) {
		case 'ADD_MOVIE': {
			return {
				id: action.id,
				name: action.name,
				year: action.year,
				genre: action.genre,
				rating: action.rating,
				comment: action.comment
			}
		}
		case 'CURRENT_MOVIE': {
			return state.id == action.id;
		}
		case 'UPDATE_MOVIE': {
			if (state.id == action.id) {
				return {
					id: action.id,
					name: action.name,
					year: action.year,
					genre: action.genre,
					rating: action.rating,
					comment: action.comment
				}
			} else {
				return state;
			}
		}
		case 'RATE_MOVIE': {
			if (state.id == action.id) {
				return {
					...state,
					rating: action.rating
				}
			} else {
				return state;
			}
		}
		case 'DELETE_MOVIE': {
			return state.id !== action.id;
		}
		default: {
			return state;
		}
	}
}

function movies(state =  InitialState, action) {
	switch (action.type) {
		case 'ADD_MOVIE': {
			return {
				...state,
				movies: [...state.movies, movie(undefined, action)]
			}
		}
		case 'CURRENT_MOVIE': {
			return {
				...state,
				current: {...state.movies.filter(item => movie(item, action))}
			}
		}
		case 'UPDATE_MOVIE': {
			return {
				...state,
				movies: state.movies.map(item => movie(item, action))
			}
		}
		case 'RATE_MOVIE': {
			return {
				...state,
				movies: state.movies.map(item => movie(item, action))
			}
		}
		case 'DELETE_MOVIE': {
			return {
				...state,
				movies: state.movies.filter(item => movie(item, action))
			}
		}
		default: {
			return state;
		}
	}  
};

function modal( state = { isOpen: false, newEntry: false }, action) {
  switch(action.type) {
    case 'TOGGLE_MODAL':
      return {
        ...state,
        isOpen: !state.isOpen
      };
    case 'CREATE_MOVIE':
      return {
        ...state,
        newEntry: true
      };
    case 'CURRENT_MOVIE':
      return {
        ...state,
        newEntry: false
      };
    default:
      return state
  }
};

function filter(state = "", action) {
	switch(action.type) {
		case 'SEARCH_MOVIE': {
			return action.search;
		}
		default: {
			return state;
		}
	}
}

export default combineReducers({ movies, movie, modal, filter, routing });
