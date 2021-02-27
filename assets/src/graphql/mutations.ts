import { gql } from '@apollo/client'

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      id
    }
  }
`

export const LOGIN = gql`
  mutation Login($input: AuthInput!) {
    auth(input: $input) {
      accessToken
      refreshToken
      user {
        id
        name
        email
      }
    }
  }
`

export const UPSERT_CHARACTER = gql`
  mutation UpsertCharacter($input: CharacterInput!) {
    upsertCharacter(input: $input) {
      id
    }
  }
`
