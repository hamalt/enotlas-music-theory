<template>
  <div class="site-wrapper">
		<main role="main" class="site-contents">
			<nuxt />
		</main>
		<sidebar class="site-navigation" />
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue'

export default {
  components: {
    Sidebar
  }
}
</script>

<style lang="scss">
.site-wrapper {
	opacity: 1;
	display: flex;
	justify-content: space-between;
}

$navigation-width: 320px;

.site-contents {
	order: 2;
	width: calc(100% - #{$navigation-width});
}

.site-navigation {
	order: 1;
	width: $navigation-width;
}
</style>
