<template>
  <b-navbar :spaced="true" :shadow="true">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">Enotlas tools</b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.site-header {
  display: block;
}
</style>
