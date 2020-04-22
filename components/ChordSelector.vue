<template>
  <div class="chord-selector">
    <!-- <dl>
      <dt class="is-size-7">Selected:</dt>
      <dd class="is-size-1">
        <span class="has-text-success">{{ this.formatedChordName }}</span>
      </dd>
    </dl>-->

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
      let formatedQualityName = chordTypeData.aliases.length > 0 ? chordTypeData.aliases[0] : chordTypeData.name;

      // 表記方法を整形する
      switch(formatedQualityName) {
        case "M":
          formatedQualityName = "Maj";
          break;
      }

      return formatedQualityName;
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
        let formatedQualityName = chordNameData.aliases.length > 0 ? chordNameData.aliases[0] : chordNameData.name;

        // 表記方法を整形する
        switch(formatedQualityName) {
          case "M":
            formatedQualityName = "";
            break;
        }

        return this.chordTone + this.chordAcc + formatedQualityName;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chord-selector {
  display: block;
}
</style>
