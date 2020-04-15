<template>
  <footer class="site-footer">
    <div class="container">
      <div class="columns">
        <div class="column is-4">
          <div class="section">
            <google-form />
          </div>
        </div>
        <div class="column is-8">
          <div class="section">
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
          </div>
        </div>
      </div>
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

<style lang="scss" scoped>
.site-footer {
  position: relative;
  z-index: 1;
  display: block;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  background-color: #f7f7f7;
  border-top: solid 1px #eee;
  // padding: 3rem 1.5rem 6rem;
}
</style>
