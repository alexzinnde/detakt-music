import React from 'react'
import {Card, Button} from 'semantic-ui-react'

import {Demo} from '@prisma/client'

const DemoCard = (props: Demo) => {
  console.log('PROPS', props)
  const {artistAlias, name, link, status, createdAt, updatedAt} = props
  return (
    <Card>
      <Card.Content>
        {/* <Image floated='right' size='mini' src='/images/avatar/large/steve.jpg' /> */}
        <Card.Header>{artistAlias}</Card.Header>
        <Card.Meta>{name}</Card.Meta>
        <Card.Description>
          {link}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Approve
          </Button>
          <Button basic color='red'>
            Decline
          </Button>
        </div>
      </Card.Content>
    </Card>
  )
}

export default DemoCard
