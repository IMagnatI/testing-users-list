<template>
  <div class="v-newUser">
    <h1 class="container mx-auto mt-20 text-4xl text-gray3a">
      {{ $t('user.addTitle') }}
    </h1>
    <UserForm />

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

@Component({
  components: {
    UserForm,
    Notification,
  },
})
export default class NewUserPage extends Vue {
  public async mounted(): Promise<void> {
    await UserService.setUser(null)
  }
}
</script>
