import {FormControl} from "@angular/forms";

export interface User {
  id: number
  email?: string
  first_name: string
  last_name?: string
  avatar: string
}

export interface UserList {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: User[]
}


export interface UserFormUiModel {
  name: string
  job: string
}

export type UserFormType = {
  [Property in keyof UserFormUiModel]: FormControl<
    UserFormUiModel[Property]
  >;
};
