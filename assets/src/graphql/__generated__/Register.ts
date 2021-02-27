/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RegisterInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_register {
  __typename: "User";
  id: string;
}

export interface Register {
  /**
   * Create a user
   */
  register: Register_register | null;
}

export interface RegisterVariables {
  input: RegisterInput;
}
