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
			<a className="cla" href="http://localhost:3000/" style={{textDecoration:"none", color:"white", marginLeft:"20%"}}>Volver a Mantenimiento</a>
	</footer>
);

Footer.propTypes = {
  logout: PropTypes.func
};

export default Footer;