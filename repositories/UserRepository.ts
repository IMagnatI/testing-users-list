import axios from 'axios'
import UrlHelper from '~/helpers/urls'
import { IUser, IUsersListResponse } from '~/types/UserTypes'
import { Nullable } from '~/types/Nullable'

class UserRepository {
  public async users(
    page: number,
    perPage: number
  ): Promise<IUsersListResponse> {
    return await axios
      .get(UrlHelper.getFullApiUrl(`users?page=${page}&per_page=${perPage}`))
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        throw error
      })
  }

  public async user(id: number): Promise<Nullable<IUser>> {
    return await axios
      .get(UrlHelper.getFullApiUrl(`users/${id}`))
      .then((response) => {
        return response.data.data
      })
      .catch((error) => {
        throw error
      })
  }

  public async addUser(userForm: IUser): Promise<IUser> {
    return await axios
      .post(UrlHelper.getFullApiUrl('users'), userForm)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        throw error
      })
  }

  public async updateUser(userForm: IUser): Promise<IUser> {
    return await axios
      .patch(UrlHelper.getFullApiUrl(`users/${userForm.id}`), userForm)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        throw error
      })
  }

  public async deleteUser(id: number): Promise<void> {
    return await axios
      .patch(UrlHelper.getFullApiUrl(`users/${id}`))
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        throw error
      })
  }
}

export default new UserRepository()
