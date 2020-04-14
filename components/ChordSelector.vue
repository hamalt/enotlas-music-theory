<template>
  <div class="chord-selector">
    <dl>
      <dt class="is-size-7">Chord name:</dt>
      <dd class="is-size-1">{{ this.formatedChordName }}</dd>
    </dl>

    <b-field label="Root tone">
      <b-field type="is-success">
        <b-select v-model="chordTone" placeholder="Select a root tone">
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="G">G</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </b-select>
        <b-radio-button v-model="chordAcc" native-value type="is-success">(None)</b-radio-button>
        <b-radio-button v-model="chordAcc" native-value="#" type="is-success">♯</b-radio-button>
        <b-radio-button v-model="chordAcc" native-value="b" type="is-success">♭</b-radio-button>
      </b-field>
    </b-field>

    <b-field label="Quality" type="is-success">
      <b-select v-model="chordType" placeholder="Select a quality" type="is-success">
        <option
          v-for="chordTypeName in this.allChordTypes"
          :key="chordTypeName"
          :value="chordTypeName"
        >{{ getFormatedChordTypeName(chordTypeName) }}</option>
      </b-select>
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

    // 渡されたPropsをdataに保存
    this.chordTone = this.rootTone;
    this.chordAcc = this.rootToneAcc;
    this.chordType = this.chordQuality;
  },
  mounted() {
  },
  methods: {
    /**
     * 整形されたコードタイプの名前を取得
     */
    getFormatedChordTypeName(chordName) {
      let chordTypeData = Chord.get(chordName);
      let fromatedChordTypeName = chordTypeData.aliases.length > 0 ? chordTypeData.aliases[0] : chordTypeData.name;
      return fromatedChordTypeName;
    }
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
    },
    formatedChordName: {
      get: function() {
        let chordNameData = Chord.get(this.chordTone + this.chordAcc + this.chordType);
        let fromatedQualityName = chordNameData.aliases.length > 0 ? chordNameData.aliases[0] : chordNameData.name;
        return this.chordTone + this.chordAcc + fromatedQualityName;
      }
    }
  }
}
</script>

<style lang="scss">
.chord-selector {
  display: block;
}
</style>
