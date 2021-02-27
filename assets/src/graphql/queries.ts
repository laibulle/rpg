import { gql } from '@apollo/client'

export const CHARACTERS = gql`
  query Characters($user_id: ID!) {
    characters(userId: $user_id) {
      id
      skillPoints
      attack
      defense
      magik
      health
      rank
      skin
      reanimateAt
    }
  }
`

export const CHARACTER = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      skillPoints
      attack
      defense
      magik
      health
      rank
      skin
    }
  }
`
