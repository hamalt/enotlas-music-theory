<template>
  <div class="site-wrapper">
    <header class="site-header">
      <h1>Scale List</h1>
    </header>
    <main role="main" class="site-contents">
      <nuxt />
    </main>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style lang="scss">
html {
  font-size: 16px;
}

$gutter: 1.5rem;

.site-wrapper {
  max-width: calc(1120px + #{$gutter * 2});
  padding-left: $gutter;
  padding-right: $gutter;
  margin-right: auto;
  margin-left: auto;
}

.site-contents {
  display: block;
  width: 100%;
}
</style>
