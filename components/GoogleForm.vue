<template>
  <form @submit.prevent="submit" class="google-form">
    <input v-model="form.name" type="text" name="entry.2005620554" placeholder="name" />
    <input
      v-model="form.email"
      type="email"
      name="entry.1045781291"
      placeholder="sample@mail.co.jp"
    />
    <textarea v-model="form.message" name="entry.839337160" placeholder="message." />
    <button type="submit" name="button" value="送信" @click="$router.push('/')">send</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      form: {
        isSubmitComplete: false,
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
      const submitParams = new FormData();
      console.log(this.form.name);
      console.log(this.form.message);
      submitParams.append('entry.2005620554', this.form.name);
      submitParams.append('entry.1045781291', this.form.email);
      submitParams.append('entry.839337160', this.form.message);
      console.log(submitParams);
      const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
      const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLScae4nE8LEy8yzgi2M39dC9uGdwl4kJovrlhNCRRwMDF_rpNA/formResponse';
      this.$axios.$post(CORS_PROXY + GOOGLE_FORM_ACTION, submitParams)
      .then(response => {
        console.log(response);
        console.log("complete");
        this.isSubmitComplete = true;
      })
      .catch(() => {
        this.isSubmitComplete = true;
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
