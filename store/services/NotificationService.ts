import { Module, VuexModule } from 'vuex-class-modules/commonjs'
import { Mutation } from 'vuex-class-modules'
import { store } from '~/store/store'
import { INotification } from '~/types/NotificationTypes'

@Module
class NotificationService extends VuexModule {
  public notification: INotification = {
    status: 0,
    text: 'ok',
  }

  @Mutation
  public setNotification(notification: INotification) {
    this.notification = notification
  }
}

const notificationService = new NotificationService({
  store,
  name: 'notificationService',
})
export default notificationService
