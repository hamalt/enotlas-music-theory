<template>
  <div class="container">
    <div>
			<label>
				<span>Key</span>
				<select v-model="key" name="key">
				<option value="c">C</option>
				<option value="d">D</option>
				<option value="e">E</option>
				<option value="f">F</option>
				<option value="g">G</option>
				<option value="a">A</option>
				<option value="b">B</option>
			</select>
			</label>

			<label>
				<span>Scale</span>
				<select v-model="scale" name="scale">
					<option value="c">Natural Major</option>
					<option value="c">Melodic Major</option>
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
import Vex from 'vexflow'

export default {
  components: {
	},
	data () {
		return {
			key: '',
			scale: ''
		}
  },
	mounted() {
		let VF = Vex.Flow;

		// Create an SVG renderer and attach it to the DIV element named "boo".
		var div = document.getElementById("score")
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

		// TODO: キーを元にスケール作成
		let scaleNotes = [
			this.key + '/4',
		];

	var notes = [
		// A quarter-note C.
		new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "w" }),
		new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "w" }),
		new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "w" }),
		new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "w" }),
		new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "w" }),
		new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "w" }),
		new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "w" }),

		// A quarter-note D.
		// new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),

		// // A quarter-note rest. Note that the key (b/4) specifies the vertical
		// // position of the rest.
		// new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),

		// // A C-Major chord.
		// new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" })
	];

	// Create a voice in 4/4 and add above notes
	var voice = new VF.Voice({num_beats: 7,  beat_value: 1});
	voice.addTickables(notes);

	// Format and justify the notes to 400 pixels.
	var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

	// Render voice
	voice.draw(context, stave);
  }
}
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
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
