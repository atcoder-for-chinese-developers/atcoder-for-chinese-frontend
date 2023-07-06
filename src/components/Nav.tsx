import { Link, NavLink } from 'react-router-dom';
import { Container, Icon, Menu, Sidebar } from 'semantic-ui-react';
import './Nav.css';

import logo from '../static/logo.png';
import { useWindowSize } from '../js/useWindowSize';
import { useState } from 'react';
import { useScrollPosition } from '../js/useScrollPosition';

interface NavProps {
  navItems: NavItem[]
};

function Nav(props: NavProps) {
  const windowSize = useWindowSize();
  const scrollPosition = useScrollPosition();
  const [sidebarVisibility, setSidebarVisibility] = useState<boolean>(false);

  return (
    <>
      <Menu size='large' fixed='top' borderless className={ scrollPosition === 0 ? 'NoShadow' : undefined }>
        <Container>
          <Menu.Item as={ Link } to='/' icon><img src={ logo } alt="Atcoder for Chinese" className='Logo'/></Menu.Item>
          {
            windowSize.width > 991 ?
              props.navItems.map(item => (
                <Menu.Item as={ item.navLink ? NavLink : Link } to={ item.to } key={ item.key }>
                  { item.icon }
                  { item.name }
                </Menu.Item>
              ))
            : null
          }
          {
            windowSize.width <= 991 ?
              <Menu.Item as='a' icon position='right' onClick={ () => { setSidebarVisibility(!sidebarVisibility) } }><Icon name='list'/></Menu.Item>
            : null
          }
        </Container>
      </Menu>
      {
        windowSize.width <= 991 ?
          <Sidebar
            as={ Menu }
            animation='overlay'
            vertical
            direction='left'
            visible={ sidebarVisibility }
            className='Sidebar'
          >
            <Menu.Item
              as='a'
              icon
              onClick={ () => { setSidebarVisibility(false); } }
              className='SidebarHeader'
            >
              <img src={ logo } alt="Atcoder for Chinese" className='Logo SidebarIcon'/>
            </Menu.Item>
            {
              props.navItems.map(item => (
                <Menu.Item as={ item.navLink ? NavLink : Link } to={ item.to } key={ item.key }>
                  { item.icon }
                  { item.name }
                </Menu.Item>
              ))
            }
            <Menu.Item
              as='a'
              onClick={ () => { setSidebarVisibility(false); } }
            >
              <Icon name='cancel'/>
              关闭
            </Menu.Item>
          </Sidebar>
        : null
      }
    </>
  );
}

export default Nav;
