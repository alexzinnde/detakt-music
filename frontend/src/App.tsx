import React from 'react'
import {Container} from 'react-bootstrap'
import NavHeader from './components/navigation/NavHeader'
import DemoSubmitForm from './forms/DemoSubmitForm'

const App = () => (
  <>
    <NavHeader />
    <Container className="mt-5">
      <DemoSubmitForm />
    </Container>
  </>
)

export default App
