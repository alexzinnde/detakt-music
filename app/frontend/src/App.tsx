import {useEffect} from 'react'
import Navbar from './components/Navbar'
import {getAllDemos} from './services/features/demos/demoSlice'
import {useAppDispatch} from './services/hooks'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAllDemos())
  }, [])

  return (
    <div className='App'>
      <Navbar />
      <div>
        <h2>Detakt</h2>
      </div>
    </div>
  )
}

export default App
