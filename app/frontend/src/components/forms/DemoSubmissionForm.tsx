import React from 'react'
import {useFormik} from 'formik'
import {Hypnosis} from 'react-cssfx-loading'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

const validate = (values) => {
  const errors: any = {}

  if (!values.name) {
    errors.artistAlias = 'Required'
  } else if (values.artistAlias.length > 30) {
    errors.name = 'Is your name really longer than 30 characters?!'
  }

  if (!values.artistAlias) {
    errors.artistAlias = 'Required'
  } else if (values.artistAlias.length > 30) {
    errors.artistAlias = 'Must be 30 characters or less'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

const isLoading = true

const DemoSubmissionForm = () => {
  const formik = useFormik({
    initialValues: {
      artistAlias: '',
      name: '',
      email: '',
      link: '',
      message: ''
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    }
  })

  return (
    <Container style={{maxWidth: '400px'}}>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className='mb-3' controlId='demoSubmissionForm'>
          <Form.Control name='artistAlias' type='text' max={30} placeholder='Artist Alias' onChange={formik.handleChange} value={formik.values.artistAlias} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='demoSubmissionForm'>
          <Form.Control type='text' name='name' max={30} placeholder='Name' onChange={formik.handleChange} value={formik.values.name} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='demoSubmissionForm'>
          <Form.Control type='email' name='email' max={30} placeholder='Email' onChange={formik.handleChange} value={formik.values.email} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='demoSubmissionForm'>
          <Form.Control type='text' name='link' max={30} placeholder='https://soundcloud.com/.....' onChange={formik.handleChange} value={formik.values.link} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='demoSubmissionForm'>
          <Form.Control type='text' name='message' as={'textarea'} placeholder='Let us know how you feel' onChange={formik.handleChange} value={formik.values.message} />
        </Form.Group>

        <Button variant='dark' type='submit' style={{width: '100%'}} disabled={isLoading}>
          {isLoading ? <Hypnosis color='grey' style={{margin: 'auto'}} /> : 'Submit'}
        </Button>
      </Form>
    </Container>
  )
}

export default DemoSubmissionForm
