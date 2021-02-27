/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AuthInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_auth_user {
  __typename: "User";
  id: string;
  name: string;
  email: string;
}

export interface Login_auth {
  __typename: "LoginRes";
  accessToken: string;
  refreshToken: string;
  user: Login_auth_user;
}

export interface Login {
  /**
   * Login
   */
  auth: Login_auth | null;
}

export interface LoginVariables {
  input: AuthInput;
}
