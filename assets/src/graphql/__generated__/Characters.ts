/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Characters
// ====================================================

export interface Characters_characters {
  __typename: "Character";
  id: string;
  skillPoints: number;
  attack: number;
  defense: number;
  magik: number;
  health: number;
  rank: number;
  skin: number;
  reanimateAt: any | null;
}

export interface Characters {
  /**
   * Get characters list
   */
  characters: Characters_characters[] | null;
}

export interface CharactersVariables {
  user_id: string;
}
