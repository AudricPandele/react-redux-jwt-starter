import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthentification } from '../actions/index';
import { Link } from 'react-router-dom';

export class Header extends Component {
  setAuthentification = () => {
    this.props.setAuthentification(!this.props.isLoggedIn);
  };

  renderAuthentificationLabel = () => {
    if (this.props.isLoggedIn) {
      return 'Deconnexion';
    }
    return 'Connexion';
  };

  renderAuthentificationLink = () => {
    if (this.props.isLoggedIn) {
      return (
        <li className='nav-item'>
          <Link className='nav-link' to={'/signout'}>
            Signout
          </Link>
        </li>
      );
    }
    return [
      <li key={1} className='nav-item'>
        <Link className='nav-link' to={'/signin'}>
          Signin
        </Link>
      </li>,
      <li key={1} className='nav-item'>
        <Link className='nav-link' to={'/signup'}>
          Signup
        </Link>
      </li>
    ];
  };

  render() {
    return (
      <ul className='nav nav-tabs bg-primary'>
        <li className='nav-item'>
          <Link className='nav-link active' to={'/'}>
            Accueil
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to={'/ressources'}>
            Ressources
          </Link>
        </li>
        {this.renderAuthentificationLink()}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.authentification.isLoggedIn
});

const mapDispatchToProps = {
  setAuthentification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
