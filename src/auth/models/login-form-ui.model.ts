import {FormControl} from "@angular/forms";

export interface LoginFormUiModel {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export type LoginFormType = {
  [Property in keyof LoginFormUiModel]: FormControl<
    LoginFormUiModel[Property]
  >;
};
