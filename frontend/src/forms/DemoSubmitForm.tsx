import {useEffect} from 'react'
import {Form, Container, FloatingLabel, Button} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {useMutation} from '@apollo/client'
import {SUBMIT_DEMO} from '../graphql/mutations/demos'

const DemoSubmitForm = () => {
  const [submitDemo, {data, loading, error}] = useMutation(SUBMIT_DEMO)
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors}
  } = useForm()

  useEffect(() => {
    if (data) {
      console.log(data)
    }

    if (error) {
      console.error(error)
    }
  }, [data])

  const onSubmit = (data: any) => submitDemo(data)

  return (
    <Container style={{maxWidth: '500px'}}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FloatingLabel label="Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Name"
            {...register('name', {required: true})}
          />
          {errors.name && <span>This field is required</span>}
        </FloatingLabel>
        <FloatingLabel label="Artist Alias" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Artist Alias"
            {...register('artistAlias', {required: true})}
          />
          {errors.artistAlias && <span>This field is required</span>}
        </FloatingLabel>

        <FloatingLabel label="Email address" className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email address"
            {...(register('email'), {required: true})}
          />
          {errors.email && <span>This field is required</span>}
        </FloatingLabel>

        <FloatingLabel label="Link to demo" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Link to demo"
            {...(register('demoLink'), {required: true})}
          />
          {errors.demoLink && <span>This field is required</span>}
        </FloatingLabel>

        <FloatingLabel label="Message" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Message"
            {...(register('message'), {required: false})}
          />
          {errors.message && <span>This field is required</span>}
        </FloatingLabel>

        <Button style={{width: '100%'}} type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default DemoSubmitForm
