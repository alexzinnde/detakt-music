// @ts-ignore
import Container from 'react-bootstrap/Container'
// @ts-ignore
import Navbar from 'react-bootstrap/Navbar'
import logo from '../../assets/logo.png'

function NavigationBar() {
  return (
    <>
      <Navbar bg='dark' variant='dark' style={{padding: '1rem 10rem', marginBottom: '3rem'}}>
        <Container fluid>
          <Navbar.Brand href='#home'>
            <img alt='' src={logo} style={{filter: 'invert(100%)', marginRight: '6px'}} width='30' height='30' className='d-inline-block align-top' />{' '}
            <div style={{fontWeight: '700', fontSize: 'x-large', marginBottom: '10px', display: 'inline-block'}}>Detakt Music</div>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}

export default NavigationBar
