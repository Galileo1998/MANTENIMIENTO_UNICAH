import React from 'react';
import { NavLink } from 'react-router-dom';
// https://react-icons.netlify.com/
import {IoIosHome,IoIosImage, IoIosLogIn, IoIosKey, IoIosToday, IoIosList} from 'react-icons/io';
import './NavBar.css';

const NavItem = ({ to, children, ...rest }) => {
  return (
    <NavLink activeClassName="activeNav" exact to={to}>{children}</NavLink>
  );
};

export default ({auth, unSetAuth})=>{
  console.log(auth);
  if(!auth.logged){
    return(
      <nav>
        <NavItem to="/">&nbsp;Principal</NavItem>
        <NavItem to="/venta">&nbsp;Solicitud</NavItem>
        <NavItem to="/login">&nbsp;Iniciar Sesión</NavItem>
      </nav>
    )
  } else {
    return (
      <nav>
        <NavItem to="/">&nbsp;Principal</NavItem>
        <NavItem to="/misOrdenes">&nbsp;Solicitudes</NavItem>
        <NavItem to="/backlog">&nbsp;Edificios</NavItem>
        <NavItem to="/signin">&nbsp;Nuevo Usuario</NavItem>
      </nav>
    )
  }
}
