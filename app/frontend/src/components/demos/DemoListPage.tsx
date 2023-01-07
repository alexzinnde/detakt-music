import React, {useEffect} from 'react'

import {useAppDispatch, useAppSelector} from '../../services/hooks.js'
import {getAllDemos} from '../../services/slices/demo.js'
// @ts-ignore
import Container from 'react-bootstrap/Container'
// @ts-ignore
import Table from 'react-bootstrap/Table'
// @ts-ignore
import Card from 'react-bootstrap/Card'
import {FaRegComment, FaRegCheckCircle, FaRegTimesCircle} from 'react-icons/fa'
import {RiFolderReceivedLine} from 'react-icons/ri'
import {MdPendingActions, MdMarkChatUnread} from 'react-icons/md'
import {DemoStatus} from '@prisma/client'

const statusMap = {
  RECEIVED: 'info',
  PENDING_REVIEW: 'danger',
  REJECTED: 'dark',
  ACCEPTED: 'success'
}

const DemoCard = ({artistAlias, name, email, link, createdAt, status}) => {
  return (
    <Card className='my-2 p-0' border={statusMap[status]} style={{width: '18rem', cursor: 'pointer'}}>
      <Card.Body className='py-1'>
        <Card.Title>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{display: 'inline-block'}}>{artistAlias}</div>
            <div style={{width: '30px'}}></div>
            <div>
              <span style={{fontSize: 'medium', marginRight: '6px'}}>8</span>
              <FaRegTimesCircle />
            </div>
            <div>
              <span style={{fontSize: 'medium', marginRight: '6px'}}>8</span>
              <FaRegCheckCircle />
            </div>
            <div>
              <span style={{fontSize: 'medium', marginRight: '6px'}}>8</span>
              <FaRegComment />
            </div>
          </div>
        </Card.Title>
        {name && (
          <Card.Subtitle className='mt-1 mb-2 text-muted'>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div style={{display: 'inline-block'}}>{name}</div> <div style={{textAlign: 'right', display: 'inline-block'}}>{email}</div>
            </div>
          </Card.Subtitle>
        )}
        {email && <Card.Subtitle className='mt-1 mb-2 text-muted'></Card.Subtitle>}
      </Card.Body>
    </Card>
  )
}

const DemoCardGroup = () => {
  const dispatch = useAppDispatch()
  const {demos} = useAppSelector((state) => state.demoState)
  useEffect(() => {
    dispatch(getAllDemos())
  }, [])

  const DemoListHeader = ({demos}) => {
    const numReceived = demos.length ? demos.filter((demo) => demo.status === DemoStatus.RECEIVED).length : 0
    const numPending = demos.length ? demos.filter((demo) => demo.status === DemoStatus.PENDING_REVIEW).length : 0
    return (
      <Card style={{width: '18rem', margin: 'auto'}}>
        <Card.Header>
          <Container fluid style={{textAlign: 'right'}}>
            Demos
            <div className='mx-1' style={{display: 'inline-block'}}>
              {' '}
              <MdMarkChatUnread />
              <div>{numPending}</div>
            </div>
            <div className='mx-1' style={{display: 'inline-block'}}>
              {' '}
              <RiFolderReceivedLine /> <div>{numReceived}</div>
            </div>
            <div className='mx-1' style={{display: 'inline-block'}}>
              {' '}
              <MdPendingActions />
              <div>{numPending}</div>
            </div>
          </Container>
        </Card.Header>
      </Card>
    )
  }

  return (
    <Container>
      <DemoListHeader demos={demos} />
      <Container fluid className='m0 p0' style={{maxHeight: '600px', overflowY: 'scroll', width: 'fit-content', scrollX: 'none'}}>
        {demos.length && demos.map((demo) => <DemoCard {...demo} />)}
      </Container>
    </Container>
  )
}

const DemoListPage = () => {
  return (
    <Container style={{border: '2px solid black', width: '100%', height: '80vh', display: 'flex'}}>
      <DemoCardGroup />

      <Container>
        <h1>Something Else</h1>
      </Container>
    </Container>
  )
}

export default DemoListPage
