<template>
  <div class="site-sidebar">
    <b-menu>
      <b-menu-list label="Tools">
        <b-menu-item label="Mode List" tag="nuxt-link" :to="{ path: '/' }"></b-menu-item>
        <!-- <b-menu-item label="Tempo Calculator" tag="nuxt-link" :to="{ path: '/tempo-calc' }"></b-menu-item> -->
      </b-menu-list>
    </b-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.site-sidebar {
  display: block;
}
</style>
