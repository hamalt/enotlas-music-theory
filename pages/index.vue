<template>
  <div class="container">
    <div>
      <label>
        <span>Key</span>
        <select v-model="key" name="key">
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="G">G</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>
      </label>

      <label>
        <span>Accidental</span>
        <select v-model="accidental" name="Accidental">
          <option value>(None)</option>
          <option value="#">#</option>
          <option value="b">b</option>
        </select>
      </label>

      <label>
        <span>Scale</span>
        <select v-model="scaleName" name="scale">
          <option value="major">(Melodic) Major</option>
          <option value="MelodicMajor">Hormonic Major</option>
          <option value="d">Natural Minor</option>
          <option value="e">Hormonic Minor</option>
          <option value="f">Melodic Minor</option>
        </select>
      </label>

      <div :id="musicalScoreId"></div>

      <dl id="musical-scores">
        <template v-for="scale in scales">
          <dt :key="scale.name">{{ scale.title }}</dt>
          <dd :key="scale.name" :id="scale.name"></dd>
        </template>
      </dl>
    </div>
  </div>
</template>

<script>
// require("prismjs/themes/prism.css");
import Vex from "vexflow";
import { Note, Interval, Scale } from "@tonaljs/tonal";

export default {
  components: {},
  data() {
    return {
      musicalScoreId: "musical-score",
      musicalScoreDom: Object,
      key: "C",
      accidental: "",
      scaleName: "major",
      scales: [
        { name: "major", title: "Major Scale" },
        { name: "dorian", title: "Dorian Scale" },
        { name: "phrygian", title: "Phrygian Scale" },
        { name: "lydian", title: "Lydian Scale" },
        { name: "mixolydian", title: "Mixolydian Scale" },
        { name: "aeolian", title: "Aeolian Scale" },
        { name: "locrian", title: "Locrian Scale" }
      ],
      VF: Object
    };
  },
  methods: {
    deleteScale(scaleName) {
      let staff = document.getElementById(scaleName);
      while (staff.hasChildNodes()) {
        staff.removeChild(staff.lastChild);
      }
    },
    drawScale(key, accidental, scaleName, scaleTitle) {
      // VexFlowのレンダラー生成
      let scaleDom = document.getElementById(scaleName);
      let VF = this.VF;
      let VFRenderer = new VF.Renderer(scaleDom, VF.Renderer.Backends.SVG);

      // レンダラーのサイズ設定
      VFRenderer.resize(500, 500);

      // レンダラーのコンテキストを取得
      var context = VFRenderer.getContext();
      context.clear();

      // 五線譜の作成（<canvas>）
      // x: 10, y: 40, width: 400
      var stave = new VF.Stave(10, 40, 480);

      // ト音記号の追加
      stave.addClef("treble");

      // 五線譜にコンテキストを設定
      stave.setContext(context);

      // スケールに対するダイアトニックノートを取得
      let scaleNotes = Scale.get(key + this.accidental + "4 " + scaleName)
        .notes;

      // ダイアトニックノート格納用配列
      // ダイアトニック名格納用配列
      let diatonicNotes = new Array();
      let diatonicNames = new Array();

      // 臨時記号を検索する正規表現
      var accidentalMarkRegExp = new RegExp(/#|b/);

      // スケールのインターバルに合わせてキーのスケールノートを生成
      for (let [index, note] of scaleNotes.entries()) {
        // 音名を取得
        let noteName = note.slice(0, -1);

        // オクターブを取得
        var noteOct = note.slice(-1);

        // 臨時記号を取得
        var accidentalMark = note.match(accidentalMarkRegExp);

        // TODO: 臨時記号が2つあった場合は条件分岐を変更
        // ダイアトニックノートを設定
        if (null !== accidentalMark) {
          diatonicNotes[index] = new VF.StaveNote({
            clef: "treble",
            keys: [noteName.toLowerCase() + "/" + noteOct],
            duration: "w"
          }).addAccidental(0, new VF.Accidental(accidentalMark[0]));
        } else {
          diatonicNotes[index] = new VF.StaveNote({
            clef: "treble",
            keys: [noteName.toLowerCase() + "/" + noteOct],
            duration: "w"
          });
        }

        // ダイアトニック名を設定
        diatonicNames[index] = new VF.TextNote({
          text: noteName,
          duration: "w"
        })
          .setStave(stave)
          .setLine(12)
          .setJustification(VF.TextNote.Justification.LEFT);
      }

      // 7/7で音符用Voiceを作成
      let noteVoice = new VF.Voice({ num_beats: 7, beat_value: 1 });
      noteVoice.addTickables(diatonicNotes);

      // 7/7で音名用Voiceを作成
      let nameVoice = new VF.Voice({ num_beats: 7, beat_value: 1 });
      nameVoice.addTickables(diatonicNames);

      // Format and justify the notes to 400 pixels.
      let formatter = new VF.Formatter()
        .joinVoices([noteVoice, nameVoice])
        .format([noteVoice, nameVoice], 480);

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
    // Set scale list.
    console.log(Scale.names());

    // Set VexFlow;
    this.VF = Vex.Flow;
  },
  mounted() {},
  watch: {
    key: function(newValue) {
      // TODO: チャーチモードスケールごとに楽譜生成
      for (let [index, scale] of Object.entries(this.scales)) {
        // 既に描画されているスケールを削除
        this.deleteScale(scale.name);

        // スケールを描画
        this.drawScale(newValue, this.accidental, scale.name, scale.title);
      }
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  padding-left: 16em;
  padding-right: 16em;
  min-height: 100vh;
}
</style>
