<template>
  <div class="chord-selector">
    <dl>
      <dt>Chord name:</dt>
      <dd>{{ this.chordName }}</dd>
    </dl>

    <b-field grouped>
      <b-field label="Root tone">
        <b-field>
          <b-select v-model="chordTone" placeholder="Select a root tone">
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </b-select>
          <b-radio-button v-model="chordAcc" native-value>(None)</b-radio-button>
          <b-radio-button v-model="chordAcc" native-value="#">♯</b-radio-button>
          <b-radio-button v-model="chordAcc" native-value="b">♭</b-radio-button>
        </b-field>
      </b-field>

      <b-field label="Quality">
        <b-select v-model="chordType" placeholder="Select a quality">
          <option
            v-for="chordTypeName in this.allChordTypes"
            :key="chordTypeName"
          >{{ chordTypeName }}</option>
        </b-select>
      </b-field>
    </b-field>
  </div>
</template>

<script>
import { Chord, ChordType } from "@tonaljs/tonal";

export default {
  data() {
    return {
      allChordTypes: [],
      chordTone: "",
      chordAcc: "",
      chordType: ""
    }
  },
  props: {
    rootTone: {
      type: String,
      required: true
    },
    rootToneAcc: {
      type: String,
      required: true
    },
    chordQuality: {
      type: String,
      required: true
    },
    chordData: {}
  },
  created() {
    // すべてのコード名を設定
    this.allChordTypes = ChordType.names();

    this.chordTone = this.rootTone;
    this.chordAcc = this.rootToneAcc;
    this.chordType = this.chordQuality;

    // コード名を設定
    // this.chordName = this.rootTone + this.rootToneAcc + " " + this.chordQuality;
  },
  mounted() {
  },
  methods: {
  },
  watch: {
    chordTone: function(newValue) {
      this.$emit('update:chordData', Chord.get(this.chordName));
    },
    chordAcc: function(newValue) {
      this.$emit('update:chordData', Chord.get(this.chordName));
    },
    chordType: function(newValue) {
      this.$emit('update:chordData', Chord.get(this.chordName));
    },
  },
  computed: {
    chordName: {
      get: function() {
        return this.chordTone + this.chordAcc + " " + this.chordType;
      }
      // set: function(newValue) {
      //   let chordNameData = Chord.get(newValue);
      //   this.$emit('update:chordData', chordNameData);
      // }
    }
  }
}
</script>

<style lang="scss">
.chord-selector {
  display: block;
}
</style>
