<template>
  <div class="site-wrapper">
    <site-header />

    <div class="site-contents">
      <div class="site-contents__sidebar">
        <div class="section">
          <site-sidebar />
        </div>
      </div>
      <div class="site-contents__main">
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
  @media screen and (min-width: 1024px) {
    display: flex;
  }

  &__sidebar {
    width: 16.66667%;
    background-color: #f7f7f7;
    border-right: solid 1px #eee;

    @media screen and (max-width: 1023px) {
      display: none;
    }
  }

  &__main {
    display: block;

    @media screen and (min-width: 1024px) {
      width: 83.33333%;
    }
  }
}

.fade-enter {
  opacity: 0;

  &-active {
    transition: opacity 0.7s;
  }
}

.title .icon {
  margin-right: 0.3em;
}
</style>
