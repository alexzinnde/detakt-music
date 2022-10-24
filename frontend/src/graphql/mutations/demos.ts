import {gql} from '@apollo/client'

export const SUBMIT_DEMO = gql`
  mutation Mutation($data: SubmitDemoInput!) {
    submitDemo(data: $data) {
      id
      createdAt
      updatedAt
      name
      artistAlias
      demoLink
      message
      status
    }
  }
`
