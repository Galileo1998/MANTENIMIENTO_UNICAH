import React, { PropTypes } from 'react';

import './header.scss';

const Header = () => (
	<header className='header'>
		<h1>UNIVERSIDAD CATÓLICA DE HONDURAS</h1>
	</header>
);

Header.propTypes = {
  logout: PropTypes.func
};

export default Header;