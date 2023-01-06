import {useEffect} from 'react'
import ContentContainer from './components/ContentContainer'
import DemoPage from './components/demo/DemoPage'
import Navbar from './components/Navbar'


function App() {
  return (
    <div className='App'>
      <Navbar />
      <ContentContainer>
        <DemoPage />
      </ContentContainer>
    </div>
  )
}

export default App
