import React, { PropTypes } from 'react';
import Social from './social.jsx';

import './footer.scss';

const socials = [
	{link: 'http://vk.com/atmofease', social: 'vk'},
	{link: 'http://www.facebook.com/Vlad.Tsykota', social: 'facebook-square'},
	{link: 'http://github.com/scurimich/', social: 'github'}
];

const Footer = ({ logout }) => (
	<footer className='footer'>
		<center>
		<a className='footer__auth' onClick={logout}>Cerrar Sesión</a>
		</center>
	</footer>
);

Footer.propTypes = {
  logout: PropTypes.func
};

export default Footer;