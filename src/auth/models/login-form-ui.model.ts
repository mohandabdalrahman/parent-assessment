import {FormControl} from "@angular/forms";

export interface LoginFormUiModel {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  Message: string;
  correlationId: string;
  data: {
    jwt: string;
    refreshTokenExpiryDate: string;
  }
}

export type LoginFormType = {
  [Property in keyof LoginFormUiModel]: FormControl<
    LoginFormUiModel[Property]
  >;
};
