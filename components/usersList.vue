<template>
  <div class="c-usersList">
    <div class="relative overflow-x-auto">
      <table
        class="w-full text-sm text-left text-gray-500 dark:text-gray-400 min-w-[550px]"
      >
        <thead
          class="text-xs text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th></th>
            <th scope="col" class="px-6 py-3 font-bold text-gray3a">
              Full name
            </th>
            <th
              scope="col"
              class="pl-6 pr-20 py-3 flex justify-end font-bold text-gray3a"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="`${user.id}user`"
            class="even:bg-white odd:bg-gray-50 border-b last:border-none dark:bg-gray-900 dark:border-gray-700"
          >
            <td class="px-6 w-24">
              <img :src="user.avatar" class="rounded-full w-10 h-10" />
            </td>
            <td class="px-6 py-4 text-gray3a">
              {{ user.first_name }} {{ user.last_name }}
            </td>
            <td class="pl-6 pr-20 py-4 w-full flex justify-end">
              <NuxtLink class="mr-2.5 mb-1" :to="`user/${user.id}`">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  fill="#adb5bb"
                >
                  <path
                    d="M200-12q-33 0-56.5-23.5T120-92v-560q0-33 23.5-56.5T200-732h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-12H200Zm280-360Zm167-337 57 56-264 264v57h56l265-265 57 56-288 289H360v-170l287-287Zm171 168L647-709l100-100q24-24 57.5-24t56.5 24l56 57q23 23 23 56t-23 56l-99 99Z"
                  />
                </svg>
              </NuxtLink>
              <button @click="openDeleteModal(user)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  fill="#adb5bb"
                >
                  <path
                    d="M267.333-120q-27 0-46.833-19.833t-19.833-46.833v-553.335H160v-66.666h192V-840h256v33.333h192v66.666h-40.667v553.335q0 27-19.833 46.833T692.667-120H267.333Zm97.334-150.666h66.666v-386.001h-66.666v386.001Zm164 0h66.666v-386.001h-66.666v386.001Z"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <UserDeleteModal v-if="showDeleteModal" @close="closeDeleteModal" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserService from '~/store/services/UserService'
import { IUser } from '~/types/UserTypes'

@Component
export default class UsersList extends Vue {
  public showDeleteModal: boolean = false

  public openDeleteModal(user: IUser): void {
    UserService.setUser(user)
    this.showDeleteModal = true
  }

  public closeDeleteModal(): void {
    UserService.setUser(null)
    this.showDeleteModal = false
  }

  public get users(): IUser[] {
    return UserService.users
  }
}
</script>
