import React from 'react'
import {Container, Dropdown, Header, Image, Menu,} from 'semantic-ui-react'
import '../styles/headerMenu.css'

const Navbar = () => (
  <div>
    <Menu fixed='top' inverted>
      <Container id="left-header-menu">
        <Menu.Item  header>
          {/* <Image size='mini' src='/logo.png' style={{marginRight: '1.5em'}} /> */}
          Detakt Music
        </Menu.Item>
      </Container>
      <Container id="right-header-menu">
        <Menu.Item position='right'>
          Login
        </Menu.Item>
      </Container>
    </Menu>
  </div>
)

export default Navbar
