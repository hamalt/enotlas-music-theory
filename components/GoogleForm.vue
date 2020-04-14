<template>
  <div class="contact-form">
    <h4 class="title is-4">Contact</h4>
    <form @submit.prevent="submit">
      <b-field>
        <b-input type="text" name="entry.2005620554" placeholder="name" v-model="form.name"></b-input>
      </b-field>
      <b-field>
        <b-input
          type="email"
          name="entry.1045781291"
          placeholder="info@example.com"
          v-model="form.email"
        ></b-input>
      </b-field>
      <b-field>
        <b-input
          type="textarea"
          name="entry.839337160"
          placeholder="Bugs, new features, etc."
          v-model="form.message"
          required
        ></b-input>
      </b-field>
      <p class="has-text-centered">
        <b-button
          type="is-primary"
          icon-left="email"
          native-type="submit"
          name="button"
          :loading="this.clickedSendButton"
        >Send</b-button>
      </p>
    </form>

    <transition name="fade">
      <b-notification
        v-if="this.isSubmitComplete"
        type="is-success"
        has-icon
        aria-close-label="Close notification"
        @close="closedNotification()"
      >Sent a message!</b-notification>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      clickedSendButton: false,
      isSubmitComplete: false,
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
      // 送信ボタンをクリックしたことを設定
      this.clickedSendButton = true;

      // フォームデータを設定してPOST
      const submitParams = new FormData();
      submitParams.append('entry.2005620554', this.form.name);
      submitParams.append('entry.1045781291', this.form.email);
      submitParams.append('entry.839337160', this.form.message);
      const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
      const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLScae4nE8LEy8yzgi2M39dC9uGdwl4kJovrlhNCRRwMDF_rpNA/formResponse';
      this.$axios.$post(CORS_PROXY + GOOGLE_FORM_ACTION, submitParams)
      .then(response => {
        // 送信成功
        this.form.name = "";
        this.form.email = "";
        this.form.message = "";
        this.isSubmitComplete = true;
        this.clickedSendButton = false;
      })
      .catch(() => {
        // エラー時
        this.isSubmitComplete = true;
        this.clickedSendButton = false;
      });
    },
    /**
     * 通知カードを消したイベント
     */
    closedNotification () {
      this.isSubmitComplete = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-form {
  display: block;

  .notification {
    margin-top: 1.5rem;
  }
}
</style>
