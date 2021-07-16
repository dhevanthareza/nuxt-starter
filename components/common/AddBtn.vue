<template>
  <v-btn
    v-if="$store.getters['menu/currentMenu'].Permissions.includes('create')"
    v-bind="$attrs"
    color="primary"
    rounded
    v-on="$listeners"
  >
    <slot
      v-if="$store.getters['menu/currentMenu'].Permissions.includes('create')"
      >asda</slot
    >
  </v-btn>
</template>
<script>
export default {
  name: 'AddBtn'
}
</script>
