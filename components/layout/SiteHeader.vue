<template>
  <b-navbar :spaced="true" :shadow="true">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">Enotolas Music tools</b-navbar-item>
    </template>

    <template slot="start">
      <b-navbar-item tag="nuxt-link" :to="{ path: '/' }" class="is-hidden-desktop">Mode List</b-navbar-item>
      <!-- <b-navbar-item :to="{ path: '/tempo-calc' }" class="is-hidden-desktop">Tempo Calculator</b-navbar-item> -->
    </template>
  </b-navbar>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.site-header {
  display: block;
}
</style>
