<template>
  <form @submit.prevent="submit" class="google-form">
    <input v-model="form.name" type="text" name="entry.2005620554" placeholder="sample@mail.co.jp" />
    <input
      v-model="form.email"
      type="email"
      name="entry.1045781291"
      placeholder="sample@mail.co.jp"
    />
    <textarea v-model="form.message" name="entry.839337160" placeholder="message." />
    <input type="submit" value="Send" />
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      form: {
        name: "",
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
      submitParams.append('entry.2005620554', this.form.name);
      submitParams.append('entry.1045781291', this.form.email);
      submitParams.append('entry.839337160', this.form.message);
      let CORS_PROXY = 'https://tools.enotlas.net/';
      let GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLScae4nE8LEy8yzgi2M39dC9uGdwl4kJovrlhNCRRwMDF_rpNA/formResponse';
      this.$axios.post(CORS_PROXY + GOOGLE_FORM_ACTION, submitParams)
        .then((test) => {
          console.log(test);
          console.log("complete");
          // this.$router.push('thanks')
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
