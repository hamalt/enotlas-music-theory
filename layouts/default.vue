<template>
  <div class="site-wrapper">
    <site-header />

    <div class="columns is-variable bd-klmn-columns is-0">
      <div class="column is-2">
        <div class="section">
          <site-sidebar />
        </div>
      </div>
      <div class="column is-10">
        <main role="main">
          <nuxt />
        </main>
      </div>
    </div>

    <site-footer />
  </div>
</template>

<script>
import SiteHeader from "~/components/layout/SiteHeader.vue";
import SiteFooter from "~/components/layout/SiteFooter.vue";
import SiteSidebar from "~/components/layout/SiteSidebar.vue";
export default {
  components: {
    SiteHeader,
    SiteFooter,
    SiteSidebar
  }
}
</script>

<style lang="scss">
html {
  font-size: 16px;
  font-family: "Noto Sans JP", sans-serif;
}

// $gutter: 1.5rem;

// .site-wrapper {
//   max-width: calc(1120px + #{$gutter * 2});
//   padding-left: $gutter;
//   padding-right: $gutter;
//   margin-right: auto;
//   margin-left: auto;
// }
</style>
