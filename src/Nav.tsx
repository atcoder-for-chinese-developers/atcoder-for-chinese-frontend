import { Link } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import './Nav.css';

import logo from './logo.png';

function Nav() {
  return (
    <div className="Nav">
      <Menu size='large'>
        <Container>
          <Menu.Item as={Link} to="/" icon><img src={ logo } alt="Atcoder for Chinese" className='Logo'></img></Menu.Item>
          <Menu.Item as={Link} to="/abc">ABC</Menu.Item>
          <Menu.Item as={Link} to="/arc">ARC</Menu.Item>
          <Menu.Item as={Link} to="/agc">AGC</Menu.Item>
          <Menu.Item as={Link} to="/ahc">AHC</Menu.Item>
          <Menu.Item as={Link} to="/others">其它</Menu.Item>
        </Container>
      </Menu>
    </div>
  );
}

export default Nav;
