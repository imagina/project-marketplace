import { Carousel, Slide } from 'vue-carousel';
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export default async ({app, router, store, Vue}) => {
  await store.dispatch('qmarketplaceStores/GET_USER_STORES')
  await store.dispatch('qmarketplaceStores/SET_STORE')
  //Components
  let components = [
    {name: 'Carousel', component: Carousel},
    {name: 'Slide', component: Slide},
  ]

  //Register components
  components.forEach(item => {
    Vue.use(item.component)
    Vue.component(item.name, item.component)
  })
}


