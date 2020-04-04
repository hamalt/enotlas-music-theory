<template>
  <div class="tempo-calc-contents">
    <b-field label="BPM">
      <b-numberinput v-model="bpm"></b-numberinput>
    </b-field>

    <b-table :data="data" :columns="columns"></b-table>
  </div>
</template>

<script>
import { Note, Interval, Scale, Key, Chord } from "@tonaljs/tonal";
export default {
  data() {
    return {
      bpm: 100,
      data: [
        { 'tempo': this.bpm, 'quarter_note': '120' },
      ],
      columns: [
        {
          field: 'tempo',
          label: 'Tempo',
          width: '120',
          numeric: true
        },
        {
          field: 'quarter_note',
          label: '1/4',
        },
      ]
    }
  }
}
</script>

<style>
.tempo-calc-contents {
  display: block;
}
</style>
