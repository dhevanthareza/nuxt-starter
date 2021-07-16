<template>
  <div>
    <header-comp :title="title" :description="description"></header-comp>
    <v-card shaped class="mx-5 pa-5 upper-margin">
      <slot />
    </v-card>
  </div>
</template>
<script>
import headerComp from '~/components/header'
export default {
  components: { headerComp },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
}
</script>
