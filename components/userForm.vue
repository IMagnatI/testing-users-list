<template>
  <div class="c-userForm w-full container mx-auto">
    <div
      class="flex flex-wrap justify-center lg:flex-row-reverse lg:flex-nowrap"
    >
      <div
        class="flex flex-col shadow-md sm:rounded-lg bg-white container mx-auto my-10 p-10 py-20 w-full lg:max-w-[300px] justify-between"
      >
        <img :src="image" class="rounded-full w-40 h-40 mx-auto" />
        <div class="w-full">
          <label>{{ $t('user.avatar') }}</label>
          <input
            v-model="form.avatar"
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            :placeholder="$t('user.avatar')"
            type="text"
          />
        </div>
      </div>
      <div
        class="flex flex-col shadow-md sm:rounded-lg bg-white my-10 p-10 w-full lg:w-3/4"
      >
        <div class="flex flex-wrap flex-row w-full">
          <div class="w-full md:w-1/2 p-5">
            <label>{{ $t('user.firstName') }}</label>
            <input
              v-model="form.first_name"
              class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              :placeholder="$t('user.firstName')"
              type="text"
            />
          </div>
          <div class="w-full md:w-1/2 p-5">
            <label>{{ $t('user.lastName') }}</label>
            <input
              v-model="form.last_name"
              class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              :placeholder="$t('user.lastName')"
              type="text"
            />
          </div>
          <div class="w-full md:w-1/2 p-5">
            <label>{{ $t('user.email') }}</label>
            <input
              v-model="form.email"
              class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              :placeholder="$t('user.email')"
              type="text"
            />
          </div>
        </div>
        <button
          class="flex mr-auto px-5 py-2.5 mt-20 mb-5 ml-5 bg-green44 text-white hover:bg-green44/50 rounded-md"
          @click="addUser()"
        >
          <p v-if="user" class="font-light text-sm">
            {{ $t('user.updateUserButton') }}
          </p>
          <p v-else class="font-light text-sm">
            {{ $t('user.addUserButton') }}
          </p>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { IUser } from '~/types/UserTypes'
import UserService from '~/store/services/UserService'
import { Nullable } from '~/types/Nullable'
import notificationService from '~/store/services/NotificationService'

@Component
export default class UserForm extends Vue {
  public form: IUser = {
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
  }

  public get user(): Nullable<IUser> {
    return UserService.user
  }

  public get image(): string {
    return this.form.avatar.length > 0
      ? this.form.avatar
      : 'https://via.placeholder.com/150'
  }

  public get validation(): boolean {
    if (
      this.form.first_name.length < 1 ||
      this.form.last_name.length < 1 ||
      this.form.email.length < 1
    ) {
      notificationService.setNotification({
        status: 400,
        text: this.$t('error.validationError') as string,
      })
      return false
    }
    return true
  }

  public async addUser(): Promise<void> {
    if (!this.validation) return

    if (this.user) {
      await UserService.updateUser(this.form).then(() => {
        if (UserService.isError) {
          notificationService.setNotification({
            status: 400,
            text: this.$t('error.updateUserError') as string,
          })
        } else {
          notificationService.setNotification({
            status: 200,
            text: this.$t('common.updateUserSuccess') as string,
          })
          this.$router.push('/')
        }
      })
      return
    }
    await UserService.addUser(this.form).then(() => {
      if (UserService.isError) {
        notificationService.setNotification({
          status: 400,
          text: this.$t('error.addUserError') as string,
        })
      } else {
        notificationService.setNotification({
          status: 200,
          text: this.$t('common.addUserSuccess') as string,
        })
        this.$router.push('/')
      }
    })
  }

  public mounted(): void {
    this.onUserChange()
  }

  @Watch('user')
  public onUserChange(): void {
    if (!this.user) {
      this.form = {
        first_name: '',
        last_name: '',
        email: '',
        avatar: '',
      }
      return
    }
    this.form = this.user
  }
}
</script>
