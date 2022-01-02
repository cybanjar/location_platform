<template>
  <div>
    <q-layout view="lHh Lpr lff" container style="height: 100vh" class="shadow-2">
      <q-header unelevated class="bg-primary">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Dashboard</q-toolbar-title>
        </q-toolbar>
      </q-header>
        
      <q-drawer
        v-model="drawer"
        show-if-above
        :width="250"
        bordered
        :breakpoint="500"
      >
        <q-scroll-area class="fit">
          <q-item class="q-py-lg" clickable v-ripple>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
            </q-item-section>
            <q-item-section>Syamsul Amin</q-item-section>
          </q-item>
          <q-list>
            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item :to="menuItem.to" clickable v-ripple> <!-- :active="menuItem.label === 'Outbox'" -->
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
            </template>

          </q-list>
          
          <q-btn class="fixed-bottom full-width q-py-sm" flat text-color="primary" label="Logout" />
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
         <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
const menuList = [
  {
    icon: 'account_circle',
    label: 'Profile',
    separator: false,
    to: '/dashboard/profile'
  },
  {
    icon: 'post_add',
    label: 'Post Home',
    separator: false,
    to: '/dashboard/post-home'
  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false,
    to: '/dashboard/settings'
  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
    separator: false,
    to: '/dashboard/help'
  }
]
export default {
  data () {
    return {
      drawer: false,
      menuList
    }
  }
}
</script>
