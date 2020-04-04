<template>
  <div class="scale-contents">
    <b-field grouped>
      <b-field label="Key">
        <b-field>
          <b-select v-model="key" placeholder="Select a key">
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </b-select>
          <b-radio-button v-model="accidental" native-value>(None)</b-radio-button>
          <b-radio-button v-model="accidental" native-value="#">♯</b-radio-button>
          <b-radio-button v-model="accidental" native-value="b">♭</b-radio-button>
        </b-field>
      </b-field>

      <b-field label="Scale Type">
        <b-select v-model="scaleType" placeholder="Select a scale type">
          <option value="major">(Melodic) Major</option>
          <option value="minor">Natural Minor</option>
          <option value="harmonic minor">Harmonic Minor</option>
          <option value="melodic minor">Melodic Minor</option>
        </b-select>
      </b-field>

      <b-field label="Chord">
        <b-switch v-model="chordDisplay">Display</b-switch>
      </b-field>
    </b-field>

    <dl class="scales" v-for="(scale, index) in scales" :key="scale.name">
      <dt>{{key + accidental}} {{ scale.title }}</dt>
      <dd :id="'score-' + index" class="scales__score"></dd>
    </dl>
  </div>
</template>

<script>
import Vex from "vexflow";
import { Note, Interval, Scale, Key, Chord } from "@tonaljs/tonal";

export default {
  components: {},
  data() {
    return {
      key: "C",
      accidental: "",
      scaleType: "harmonic minor",
      chordDisplay: true,
      scoreIdPrefix: "score-",
      scales: [],
      VF: Object,
      rendererWidth: 620
    };
  },
  methods: {
    /**
     * スケール情報を設定
     *
     * メジャースケールの場合
     * this.scales = [
     * { id: "score-0", name: "major", title: "Major(Ionian) Scale" },
     * { id: "score-1", name: "dorian", title: "Dorian Scale" },
     * { id: "score-2", name: "phrygian", title: "Phrygian Scale" },
     * { id: "score-3",  name: "lydian", title: "Lydian Scale" },
     * { id: "score-4", name: "mixolydian", title: "Mixolydian Scale" },
     * { id: "score-5", name: "aeolian", title: "Aeolian Scale" },
     * { id: "score-6", name: "locrian", title: "Locrian Scale" }
     * ]
     */
    setScaleData() {
      console.log("START: setScaleData");
      let modeNames = Scale.modeNames(this.key + " " + scaleType);
      for (let [index, modeName] of modeNames.entries()) {
        let scaleProperties = Scale.get(modeName[1]);
        let aliasName = scaleProperties.aliases.length > 0 ? "(" + scaleProperties.aliases[0] + ")" : "";
        let titleText = scaleProperties.name + aliasName + " scale";
        this.scales[index] = {id: this.scoreIdPrefix + index, name: modeName[1], title: titleText};
      }
      console.log("END: setScaleData");
    },
    /**
     * スケール情報を設定
     *
     * メジャースケールの場合
     * this.scales = [
     * { id: "score-0", name: "major", title: "Major(Ionian) Scale" },
     * { id: "score-1", name: "dorian", title: "Dorian Scale" },
     * { id: "score-2", name: "phrygian", title: "Phrygian Scale" },
     * { id: "score-3",  name: "lydian", title: "Lydian Scale" },
     * { id: "score-4", name: "mixolydian", title: "Mixolydian Scale" },
     * { id: "score-5", name: "aeolian", title: "Aeolian Scale" },
     * { id: "score-6", name: "locrian", title: "Locrian Scale" }
     * ]
     */
    setScales(scaleType) {
      // TODO: setScalesを実行したあとだけ楽譜描画がおかしい
      console.log("Start: setScale");
      let modeNames = Scale.modeNames(this.key + " " + scaleType);
      for (let [index, modeName] of modeNames.entries()) {
        let scaleProperties = Scale.get(modeName[1]);
        let aliasName = scaleProperties.aliases.length > 0 ? "(" + scaleProperties.aliases[0] + ")" : "";
        let titleText = scaleProperties.name + aliasName + " scale";
        this.scales[index] = {id: this.scoreIdPrefix + index, name: modeName[1], title: titleText};
      }
      console.log("End: setScale");
    },
    /**
     * チャーチモードスケールを全て描画
     */
    drawChurchModeScale(key, accidental) {
      // チャーチモードスケールごとに楽譜生成
      for (let [index, scale] of Object.entries(this.scales)) {
        // 既に描画されているスケールを削除
        this.deleteScale(index);

        // スケールを描画
        // console.log(key);
        // this.drawScale(index, key, accidental, scale.name);
      }

      this.setScales(this.scaleType);
            // チャーチモードスケールごとに楽譜生成
      for (let [index, scale] of Object.entries(this.scales)) {
        // 既に描画されているスケールを削除
        // this.deleteScale(index);

        // スケールを描画
        console.log(key);
        this.drawScale(index, key, accidental, scale.name);
      }
    },
    /**
     * 描画されている楽譜を削除
     */
    deleteScale(scoreNum) {
      console.log("DELETE");
      let staff = document.getElementById(this.scoreIdPrefix + scoreNum);
      while (staff.hasChildNodes()) {
        staff.removeChild(staff.lastChild);
      }
    },
    /**
     * スケールの楽譜描画
     */
    drawScale(scoreNum, key, accidental, scaleName) {
      // VexFlowのレンダラー生成
      let scaleDom = document.getElementById(this.scoreIdPrefix + scoreNum);

      let VF = Vex.Flow;
      let VFRenderer = new VF.Renderer(scaleDom, VF.Renderer.Backends.SVG);
      console.log(VFRenderer);

      // レンダラーのサイズ設定
      VFRenderer.resize(this.rendererWidth, 150);

      // レンダラーのコンテキストを取得
      var context = VFRenderer.getContext();
      console.log(context);
      // context.clear();

      // 五線譜の作成（<canvas>）
      // x: 10, y: 40, width: 400
      var stave = new VF.Stave(0, 0, this.rendererWidth);

      // ト音記号の追加
      stave.addClef("treble");

      // 五線譜にコンテキストを設定
      stave.setContext(context);
      console.log(stave);


      // スケールのデータ（ダイアトニックノートなど）を取得
      let scaleData = Scale.get(key + accidental + "4 " + scaleName);
      console.log(key);
      console.log(accidental);
      console.log(scaleName);
      console.log(scaleData);

      // ダイアトニックノート格納用配列
      // ダイアトニック名格納用配列
      let diatonicNotes = new Array();
      let diatonicNames = new Array();

      // スケールのインターバルに合わせてキーのスケールノートを生成
      for (let [index, note] of scaleData.notes.entries()) {
        console.log("START: FOR");
        // 臨時記号が2つ以上あった場合は単純化（例: F## -> G）してデータ取得
        let simplifyNote = Note.simplify(note);
        let noteData = Note.get(simplifyNote);

        console.log(noteData);

        let accidentalMark = [];

        let diatonicText = "";

        // ダイアトニックノートを設定
        let tones = [];

        // コード表示にチェックが入っているならコードトーン
        if (true === this.chordDisplay) {
          console.log("START: IF TRUE");
          // スケール音の数
          let noteCount = scaleData.notes.length;

          // ダイアトニックコードのトーン設定用
          let diatonicChordTones = [];

          // コードトーンを設定
          let simplifyNote = Note.simplify(note);
          let noteData = Note.get(simplifyNote);

          // ルート音
          let root = index;
          let rootToneData = noteData;
          accidentalMark[0] = rootToneData.acc;
          tones[0] = rootToneData.pc.toLowerCase() + "/" + rootToneData.oct;
          diatonicChordTones[0] = rootToneData.name;

          // 第2音
          let second;
          let secondOctUp = 0;

          // オークターブ上の場合
          if ((root + 2) >= noteCount) {
            second = (root + 2) - noteCount;
            secondOctUp = 1;
          } else {
            second = root + 2;
          }

          let secondTone = scaleData.notes[second];
          let secondToneData = Note.get(secondTone);
          accidentalMark[1] = secondToneData.acc;
          tones[1] = secondToneData.pc.toLowerCase() + "/" + (secondToneData.oct + secondOctUp);

          // オクターブアップなら一つ上げる
          if (0 < secondOctUp) {
            diatonicChordTones[1] = secondToneData.pc + (secondToneData.oct + secondOctUp);
          } else {
            diatonicChordTones[1] = secondToneData.name;
          }


          // 第3音
          let third;
          let thirdOctUp = 0;

          // オークターブ上の場合
          if ((root + 4) >= noteCount) {
            third = (root + 4) - noteCount;
            thirdOctUp = 1;
          } else {
            third = root + 4;
          }

          let thirdTone = scaleData.notes[third];
          let thirdToneData = Note.get(thirdTone);
          accidentalMark[2] = thirdToneData.acc;
          tones[2] = thirdToneData.pc.toLowerCase() + "/" + (thirdToneData.oct + thirdOctUp);

          // オクターブアップなら一つ上げる
          if (0 < thirdOctUp) {
            diatonicChordTones[2] = thirdToneData.pc + (thirdToneData.oct + thirdOctUp);
          } else {
            diatonicChordTones[2] = thirdToneData.name;
          }

          // ダイアトニックな音名設定
          diatonicText = Chord.detect(diatonicChordTones);
          console.log(diatonicText);

          //const isInCTriad = isNoteIncludedIn(["C", "E", "G"]);
          // isInCTriad("C4"); // => true
          // isInCTriad("C#4"); // => false
          // TODO: この機能で「diatonicChordTones」がメジャースケールの各音に含まれているか調べる

        } else {
          console.log("START: IF ELSE");
        // 音名を取得
        let noteName = noteData.pc;

        // オクターブを取得
        let noteOct = noteData.oct;

        // 臨時記号を取得
        accidentalMark[0] = noteData.acc;

        // 音符データ作成
        tones[0] = noteName.toLowerCase() + "/" + noteOct;

        // ダイアトニックな音名設定
        diatonicText = noteData.pc;
        }

        // ダイアトニックなノート or コードを設定
        diatonicNotes[index] = new VF.StaveNote({
          clef: "treble",
          keys: tones,
          duration: "w"
        });
        console.log(diatonicNotes);

        // 臨時記号が存在するなら設定
        for(let i = 0; i < accidentalMark.length; i++) {
          if ("" !== accidentalMark[i]) {
            diatonicNotes[index].addAccidental(i, new VF.Accidental(accidentalMark[i]));
          }
        }

        // ダイアトニック名を設定
        diatonicNames[index] = new VF.TextNote({
          text: diatonicText[0],
          duration: "w"
        })
          .setStave(stave)
          .setLine(12)
          .setJustification(VF.TextNote.Justification.LEFT);
      }

      // 7/7で音符用Voiceを作成
      let noteVoice = new VF.Voice({ num_beats: 7, beat_value: 1 });
      noteVoice.addTickables(diatonicNotes);
      console.log(diatonicNotes);

      // 7/7で音名用Voiceを作成
      let nameVoice = new VF.Voice({ num_beats: 7, beat_value: 1 });
      nameVoice.addTickables(diatonicNames);

      // Format and justify the notes to 400 pixels.
      console.log("START: Formatter");
      console.log(noteVoice);
      let formatter = new VF.Formatter()
        .joinVoices([noteVoice, nameVoice])
        .format([noteVoice, nameVoice], (this.rendererWidth - 20));
      console.log("END: Formatter");
      // Clear musical score.
      // context.clear();

      // Render stave.
      stave.draw();

      // Render voice.
      noteVoice.draw(context, stave);
      nameVoice.draw(context, stave);
    }
  },
  created() {
    // Set VexFlow;
    this.VF = Vex.Flow;

    // スケールの初期設定
    console.log(this.scaleType);
    this.setScales(this.scaleType);

    this.setScaleData();
  },
  mounted() {
    this.drawChurchModeScale(this.key, this.accidental);
  },
  watch: {
    key: function(newValue) {
      this.drawChurchModeScale(newValue, this.accidental);
    },
    accidental: function(newValue) {
      this.drawChurchModeScale(this.key, newValue);
    },
    chordDisplay: function(newValue) {
      this.drawChurchModeScale(this.key, this.accidental);
    },
    scaleType: function(newValue) {
      // this.setScales(newValue);
      // let thisObj = this;
      // setTimeout(function(){
      //   thisObj.drawChurchModeScale(thisObj.key, thisObj.accidental);
      // }, 1000);
      this.drawChurchModeScale(this.key, this.accidental);
    }
  }
};
</script>

<style lang="scss">
.scale-contents {
  max-width: 640px;
}

.scales {
  &__score {
    margin: 0;
  }

  svg {
    width: 100%;
  }
}
</style>
