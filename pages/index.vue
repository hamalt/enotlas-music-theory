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
        <span>Scale</span>
        <select v-model="scale" name="scale">
          <option value="major">(Melodic) Major</option>
          <option value="MelodicMajor">Hormonic Major</option>
          <option value="d">Natural Minor</option>
          <option value="e">Hormonic Minor</option>
          <option value="f">Melodic Minor</option>
        </select>
      </label>

      <div id="score"></div>
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
      VF: Object,
      key: "C",
      scale: "major",
      scaleList: Object,
      scaleOrder: ["c", "d", "e", "f", "g", "a", "b"]
      // scaleNotes: {
      //   type: Array,
      //   default: () => []
      // }
    };
  },
  created() {
    this.scaleList = Scale.names();
  },
  mounted() {
    this.VF = Vex.Flow;
  },
  watch: {
    key: function(newValue) {
      let VF = this.VF;

      // Create an SVG renderer and attach it to the DIV element named "boo".
      var div = document.getElementById("score");
      var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

      // Size our svg:
      renderer.resize(500, 500);

      // And get a drawing context:
      var context = renderer.getContext();

      // Create a stave at position 10, 40 of width 400 on the canvas.
      var stave = new VF.Stave(10, 40, 400);

      // Add a clef and time signature.
      stave.addClef("treble");

      // Connect it to the rendering context and draw!
      stave.setContext(context).draw();

      let scaleNotesDatas = Scale.get(this.key + "4 " + this.scale).notes;
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

      // Create a voice in 4/4 and add above notes
      var voice = new VF.Voice({ num_beats: 7, beat_value: 1 });
      voice.addTickables(scaleNotes);

      // Format and justify the notes to 400 pixels.
      var formatter = new VF.Formatter()
        .joinVoices([voice])
        .format([voice], 400);

      // Render voice
      voice.draw(context, stave);
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
