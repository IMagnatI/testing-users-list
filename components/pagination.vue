<template>
  <div class="c-paggination">
    <nav aria-label="Page navigation example">
      <ul class="inline-flex items-center -space-x-px">
        <li>
          <button
            class="px-3 py-2 leading-tight text-green44 bg-white border border-graye6 hover:bg-green44 hover:text-white rounded-l rounded-l-md"
            @click="setPage(activePage - 1)"
          >
            <span class="sr-only">{{ $t('common.previous') }}</span>
            &#171;
          </button>
        </li>
        <li v-for="i in totalPages" :key="`pagination${i}`">
          <button
            v-if="activePage === i"
            aria-current="page"
            class="px-3 py-2 leading-tight text-white bg-green44 border border-graye6 hover:bg-green44/50 hover:text-white"
          >
            {{ i }}
          </button>
          <button
            v-else
            class="px-3 py-2 leading-tight text-green44 bg-white border border-graye6 hover:bg-green44 hover:text-white"
            @click="setPage(i)"
          >
            {{ i }}
          </button>
        </li>

        <li>
          <button
            class="px-3 py-2 leading-tight text-green44 bg-white border border-graye6 hover:bg-green44 hover:text-white rounded-r rounded-r-md"
            @click="setPage(activePage + 1)"
          >
            <span class="sr-only">{{ $t('common.next') }}</span>
            &#187;
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import userService from '~/store/services/UserService'

@Component
export default class Pagination extends Vue {
  public get activePage(): number {
    return userService.page
  }

  public get totalPages(): number {
    return userService.totalPages
  }

  public setPage(page: number): void {
    if (page < 1 || page > userService.totalPages) {
      return
    }
    userService.changePage(page)
  }
}
</script>
