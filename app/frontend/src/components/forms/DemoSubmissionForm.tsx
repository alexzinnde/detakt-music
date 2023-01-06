import React from 'react'
import {useFormik} from 'formik'
import {Hypnosis} from 'react-cssfx-loading'
import {useAppDispatch} from '../../services/store.js'
import {useSelector} from 'react-redux'

// @ts-ignore TODO:: fix this shit
import Form from 'react-bootstrap/Form'
// @ts-ignore
import Button from 'react-bootstrap/Button'
// @ts-ignore
import Container from 'react-bootstrap/Container'
import {submitDemoForm} from '../../services/slices/demo.js'

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

export type DemoSubmissionFormData = {
  artistAlias: string
  name: string
  email: string
  link: string
  message: string
}

const demoLink = 'https://soundcloud.com/sds' + Math.random() * 100000
const message =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const DemoSubmissionForm = () => {
  // @ts-ignore TODO: FIX THIS
  const {isLoading} = useSelector((state) => state.demoState)
  const dispatch = useAppDispatch()

  const initialFormValues = {
    artistAlias: '',
    name: '',
    email: '',
    link: '',
    message: ''
  }
  const formik = useFormik({
    initialValues: {
      artistAlias: 'SpinnZinn',
      name: 'Alex',
      email: 'some@email.com',
      link: demoLink,
      message: message
    },
    validate,
    onSubmit: async (values) => {
      dispatch(submitDemoForm(values))
      await formik.setValues(initialFormValues, false)
    }
  })

  return (
    <Container style={{maxWidth: '400px'}}>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className='mb-3' controlId='demoSubmissionForm'>
          <Form.Control name='artistAlias' type='text' max={30} placeholder='Artist Alias' onChange={formik.handleChange} value={formik.values.artistAlias} />
          {formik.errors.artistAlias && <Form.Text className='text-muted'>We gotta know your artist name!</Form.Text>}
        </Form.Group>

        <Form.Group className='mb-3' controlId='demoSubmissionForm'>
          <Form.Control type='text' name='name' max={30} placeholder='Name' onChange={formik.handleChange} value={formik.values.name} />
          {formik.errors.name && <Form.Text className='text-muted'>We gotta know your real name too!</Form.Text>}
        </Form.Group>

        <Form.Group className='mb-3' controlId='demoSubmissionForm'>
          <Form.Control type='email' name='email' max={30} placeholder='Email' onChange={formik.handleChange} value={formik.values.email} />
          {formik.errors.email && <Form.Text className='text-muted'>How would we get back to you otherwise?</Form.Text>}
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
