<template>
  <div class="card elevation-5" :style="`background:${color}`">
    <v-row style="padding: 0" align="center">
      <v-col cols="3">
        <v-icon color="white" size="80">{{ icon }}</v-icon>
      </v-col>
      <v-col style="padding:0;" cols="9" align="right">
        <h1 class="mr-7 mt-5">{{ value }}</h1>
        <div
          style="background: white; width: 100%; height:5px; margin: 10px 0; border-radius:5px"
        />
        <div
          style="background: rgba(255,255,255,0.2); border-radius:25px; padding: 10px"
        >
          <h3 class="mr-5">{{ title }}</h3>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: ['color', 'icon', 'value', 'title']
}
</script>
<style scoped>
.card {
  color: #ffffff;
  border-radius: 25px;
  padding-left: 20px;
}
</style>
