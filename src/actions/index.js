import {
  SET_AUTHENTIFICATION,
  INCREMENT_ACTIONS_COUNT,
  ADD_RESSOURCE,
  PARSE_MESSAGE,
  PARSE_ERROR,
  RESET_ERROR
} from './action-types';
import axios from 'axios';

const baseUrl = 'http://localhost:3090';
export function setAuthentification(isLoggedIn) {
  return {
    type: SET_AUTHENTIFICATION,
    payload: isLoggedIn
  };
}

export function incrementActionCount() {
  return {
    type: INCREMENT_ACTIONS_COUNT
  };
}

export function addRessource() {
  return {
    type: ADD_RESSOURCE
  };
}

export function signinUser({ email, password }, history) {
  return function(dispatch) {
    axios
      .post(`${baseUrl}/signin`, {
        email,
        password
      })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        dispatch(setAuthentification(true));
        history.push('/ressources');
      })
      .catch(err => {
        dispatch(parseError('Bad credentials'));
      });
  };
}

export function signupUser({ email, password }, history) {
  return function(dispatch) {
    axios
      .post(`${baseUrl}/signup`, {
        email,
        password
      })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        dispatch(setAuthentification(true));
        history.push('/ressources');
      })
      .catch(err => {
        dispatch(parseError(err));
      });
  };
}

export function signoutUser() {
  return function(dispatch) {
    dispatch(setAuthentification(false));
    localStorage.removeItem('token');
  };
}

export function getSpecialRessources() {
  return function(dispatch) {
    axios
      .get(`${baseUrl}/ressources`, {
        headers: { authorization: localStorage.getItem('token') }
      })
      .then(res => {
        dispatch({
          type: PARSE_MESSAGE,
          payload: res.data.result
        });
      })
      .catch(err => {
        dispatch(parseError(err));
      });
  };
}

export function parseError(message) {
  return {
    type: PARSE_ERROR,
    payload: message
  };
}

export function resetError() {
  return {
    type: RESET_ERROR
  };
}
