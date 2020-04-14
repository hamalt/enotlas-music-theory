<template>
  <form @submit.prevent="submit" class="google-form">
    <input v-model="form.email" type="email" name="entry.email" placeholder="sample@mail.co.jp" />
    <textarea v-model="form.message" name="entry.message" placeholder="message." />
    <input type="submit" value="Send" />
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      form: {
        email: "",
        message: ""
      }
    };
  },
  methods: {
    /**
    * フォーム送信
    */
    submit () {
      let submitParams = new FormData();
      submitParams.append('entry.email', this.form.email);
      submitParams.append('entry.message', this.form.message);
      let CORS_PROXY = 'https://tools.enotlas.net/';
      let GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLScae4nE8LEy8yzgi2M39dC9uGdwl4kJovrlhNCRRwMDF_rpNA/formResponse';
      this.$axios.post(CORS_PROXY + GOOGLE_FORM_ACTION, submitParams)
        .then(() => {
          this.$router.push('thanks')
        });
    }
  }
}
</script>

<style>
.google-form {
  display: block;
}
</style>
