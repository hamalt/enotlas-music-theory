<template>
  <div class="site-wrapper">
    <site-header />

    <div class="site-contents columns is-variable bd-klmn-columns is-0">
      <div class="site-contents__sidebar column is-2">
        <div class="section">
          <site-sidebar />
        </div>
      </div>
      <div class="site-contents__main column is-10">
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
  transition: {
   name: 'fade',
 },
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

.site-contents {
  &__sidebar {
    background-color: #f7f7f7;
    border-right: solid 1px #eee;
  }

  &__main {
    display: block;
  }
}

.fade-enter {
  opacity: 0;

  &-active {
    transition: opacity 0.7s;
  }
}
</style>
