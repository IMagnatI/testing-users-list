<template>
  <div class="v-homepage">
    <h1 class="container mx-auto mt-20 text-4xl text-gray3a">
      {{ $t('user.list') }}
    </h1>
    <div
      class="shadow-md sm:rounded-lg bg-white container mx-auto my-10 p-10 flex flex-wrap"
    >
      <NuxtLink
        class="inline-flex ml-auto mr-0 px-5 py-2.5 mb-5 bg-green44 text-white hover:bg-green44/50 rounded-full"
        to="/new-user"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18"
          viewBox="0 -960 960 960"
          width="18"
          fill="#fff"
        >
          <path d="M440-200v-240H200v-80h240v-240h80v240h240v80H520v240h-80Z" />
        </svg>
        <p class="font-light text-sm ml-2">{{ $t('user.addUserButton') }}</p>
      </NuxtLink>
      <UsersList class="w-full" />
    </div>
    <div class="container mx-auto mb-10">
      <Pagination />
    </div>
    <client-only>
      <Notification />
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Notification from '~/components/notification.vue'
import userService from '~/store/services/UserService'
import UsersList from '~/components/usersList.vue'
import Pagination from '~/components/pagination.vue'
import UserDeleteModal from '~/components/userDeleteModal.vue'

@Component({
  components: {
    UsersList,
    Notification,
    Pagination,
    UserDeleteModal,
  },
})
export default class IndexPage extends Vue {
  public async mounted(): Promise<void> {
    await userService.loadUsers()
  }
}
</script>
