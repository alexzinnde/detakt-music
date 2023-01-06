import React from 'react'

import {Container} from 'react-bootstrap'

import DemoSubmissionForm from './components/forms/DemoSubmissionForm'
import NavigationBar from './components/navigation/NavigationBar.js'

function App() {
  return (
    <>
      <NavigationBar />
      <Container>
        <DemoSubmissionForm />
      </Container>
    </>
  )
}

export default App
