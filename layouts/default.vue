<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          style="height: 50px; max-height: 10px; min-height: 40px"
        >
          <v-list-item-action style="height: 50px">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content class="pt-0 pb-0">
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          router
          exact
          style="height: 50px; max-height: 10px; min-height: 40px"
          @click="logout()"
        >
          <v-list-item-action style="height: 50px">
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content class="pt-0 pb-0">
            <v-list-item-title v-text="'Cerrar Session'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed app dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent , ref } from "vue";
import { useAuth } from "../commons/hooks/useAuth";
export default defineComponent({
  // middleware: "authRedirect",
  setup() {
  const {  logout } = useAuth()
    const drawer = ref(false)
    const items = [
      {
        icon: 'mdi-card',
        title: 'Vehiculos',
        to: '/',
      }
    ]

    const title = 'Pulpo'

    return {
      title,
      items,
      logout,
      drawer
    }
  },
});

</script>
