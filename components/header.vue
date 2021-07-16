<template>
  <div>
    <v-card dark flat tile class="py-9 px-7" color="primary">
      <v-container>
        <h1>{{ title }}</h1>
        <h5>{{ description }}</h5>
        <p></p>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  props: ['title', 'description']
}
</script>
