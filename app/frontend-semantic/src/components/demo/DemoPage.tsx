import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../services/hooks'
import {Container, Card} from 'semantic-ui-react'
import DemoCard from './demoCard'
import {getAllDemos} from '../../services/features/demos/demoSlice'

const DemoPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllDemos())
  }, [])

  const {demos, isLoading} = useAppSelector(({demo}) => ({demos: demo.demos, isLoading: demo.isLoading}))
  if (isLoading) {
    return (
      <Container style={{border: '2px solid red'}}>
        <h2>Loading...</h2>
      </Container>
    )
  }
  if (demos.length === 0) {
    return (
      <Container style={{border: '2px solid red'}}>
        <h2>No Demos</h2>
      </Container>
    )
  }

  return (
    <Container style={{border: '2px solid red'}}>
      <div>
        There are {demos.length} demos
      </div>
      <Card.Group itemsPerRow={3}>
        {demos.map((demo) => (
          <DemoCard key={demo.id} {...demo} />
        ))}
      </Card.Group>
    </Container>
  )
}

export default DemoPage
