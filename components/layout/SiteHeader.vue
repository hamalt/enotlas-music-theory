<template>
  <b-navbar :spaced="true" :shadow="true">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">Enotlas tools</b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item href="#">Modal Scales</b-navbar-item>
      <b-navbar-item href="#">Documentation</b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">Log in</a>
        </div>
      </b-navbar-item>
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
