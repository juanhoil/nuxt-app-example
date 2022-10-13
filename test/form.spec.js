import { mount , createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VehicleForm from '../components/forms/VehicleForm.vue'
describe('VehicleForm', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  test('Form Mounted', async () => {
    const wrapper = mount(VehicleForm,{
      localVue,
      vuetify,
      propsData:{
        vehicleEdit:{
          _id: 0,
        }
      },
    })
    wrapper.vm.openDialog();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.dialog.dVehicle).toBe(true)
    const inputMarca =  wrapper.find('#marca');
    const inputModelo =  wrapper.find('#modelo');
    const inputColor =  wrapper.find('#color');
    const inputAsignado =  wrapper.find('#asignado');
    const inputEstado =  wrapper.find('#estado');
    expect(inputMarca.exists()).toBe(true)
    expect(inputModelo.exists()).toBe(true)
    expect(inputColor.exists()).toBe(true)
    expect(inputAsignado.exists()).toBe(true)
    expect(inputEstado.exists()).toBe(true)
  })

  test('validate Form Mounted', async ()=>{
    const wrapper = mount(VehicleForm,{
      localVue,
      vuetify,
      propsData:{
        vehicleEdit:{
          _id: 0,
        }
      },
    })
    wrapper.vm.openDialog();
    await wrapper.vm.$nextTick();

    wrapper.setData({ vehicle: {
      marca: 'jeep',
      modelo: '2019',
      color: 'gren',
      estado: true,
      asignado: 'amir',
    }})
    await wrapper.vm.$nextTick();
    // // console.log(wrapper.vm.form)
    // wrapper.vm.form.inputs.map((input)=>{
    //   console.log(input.$attrs,input.valid)
    // })
    expect(wrapper.vm.form.validate()).toBe(true)
  })

  test('validate Form when is incomplete', async ()=>{
    const wrapper = mount(VehicleForm,{
      localVue,
      vuetify,
      propsData:{
        vehicleEdit:{
          _id: 0,
        }
      },
    })
    wrapper.vm.openDialog();
    await wrapper.vm.$nextTick();

    wrapper.setData({ vehicle: {
      marca: '',
      modelo: '2019',
      color: 'gren',
      estado: true,
      asignado: 'amir',
    }})
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.form.validate()).toBe(false)

  })
})
