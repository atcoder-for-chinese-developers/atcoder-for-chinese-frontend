import { Link } from 'react-router-dom';
import { Container, Icon, Menu, Sidebar } from 'semantic-ui-react';
import './Nav.css';

import logo from '../static/logo.png';
import { useWindowSize } from '../js/useWindowSize';
import { useState } from 'react';

type navItem = {
  name: string,
  icon: JSX.Element,
  to: string,
  key: string
}

const navItems: navItem[] = [
  {
    name: 'ABC',
    icon: <i className='icon ContestIconBlue'>◉</i>,
    to: '/abc',
    key: 'abc'
  },
  {
    name: 'ARC',
    icon: <i className='icon ContestIconOrange'>◉</i>,
    to: '/arc',
    key: 'arc'
  },
  {
    name: 'AGC',
    icon: <i className='icon ContestIconRed'>◉</i>,
    to: '/agc',
    key: 'agc'
  },
  {
    name: 'ABC Like',
    icon: <i className='icon ContestIconBlue'>◉</i>,
    to: '/abc_like',
    key: 'abc_like'
  },
  {
    name: 'ARC Like',
    icon: <i className='icon ContestIconOrange'>◉</i>,
    to: '/arc_like',
    key: 'arc_like'
  },
  {
    name: 'AGC Like',
    icon: <i className='icon ContestIconRed'>◉</i>,
    to: '/agc_like',
    key: 'agc_like'
  },
  {
    name: 'AHC',
    icon: <i className='icon ContestIconBlack'>◉</i>,
    to: '/ahc',
    key: 'ahc'
  },
  {
    name: 'Others',
    icon: <i className='icon ContestIconBlack'>◉</i>,
    to: '/others',
    key: 'others'
  }
]

function Nav() {
  const windowSize = useWindowSize();
  const [sidebarVisibility, setSidebarVisibility] = useState<boolean>(false);

  return (
    <>
      <Menu size='large' fixed='top' borderless>
        <Container>
          <Menu.Item as={ Link } to='/' icon><img src={ logo } alt="Atcoder for Chinese" className='Logo'/></Menu.Item>
          {
            windowSize.width > 991 ?
              navItems.map(item => (
                <Menu.Item as={ Link } to={ item.to }>
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
              navItems.map(item => (
                <Menu.Item as={ Link } to={ item.to }>
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
