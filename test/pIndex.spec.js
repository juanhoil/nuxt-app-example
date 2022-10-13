import { mount , createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import PIndex from '../pages/index.vue'
describe('NuxtLogo', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let vuetify
  let store
  beforeEach(() => {
    store = new Vuex.Store({
      state:{

        loggedIn: false,
        user: {
          name:'amir',
          role:'admin',
        },
      }
    })
    vuetify = new Vuetify()
  })

  test('render a Vue instance in root page', () => {
    const wrapper = mount(PIndex,{
      localVue,
      vuetify,
      store,
    data () {
        return {
            search:'',
            vehicles:{}

        }
    }
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
