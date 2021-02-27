/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CharacterInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpsertCharacter
// ====================================================

export interface UpsertCharacter_upsertCharacter {
  __typename: "Character";
  id: string;
}

export interface UpsertCharacter {
  /**
   * Upsert character
   */
  upsertCharacter: UpsertCharacter_upsertCharacter | null;
}

export interface UpsertCharacterVariables {
  input: CharacterInput;
}
