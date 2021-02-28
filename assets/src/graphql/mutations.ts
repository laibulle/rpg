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

export const FIGHT = gql`
  mutation Fight($character_id: ID!) {
    fight(characterId: $character_id) {
      winner
      rounds {
        damages
        attacker
        diceValue
      }
    }
  }
`
