import {
    GET_POKEMONS,
    GET_ALL_TYPES,
    FILTER_CREATED,
    ORDER_NAME,
    FILTER_TYPE,
    ORDER_STR,
    GET_POKEMON_NAME,
    POST_POKEMON,
    GET_DETAILS,
    CLEAN_DETAIL,
    CLEAN_POKEMONS
} from "../actions";

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    pokeDetail: []
}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            };

        case CLEAN_POKEMONS:
            return {
                ...state,
                pokemons: action.payload
            }

        case GET_ALL_TYPES:
            return {
                ...state,
                types: action.payload
            };

        case FILTER_CREATED:
            return {
                ...state,
            };

        case FILTER_TYPE:
            return {
                ...state,
            };

        case ORDER_NAME:
            return {
                ...state,
            };

        case ORDER_STR:
            return {
                ...state,
            };

        case GET_POKEMON_NAME:
            return {
                ...state,
                pokemons: action.payload
            };

        case GET_DETAILS:
            return {
                ...state,
                pokeDetail: action.payload
            }

        case CLEAN_DETAIL:
            return {
                ...state,
                pokeDetail: action.payload
            }

        case POST_POKEMON:
            return {
                ...state
            };

        default:
            return { ...state };
    };

};

export default rootReducer;