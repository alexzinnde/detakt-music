import React from 'react'
import {Container} from 'semantic-ui-react'

//@ts-ignore
const ContentContainer = ({children}) => {
  return <Container style={{marginTop: '70px'}}>{children}</Container>
}

export default ContentContainer
