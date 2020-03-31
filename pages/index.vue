<template>
  <div class="scale-contents">
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
      <select v-model="accidental" name="accidental">
        <option value>(None)</option>
        <option value="#">#</option>
        <option value="b">b</option>
      </select>
    </label>

    <label>
      <span>Chord</span>
      <label for="chord-display">
        <input type="checkbox" id="chord-display" v-model="chordDisplay" />
      </label>
    </label>

    <dl class="scale-score" v-for="scale in scales" :key="scale.name">
      <dt>{{key + accidental}} {{ scale.title }}</dt>
      <dd :id="scale.name"></dd>
    </dl>
  </div>
</template>

<script>
// require("prismjs/themes/prism.css");
import Vex from "vexflow";
import { Note, Interval, Scale, Key, Chord } from "@tonaljs/tonal";

export default {
  components: {},
  data() {
    return {
      key: "C",
      accidental: "",
      chordDisplay: true,
      allKeyDatas: [],
      scales: [
        { name: "major", title: "Major(Ionian) Scale" },
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
    /**
     * チャーチモードスケールを全て描画
     */
    drawChurchModeScale(key, accidental) {
      // チャーチモードスケールごとに楽譜生成
      for (let [index, scale] of Object.entries(this.scales)) {
        // 既に描画されているスケールを削除
        this.deleteScale(scale.name);

        // スケールを描画
        this.drawScale(key, accidental, scale.name, scale.title);
      }
    },
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
      VFRenderer.resize(500, 150);

      // レンダラーのコンテキストを取得
      var context = VFRenderer.getContext();
      context.clear();

      // 五線譜の作成（<canvas>）
      // x: 10, y: 40, width: 400
      var stave = new VF.Stave(0, 0, 500);

      // ト音記号の追加
      stave.addClef("treble");

      // 五線譜にコンテキストを設定
      stave.setContext(context);

      // スケールのデータ（ダイアトニックノートなど）を取得
      let scaleData = Scale.get(key + this.accidental + "4 " + scaleName);

      // ダイアトニックノート格納用配列
      // ダイアトニック名格納用配列
      let diatonicNotes = new Array();
      let diatonicNames = new Array();

      // スケールのインターバルに合わせてキーのスケールノートを生成
      for (let [index, note] of scaleData.notes.entries()) {
        // 臨時記号が2つ以上あった場合は単純化（例: F## -> G）してデータ取得
        // C4
        let simplifyNote = Note.simplify(note);
        let noteData = Note.get(simplifyNote);

        let accidentalMark = [];

        let diatonicText = "";

        // ダイアトニックノートを設定
        let tones = [];
        if (true === this.chordDisplay) {
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
        } else {
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
    // Set VexFlow;
    this.VF = Vex.Flow;

    // TODO: keyパッケージを使い、12音の各情報を予め変数にセット
    let keyNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    for (let [index, keyName] of keyNames.entries()) {
        // console.log(index);
        // console.log(keyName);
        // TODO: 参照
        // https://github.com/tonaljs/tonal/tree/master/packages/key
        if ( true ) {
            this.allKeyDatas[index] = Key.majorKey(keyName);
        } else {
            // マイナーキーの情報取得
            this.allKeyDatas[index] = Key.minorKey(keyName);
        }

        // console.log(this.allKeyDatas[index]);
    }

    // console.log(this.allKeyDatas);

    // TODO: 各モードの７音のintervalを予め作成
    // array = [];
    // Cドリアン = B♭メジャーの第二音から並べたもの
    // B♭Majorスケールから2M（長2度）上げた音（transpose）から並べたもの
    // scale-typeから作成する
    // https://github.com/tonaljs/tonal/tree/master/packages/scale-type
    // 以下みたいな感じで取れる
    // ScaleType.get("Dorian"); -> {intervals: ["1P", "2M", "3M", "4P", "5P", "6M", "7M"],}
    // I -> 1,3,5

    // TODO: チャーチモードスケールごとにインターバルを取得
    for (let [index, scale] of Object.entries(this.scales)) {
      var scaleDictionary = Scale.get(scale.name);
    }

    // TODO: インターヴァルを元に、コードを作成
    // Note.transpose("d3", "3M"); // => "F#3"
    //Note.transpose("D", "3M"); // => "F#"
    // 参考: transpose: https://github.com/tonaljs/tonal/tree/master/packages/note
  },
  mounted() {
    this.drawChurchModeScale(this.key, this.accidental);
  },
  watch: {
    key: function(newValue) {
      // チャーチモードスケールの描画
      this.drawChurchModeScale(newValue, this.accidental);
    },
    accidental: function(newValue) {
      // チャーチモードスケールの描画
      this.drawChurchModeScale(this.key, newValue);
    },
    chordDisplay: function(newValue) {
      // チャーチモードスケールの描画
      this.drawChurchModeScale(this.key, this.accidental);
    }
  }
};
</script>

<style lang="scss">
.scale-contents {
  max-width: 640px;
}

.scale-score {
  dd {
    margin: 0;
  }

  svg {
    width: 100%;
  }
}
</style>
