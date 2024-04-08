import Vue from 'vue'
import Router from 'vue-router'
import CurrentWeek from '@/components/CurrentWeek.vue'
import Wedit from "@/components/Wedit.vue"
import PerWeek from "@/components/PerWeek.vue"
import PerPerson from "@/components/PerPerson.vue"
import Login33 from "@/components/Login33.vue"
//import { Menu } from 'element-ui'
import Menu from "@/components/Menu.vue"

Vue.use(Router)

const originalPush = Router.prototype.push

Router.prototype.push = function push(location: string) {
  return (originalPush.call(this, location) as any).catch((err: any) => err)
}



export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login33',
      component: Login33
    },
    {
      path: '/Menu',
      
      component: Menu,
      
      children: [
        {
          path: '/',
          redirect: 'CurrentWeek'
        },
        {
          path: 'CurrentWeek',
          name: 'CurrentWeek',
          component: CurrentWeek
        },
        {
          path: 'Wedit',
          name: 'Wedit',
          component: Wedit
        },
        {
          path: 'PerWeek',
          name: 'PerWeek',
          component: PerWeek
        },
        {
          path: 'PerPerson',
          name: 'PerPerson',
          component: PerPerson
        }
      ]
    },

  ]
})
