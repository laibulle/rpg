/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Fight
// ====================================================

export interface Fight_fight_rounds {
  __typename: "Round";
  damages: number;
  attacker: string;
  diceValue: number;
}

export interface Fight_fight {
  __typename: "FightReport";
  winner: string | null;
  rounds: Fight_fight_rounds[];
}

export interface Fight {
  /**
   * Upsert character
   */
  fight: Fight_fight | null;
}

export interface FightVariables {
  character_id: string;
}
