<template>
  <div>
    <DialogVehicle
      :vehicle-edit="vehicle"
      @update="updateInArray"
      @add="injectData"
      @cancel="cancel"
    />
    <v-btn
      v-if="canAdd"
      color="success"
      class="right mr-6"
      style="float: right"
      @click="dialog.dVehicle = true"
      >Agregar</v-btn
    >
    <br />
    <v-sheet color="white" elevation="1" class="pa-5">
      <v-text-field
        v-model="search"
        label="Filtro"
        dense
        outlined
      ></v-text-field>
      <v-data-table
        :headers="headersVehicles"
        :items="vehicles.data"
        :search="search"
        class="elevation-1"
      >
        <template #item.estado="{ item }">
          <v-chip dark :color="item.estado ? 'green' : 'red'">
            {{ item.estado ? 'Activo' : 'Inactivo' }}
          </v-chip>
        </template>
        <template #item.acciones="{ item, index }">
          <v-btn v-if="canEdit" icon @click="edit(item)">
            <v-icon color="blue"> mdi-pencil </v-icon>
          </v-btn>
          <v-btn v-if="canRemove" icon @click="remove(item, index)">
            <v-icon color="red"> mdi-delete </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { headersVehicles } from '../commons/helpers/headers'
import { vehiclesService } from '../commons/services'
import { dialog } from '../commons/share/state/dialog'
import { Paginate } from '../commons/types/paginate.model'
import { Vehicle } from '../commons/types/vehicles.model'
import { useAuth } from '../commons/hooks/useAuth'
import DialogVehicle from '../components/forms/VehicleForm.vue'

const index = defineComponent({
  components: {
    DialogVehicle,
  },
  middleware: 'authRedirect',
  setup() {
    const { user, canAdd, canEdit, canRemove } = useAuth()
    const search = ref('')
    const vehicles = ref<Paginate<Vehicle>>({
      data: [],
      lastPage: 1,
      page: 1,
      total: 0,
    })
    const vehicle = ref<Vehicle>({} as Vehicle)
    const getVehicles = async () => {
      vehicles.value = await vehiclesService.getMany<Paginate<Vehicle>>()
    }
    const edit = (item: Vehicle) => {
      vehicle.value = item
      dialog.dVehicle = true
    }

    const remove = async (item: Vehicle, index: number) => {
      const isConfirm = confirm(
        'Desea eliminiar permanentemente este registro!'
      )
      if (isConfirm) {
        vehicles.value.data.splice(index, 1)
        await vehiclesService.deleteOne(item._id)
      }
    }
    const updateInArray = (data: Vehicle) => {
      const findIndex = vehicles.value.data.findIndex(
        (item) => item._id === data._id
      )
      if (findIndex > -1) {
        vehicles.value.data.splice(findIndex, 1, { ...data })
      }
    }
    const injectData = (data: Vehicle) => {
      vehicles.value.data.push(data)
    }
    const cancel = () => {
      vehicle.value = {} as Vehicle
    }
    onMounted(() => {
      getVehicles()
    })

    return {
      canAdd,
      canEdit,
      canRemove,
      user,
      headersVehicles,
      vehicle,
      vehicles,
      dialog,
      search,
      edit,
      cancel,
      remove,
      injectData,
      updateInArray,
    }
  },
})
export default index
</script>
