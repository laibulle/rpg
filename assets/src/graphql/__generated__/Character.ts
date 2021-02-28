/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Character
// ====================================================

export interface Character_character_fights_characters {
  __typename: "FightCharacter";
  winner: boolean;
  characterId: string;
}

export interface Character_character_fights {
  __typename: "Fight";
  id: string;
  insertedAt: any;
  characters: Character_character_fights_characters[] | null;
}

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
  fights: (Character_character_fights | null)[];
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
