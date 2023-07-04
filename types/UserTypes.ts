import { Nullable } from '~/types/Nullable'

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export interface IUser {
  id?: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

export interface IUserState {
  user: Nullable<IUser>
  isError: boolean
  isLoading: boolean
  users: IUser[]
  page: number
  perPage: number
  totalPages: number
}

export interface IUsersListResponse {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: IUser[]
}

export interface ILoginForm {
  email: string
  password: string
}
