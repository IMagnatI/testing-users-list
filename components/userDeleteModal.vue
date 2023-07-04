<template>
  <div v-if="user" class="c-modal cursor-auto" @keydown.esc="$emit('close')">
    <div
      tabindex="-1"
      aria-hidden="true"
      class="fixed inset-0 z-50 flex h-screen w-screen overflow-y-scroll bg-black bg-opacity-20"
      @click.self="$emit('close')"
    >
      <div
        class="relative mx-auto h-fit w-full overflow-auto rounded bg-white p-6 shadow md:my-20 md:max-w-[90vw] xl:max-w-[calc(90vw-460px)]"
      >
        <div class="flex flex-col flex-wrap">
          <p class="text-center mt-10 text-2xl">
            {{ $t('common.confirmDelete') }}
            <span class="font-bold"
              >{{ user.first_name }} {{ user.last_name }}</span
            >?
          </p>
          <div class="flex flex-row justify-center w-full">
            <button
              class="flex px-5 py-2.5 mt-20 mb-5 ml-5 bg-color4 text-white hover:bg-color4/50 rounded-md"
              @click="deleteUser()"
            >
              <p class="font-light text-sm">{{ $t('common.deleteUser') }}</p>
            </button>
            <button
              class="flex px-5 py-2.5 mt-20 mb-5 ml-5 bg-gray-600 text-white hover:bg-gray-600/50 rounded-md"
              @click="$emit('close')"
            >
              <p class="font-light text-sm">{{ $t('common.deleteUser') }}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import notificationService from '~/store/services/NotificationService'
import UserService from '~/store/services/UserService'
import { IUser } from '~/types/UserTypes'
import { Nullable } from '~/types/Nullable'

@Component
export default class UserDeleteModal extends Vue {
  public get user(): Nullable<IUser> {
    return UserService.user
  }

  public async deleteUser(): Promise<void> {
    if (!this.user || !this.user.id) {
      notificationService.setNotification({
        status: 400,
        text: this.$t('errors.deleteUserError') as string,
      })
      return
    }
    await UserService.deleteUser(this.user.id).then(async () => {
      if (UserService.isError) {
        notificationService.setNotification({
          status: 400,
          text: this.$t('errors.deleteUserError') as string,
        })
      } else {
        notificationService.setNotification({
          status: 200,
          text: this.$t('common.deleteUserSuccess') as string,
        })
      }
      UserService.setUser(null)
      await UserService.loadUsers()
      this.$emit('close')
    })
  }
}
</script>
