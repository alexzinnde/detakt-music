import {Link, useLocation} from 'react-router-dom'
// @ts-ignore
import Container from 'react-bootstrap/Container'
// @ts-ignore
import Nav from 'react-bootstrap/Nav'
// @ts-ignore
import Navbar from 'react-bootstrap/Navbar'
import logo from '../../assets/logo.png'

function NavigationBar() {
  const currentLocation = useLocation().pathname

  return (
    <>
      <Navbar bg='dark' variant='dark' style={{padding: '1rem 10rem', marginBottom: '3rem'}}>
        <Container fluid>
          <Navbar.Brand href='#home'>
            <img alt='' src={logo} style={{filter: 'invert(100%)', marginRight: '6px'}} width='30' height='30' className='d-inline-block align-top' />{' '}
            <div style={{fontWeight: '700', fontSize: 'x-large', marginBottom: '10px', display: 'inline-block'}}>Detakt Music</div>
          </Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/' active={currentLocation === '/' ? true : false}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to='/demo/list' active={currentLocation === '/demo/list' ? true : false}>
              Demo List
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavigationBar
