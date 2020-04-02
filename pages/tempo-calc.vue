<template>
  <div class="tempo-calc-contents">
    <b-field label="BPM">
      <b-numberinput v-model="bpm"></b-numberinput>
    </b-field>
  </div>
</template>

<script>
import { Note, Interval, Scale, Key, Chord } from "@tonaljs/tonal";
export default {
  data() {
    return {
      bpm: 100
    }
  }
}
</script>

<style>
.tempo-calc-contents {
  display: block;
}
</style>
