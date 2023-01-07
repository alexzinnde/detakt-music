import React from 'react'
import {Routes, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'

import DemoSubmissionForm from './components/forms/DemoSubmissionForm.js'
import NavigationBar from './components/navigation/NavigationBar.js'
import DemoList from './components/demos/DemoListPage.js'

function App() {
  return (
    <>
      <NavigationBar />
      <Container>
        <Routes>
          <Route path='/' element={<DemoSubmissionForm />} />
          <Route path='/demo/list' element={<DemoList />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
