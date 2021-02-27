/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Character
// ====================================================

export interface Character_character {
  __typename: "Character";
  id: string;
  skillPoints: number;
  attack: number;
  defense: number;
  magik: number;
  health: number;
  rank: number;
  skin: number;
}

export interface Character {
  /**
   * Get character
   */
  character: Character_character | null;
}

export interface CharacterVariables {
  id: string;
}
