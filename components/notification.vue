<template><div class="c-notification" /></template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import notificationService from '~/store/services/NotificationService'
import { INotification } from '~/types/NotificationTypes'

@Component
export default class Notification extends Vue {
  public get notification(): INotification {
    return notificationService.notification
  }

  public get status(): string {
    if (this.notification.status) {
      return `${this.notification.status.toString()}:`
    }
    return ''
  }

  public get isError(): boolean {
    return !(
      this.notification.status === 200 || this.notification.status === 201
    )
  }

  @Watch('notification')
  public showNotification(): void {
    if (process.client) {
      const type = this.isError ? 'error' : 'success'
      Vue.$toast.open({
        message: this.$t(this.notification.text) as string,
        type,
        position: 'top-right',
        duration: 5000,
      })
    }
  }
}
</script>
