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
            <div class="content has-text-centered-touch">
              <div class="site-footer__description">
                <p>
                  曲の解析などで参考程度に使えたらなと思ったツールを置いてます。
                  <br />英語だらけなのは、使用してるプログラムの出力結果が英語なので合わせています。
                  <br />もし需要があるなら日本語対応するかもしれません。
                  <br />バグや間違い、要望があったらフォームからご連絡もらえるとと嬉しいです。
                </p>
              </div>
              <div class="site-footer__library">
                <h4>使ってるライブラリ</h4>
                <ul>
                  <li>
                    <a href="https://www.vexflow.com/" target="_blank">VexFlow</a>
                  </li>
                  <li>
                    <a href="https://github.com/tonaljs/tonal" target="_blank">@tonaljs/tonal</a>
                  </li>
                  <li>
                    <a href="https://ja.nuxtjs.org/" target="_blank">Nuxt.js</a>
                  </li>
                  <li>
                    <a href="https://buefy.org/" target="_blank">Beufy</a>
                  </li>
                </ul>
              </div>
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

  &__description {
    margin-bottom: 1rem;
  }

  &__library {
    display: block;
    margin-bottom: 1rem;

    dd {
      margin: 0;
    }

    ul {
      display: flex;
      margin: 0;
    }

    li {
      list-style: none;
      margin-right: 0.4em;
      margin-bottom: 0.25em;

      + li {
        margin-top: 0;
      }
    }
  }
}
</style>
