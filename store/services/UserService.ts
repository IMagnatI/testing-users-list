import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules'
import { store } from '~/store/store'
import { IUser, IUserState } from '~/types/UserTypes'
import UserRepository from '~/repositories/UserRepository'
import { Nullable } from '~/types/Nullable'

@Module
class UserService extends VuexModule {
  public stateUser: IUserState = {
    isError: false,
    isLoading: true,
    user: null,
    users: [],
    page: 1,
    perPage: 10,
    totalPages: 0,
  }

  @Mutation
  public setIsError(isError: boolean) {
    this.stateUser.isError = isError
  }

  @Mutation
  public setIsLoading(isLoading: boolean) {
    this.stateUser.isLoading = isLoading
  }

  @Mutation
  public setUser(user: Nullable<IUser>) {
    this.stateUser.user = user
  }

  @Mutation
  public setPage(page: number) {
    this.stateUser.page = page
  }

  @Mutation
  public setPerPage(perPage: number) {
    this.stateUser.perPage = perPage
  }

  @Mutation
  public setUsers(users: IUser[]) {
    this.stateUser.users = users
  }

  @Mutation
  public setTotalPages(totalPages: number) {
    this.stateUser.totalPages = totalPages
  }

  public get isError(): boolean {
    return this.stateUser.isError
  }

  public get isLoading(): boolean {
    return this.stateUser.isLoading
  }

  public get user(): Nullable<IUser> {
    return this.stateUser.user
  }

  public get users(): IUser[] {
    return this.stateUser.users
  }

  public get page(): number {
    return this.stateUser.page
  }

  public get perPage(): number {
    return this.stateUser.perPage
  }

  public get totalPages(): number {
    return this.stateUser.totalPages
  }

  @Action
  public async changePage(page: number): Promise<void> {
    this.setPage(page)
    await this.loadUsers()
  }

  @Action
  public async changePerPage(perPage: number): Promise<void> {
    this.setPage(1)
    this.setPerPage(perPage)
    await this.loadUsers()
  }

  @Action
  public async loadUsers(): Promise<void> {
    this.setIsLoading(true)

    await UserRepository.users(this.page, this.perPage)
      .then((usersResponse) => {
        this.setUsers(usersResponse.data)
        this.setTotalPages(usersResponse.total_pages)
        this.setPage(usersResponse.page)
        this.setIsError(false)
      })
      .catch(() => {
        this.setUsers([])
        this.setIsError(true)
      })
      .finally(() => {
        this.setIsLoading(false)
      })
  }

  @Action
  public async loadUser(id: number): Promise<void> {
    this.setIsLoading(true)

    await UserRepository.user(id)
      .then((user) => {
        this.setUser(user)
        this.setIsError(false)
      })
      .catch(() => {
        this.setUser(null)
        this.setIsError(true)
      })
      .finally(() => {
        this.setIsLoading(false)
      })
  }

  @Action
  public async deleteUser(id: number): Promise<void> {
    this.setIsLoading(true)

    await UserRepository.deleteUser(id)
      .then(() => {
        this.setUser(null)
        this.setIsError(false)
      })
      .catch(() => {
        this.setUser(null)
        this.setIsError(true)
      })
      .finally(() => {
        this.setIsLoading(false)
      })
  }

  @Action
  public async addUser(form: IUser): Promise<void> {
    this.setIsLoading(true)

    await UserRepository.addUser(form)
      .then((user) => {
        this.setUser(user)
        this.setIsError(false)
      })
      .catch(() => {
        this.setUser(null)
        this.setIsError(true)
      })
      .finally(() => {
        this.setIsLoading(false)
      })
  }

  @Action
  public async updateUser(form: IUser): Promise<void> {
    this.setIsLoading(true)

    await UserRepository.updateUser(form)
      .then((user) => {
        this.setUser(user)
        this.setIsError(false)
      })
      .catch(() => {
        this.setUser(null)
        this.setIsError(true)
      })
      .finally(() => {
        this.setIsLoading(false)
      })
  }
}

const userService = new UserService({ store, name: 'userService' })
export default userService
