<template>
  <div class="v-editUser">
    <h1 class="container mx-auto mt-20 text-4xl text-gray3a">
      {{ $t('user.updateTitle') }}
    </h1>
    <UserForm v-if="user" />
    <p v-else>{{ $t('user.badId') }}</p>
    <client-only>
      <Notification />
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Notification from '~/components/notification.vue'
import UserForm from '~/components/userForm.vue'
import UserService from '~/store/services/UserService'
import { Nullable } from '~/types/Nullable'
import { IUser } from '~/types/UserTypes'

@Component({
  components: {
    UserForm,
    Notification,
  },
})
export default class EditUserPage extends Vue {
  public get id(): number {
    return Number(this.$route.params.id)
  }

  public get user(): Nullable<IUser> {
    return UserService.user
  }

  public async mounted(): Promise<void> {
    await UserService.loadUser(this.id)
  }
}
</script>
