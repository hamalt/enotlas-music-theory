<template>
  <footer id="site-footer" class="footer">
    <google-form></google-form>
    <div class="content has-text-centered">
      <p>
        <strong>Enotolas Music tools</strong> by
        <a href="https://twitter.com/_enotlas" target="_blank">Enotlas</a>. The website content
        is licensed
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          target="_blank"
        >CC BY-SA 4.0</a>.
      </p>
    </div>
  </footer>
</template>

<script>
import GoogleForm from "~/components/GoogleForm.vue";

export default {
  components: {
    GoogleForm
  }
}
</script>

<style lang="scss">
#site-footer {
  display: block;
}
</style>
