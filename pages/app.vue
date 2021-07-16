<template>
  <v-app id="app">
    <v-navigation-drawer
      width="270"
      v-model="drawer"
      :mini-variant.sync="mini"
      app
    >
      <v-list-item style="height:65px" class="px-2 primary" dark>
        <v-list-item-avatar class="text-center" v-if="mini">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-list-item-avatar>

        <v-list-item-title class="text-center">
          <b>Dasaran</b>
        </v-list-item-title>

        <v-btn
          v-if="!$vuetify.breakpoint.mobile"
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <v-btn
          v-if="$vuetify.breakpoint.mobile"
          icon
          @click.stop="drawer = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{ $auth.user.fullname }}</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense :class="mini ? 'pa-1' : 'pa-3'">
        <div v-for="item in $store.getters['menu/menuList']" :key="item.code">
          <v-list-item
            :class="mini ? 'px-3' : 'px-4 py-1'"
            active-class="primary rounded white--text"
            dense
            v-if="!item.children"
            :to="`/app${item.path}`"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon || 'mdi-home-city' }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>

          <v-list-group
            class="mt-1"
            dense
            v-else
            :prepend-icon="item.icon || 'mdi-home-city'"
          >
            <template v-slot:activator>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </template>

            <v-list-item
              v-for="subItem in item.children"
              :key="subItem.code"
              :to="`/app${subItem.path}`"
              class="mx-4 mt-1"
              active-class="primary rounded white--text"
            >
              <v-list-item-icon>
                <v-icon>{{ subItem.icon || 'mdi-home-city' }}</v-icon>
              </v-list-item-icon>

              <v-list-item-title>{{ subItem.name }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-main app>
      <v-app-bar height="65" color="primary" dark app>
        <v-btn
          v-if="$vuetify.breakpoint.mobile"
          icon
          @click.stop="drawer = true"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <div>
          <v-text-field
            dense
            label="Cari data.."
            single-line
            prepend-inner-icon="mdi-magnify"
            outlined
            hide-details
          ></v-text-field>
        </div>
        <v-spacer />
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <nuxt-child />
    </v-main>
    <v-snackbar
      v-model="$store.state.alert.show"
      :color="$store.state.alert.type"
      right
      top
      vertical
    >
      {{ $store.state.alert.message }}
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  middleware: ['auth'],
  data: () => ({
    drawer: true,
    mini: false,
    items: [
      { title: 'Dashboard', icon: 'mdi-home-city', to: '/dashboard' },
      {
        title: 'Management',
        icon: 'mdi-account-group-outline',
        children: [
          { title: 'Role', icon: 'mdi-home-city', to: '/management/role' },
          { title: 'User', icon: 'mdi-home-city', to: '/management/user' },
          { title: 'Menu', icon: 'mdi-home-city', to: '/management/menu' },
          {
            title: 'Permission',
            icon: 'mdi-home-city',
            to: '/management/permission'
          }
        ]
      }
    ]
  }),
  created() {
    this.getMenuList()
  },
  methods: {
    getMenuList() {
      this.$store.dispatch('menu/getMenuList')
    },
    logout() {
      this.$auth.logout()
    }
  }
}
</script>
