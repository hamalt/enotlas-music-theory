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
        <select v-model="scale" name="scale">
          <option value="major">(Melodic) Major</option>
          <option value="MelodicMajor">Hormonic Major</option>
          <option value="d">Natural Minor</option>
          <option value="e">Hormonic Minor</option>
          <option value="f">Melodic Minor</option>
        </select>
      </label>

      <div :id="musicalScoreId"></div>
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
      scale: "major",
      scaleList: Object,
      scaleOrder: ["c", "d", "e", "f", "g", "a", "b"],
      // scaleNotes: {
      //   type: Array,
      //   default: () => []
      // }
      VF: Object,
      VFRenderer: Object
    };
  },
  methods: {},
  created() {
    // Set scale list.
    this.scaleList = Scale.names();

    // Set VexFlow;
    this.VF = Vex.Flow;
  },
  mounted() {
    // Set musical score DOM.
    this.musicalScoreDom = document.getElementById(this.musicalScoreId);

    // Renderer SVG musical socre.
    // Set renderer instance.
    let VF = this.VF;
    this.renderer = new VF.Renderer(
      this.musicalScoreDom,
      this.VF.Renderer.Backends.SVG
    );
  },
  watch: {
    key: function(newValue) {
      // Set VexFlow Object.
      let VF = this.VF;

      // Size our svg:
      this.renderer.resize(500, 500);

      // And get a drawing context:
      var context = this.renderer.getContext();

      // context.setFont("Arial", "10px", "").setBackgroundFillStyle("#eed");

      // Create a stave at position 10, 40 of width 400 on the canvas.
      var stave = new VF.Stave(10, 40, 480);

      // Add a clef and time signature.
      stave.addClef("treble");

      // Connect it to the rendering context!
      stave.setContext(context);

      let scaleNotesDatas = Scale.get(
        this.key + this.accidental + "4 " + this.scale
      ).notes;
      console.log(scaleNotesDatas);
      let scaleNotes = new Array();
      var accidentalMarkRegExp = new RegExp(/#|b/);

      // スケールのインターバルに合わせてキーのスケールノートを生成
      for (let [index, note] of scaleNotesDatas.entries()) {
        // 音名を取得
        let noteName = note.slice(0, -1);

        // オクターブを取得
        var noteOct = note.slice(-1);

        // 臨時記号を取得
        var accidentalMark = note.match(accidentalMarkRegExp);

        // TODO: 臨時記号が2つあった場合は条件分岐を変更
        if (null !== accidentalMark) {
          scaleNotes[index] = new VF.StaveNote({
            clef: "treble",
            keys: [noteName.toLowerCase() + "/" + noteOct],
            duration: "w"
          }).addAccidental(0, new VF.Accidental(accidentalMark[0]));
        } else {
          scaleNotes[index] = new VF.StaveNote({
            clef: "treble",
            keys: [noteName.toLowerCase() + "/" + noteOct],
            duration: "w"
          });
        }
      }

      console.log(scaleNotes);

      // Create a voice in 4/4 and add above notes
      var voice = new VF.Voice({ num_beats: 7, beat_value: 1 });
      voice.addTickables(scaleNotes);

      // TODO: コードネームを表示したい
      // https://github.com/0xfe/vexflow/blob/master/src/textnote.js
      var dynamics = [
        new VF.TextNote({
          text: "C",
          duration: "w"
        })
          .setStave(stave)
          .setLine(12)
          .setJustification(VF.TextNote.Justification.LEFT),
        new VF.TextNote({
          text: "D",
          duration: "w"
        })
          .setStave(stave)
          .setLine(12)
          .setJustification(VF.TextNote.Justification.LEFT),
        new VF.TextNote({ glyph: "p", duration: "w" })
          .setStave(stave)
          .setLine(12)
          .setJustification(VF.TextNote.Justification.LEFT),
        new VF.TextNote({ glyph: "p", duration: "w" })
          .setStave(stave)
          .setLine(12)
          .setJustification(VF.TextNote.Justification.LEFT),
        new VF.TextNote({ glyph: "p", duration: "w" })
          .setStave(stave)
          .setLine(12)
          .setJustification(VF.TextNote.Justification.LEFT),
        new VF.TextNote({ glyph: "p", duration: "w" })
          .setStave(stave)
          .setLine(12)
          .setJustification(VF.TextNote.Justification.LEFT),
        new VF.TextNote({ glyph: "p", duration: "w" })
          .setStave(stave)
          .setLine(12)
          .setJustification(VF.TextNote.Justification.LEFT)
      ];

      var voice2 = new VF.Voice({ num_beats: 7, beat_value: 1 });
      voice2.addTickables(dynamics);

      // Format and justify the notes to 400 pixels.
      var formatter = new VF.Formatter()
        .joinVoices([voice, voice2])
        .format([voice, voice2], 480);

      // var formatter = new VF.Formatter()
      //   .joinVoices([voice2])
      //   .format([voice2], 400);

      // Clear musical score.
      context.clear();

      // Render stave.
      stave.draw();

      // Render voice.
      voice.draw(context, stave);
      voice2.draw(context, stave);
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
