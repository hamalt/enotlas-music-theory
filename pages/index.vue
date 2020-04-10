<template>
  <div class="site-contents">
    <section class="hero">
      <div class="hero-body">
        <h1 class="title">Modal Scales &amp; Chords</h1>
        <h2 class="subtitle">Modal scales &amp; chords list.</h2>
      </div>
    </section>

    <section class="section">
      <div class="modal-scales-chords">
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

          <b-field label="Chord">
            <b-switch v-model="chordDisplay">Display</b-switch>
          </b-field>

          <b-field label="Chord type">
            <b-field>
              <b-radio-button v-model="chordType" native-value="triad">Triad</b-radio-button>
              <b-radio-button v-model="chordType" native-value="tetrad">Tetrad</b-radio-button>
            </b-field>
          </b-field>
        </b-field>

        <hr />

        <div class="scale-scores">
          <b-tabs>
            <template v-for="(scaleTypeData, scaleName) in scaleTypeDatas">
              <b-tab-item :label="scaleName" :key="scaleName" :id="getHyphenFillName(scaleName)">
                <div class="scales" v-for="scaleData in scaleTypeData" :key="scaleData.name">
                  <div class="scales__name">
                    <h3>{{key + accidental}} {{ scaleData.title }}</h3>
                    <span v-for="alias in scaleData.aliases" :key="alias" class="scales__alias">
                      <small>{{key + accidental}} {{ alias }} scale</small>
                    </span>
                  </div>
                  <div :id="scaleData.id" class="scales__score"></div>
                </div>
              </b-tab-item>
            </template>
          </b-tabs>
        </div>
        <!-- .scale-scores -->
      </div>
      <!-- .modal-scales-chords -->
    </section>
  </div>
  <!-- .scale-contents -->
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
      chordDisplay: true,
      chordType: "triad",
      scaleTypes: ["major", "minor", "harmonic minor", "melodic minor"],
      scoreIdPrefix: "score-",
      scales: [],
      scaleTypeDatas: {},
      VF: Object,
      rendererWidth: 620
    };
  },
  methods: {
    /**
     * 半角スペースをハイフンに変換して取得
     */
    getHyphenFillName(str) {
      return str.replace(" ", "-");
    },
    /**
     * 楽譜描画用の要素IDを取得
     */
    getModeId(modeName, aliases, scaleType) {
      var prefix = scaleType.replace(" ", "-");
      var name = modeName.replace(" ", "-");
      return (prefix + "-" + name);
    },
    /**
     * スケール情報を設定
     */
    setScaleData() {
      // 各スケールタイプごとのモードスケール情報を設定
      for (var[idx, scaleType] of this.scaleTypes.entries()) {
          this.scaleTypeDatas[scaleType] = {};
          var modeNames = Scale.modeNames(scaleType);
        for (var [index, modeName] of modeNames.entries()) {
            var scaleProperties = Scale.get(modeName[1]);
            // var aliasName = scaleProperties.aliases.length > 0 ? " (" + scaleProperties.aliases[0] + ")" : "";
            var titleText = scaleProperties.name + " scale";
            var scaleId = this.getModeId(modeName[1], scaleProperties.aliases, scaleType);
            this.scaleTypeDatas[scaleType][index] = { id: scaleId, name: modeName[1], title: titleText, aliases: scaleProperties.aliases };
        }
      }
    },
    /**
     * チャーチモードスケールを全て描画
     */
    drawChurchModeScale(key, accidental) {
      // チャーチモードスケールごとに楽譜生成
      for (let scaleType of this.scaleTypes) {
        for (let [scaleIndex, scaleData] of Object.entries(this.scaleTypeDatas[scaleType])) {
        // 既に描画されているスケールを削除
        this.deleteScale(scaleData.id);

        // スケールを描画
        this.drawScale(scaleData.id, key, accidental, scaleData.name);
        }
      }
    },
    /**
     * 描画されている楽譜を削除
     */
    deleteScale(scoreDomId) {
      let staff = document.getElementById(scoreDomId);
      while (staff.hasChildNodes()) {
        staff.removeChild(staff.lastChild);
      }
    },
    /**
     * スケールの楽譜描画
     */
    drawScale(scoreDomId, key, accidental, scaleName) {
      // VexFlowのレンダラー生成
      let scoreDom = document.getElementById(scoreDomId);

      let VF = Vex.Flow;
      let VFRenderer = new VF.Renderer(scoreDom, VF.Renderer.Backends.SVG);

      // レンダラーのサイズ設定
      VFRenderer.resize(this.rendererWidth, 150);

      // レンダラーのコンテキストを取得
      var context = VFRenderer.getContext();
      // context.clear();

      // 五線譜の作成（<canvas>）
      // x: 10, y: 40, width: 400
      var stave = new VF.Stave(0, 0, this.rendererWidth);

      // ト音記号の追加
      stave.addClef("treble");

      // 五線譜にコンテキストを設定
      stave.setContext(context);


      // スケールのデータ（ダイアトニックノートなど）を取得
      let scaleData = Scale.get(key + accidental + "4 " + scaleName);

      // ダイアトニックノート格納用配列
      // ダイアトニック名格納用配列
      let diatonicNotes = new Array();
      let diatonicNames = new Array();

      // スケールのインターバルに合わせてキーのスケールノートを生成
      for (let [index, note] of scaleData.notes.entries()) {
        let noteData = Note.get(note);
        let accidentalMark = [];
        let diatonicText = "";

        // ダイアトニックノート設定用の変数
        let tones = [];

        // コード表示にチェックが入っているならコードトーン
        if (true === this.chordDisplay) {
          // スケール音の数
          let noteCount = scaleData.notes.length;

          // ダイアトニックコードのトーン設定用
          let diatonicChordTones = [];

          // コードトーンを設定
          // ルート音
          let root = index;
          let rootToneData = noteData;

          // 臨時記号が3つ以上あった場合は単純化（例: F### -> G#）してデータ取得、設定
          if ("bbb" === rootToneData.acc || "###" === rootToneData.acc) {
              let simplifyRootToneName = Note.simplify(rootToneData.name);
              let simplifyRootToneData = Note.get(simplifyRootToneName);
              accidentalMark[0] = simplifyRootToneData.acc;
              tones[0] = simplifyRootToneData.pc + "/" + simplifyRootToneData.oct;
          } else {
              accidentalMark[0] = rootToneData.acc;
              tones[0] = rootToneData.pc + "/" + rootToneData.oct;
          }

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

          // 臨時記号が3つ以上あった場合は単純化（例: F### -> G#）してデータ取得、設定
          if ("bbb" === secondToneData.acc || "###" === secondToneData.acc) {
            let simplifySecondToneName = Note.simplify(secondToneData.name);
            let simplifySecondToneData = Note.get(simplifySecondToneName);
            accidentalMark[1] = simplifySecondToneData.acc;
            tones[1] = simplifySecondToneData.pc + "/" + (simplifySecondToneData.oct + secondOctUp);
          } else {
            accidentalMark[1] = secondToneData.acc;
            tones[1] = secondToneData.pc + "/" + (secondToneData.oct + secondOctUp);
          }

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

          // 臨時記号が3つ以上あった場合は単純化（例: F### -> G#）してデータ取得、設定
          if ("bbb" === thirdToneData.acc || "###" === thirdToneData.acc) {
            let simplifyThirdToneName = Note.simplify(thirdToneData.name);
            let simplifyThirdToneData = Note.get(simplifyThirdToneName);
            accidentalMark[2] = simplifyThirdToneData.acc;
            tones[2] = simplifyThirdToneData.pc + "/" + (simplifyThirdToneData.oct + thirdOctUp);
          } else {
            accidentalMark[2] = thirdToneData.acc;
            tones[2] = thirdToneData.pc + "/" + (thirdToneData.oct + thirdOctUp);
          }

          // オクターブアップなら一つ上げる
          if (0 < thirdOctUp) {
            diatonicChordTones[2] = thirdToneData.pc + (thirdToneData.oct + thirdOctUp);
          } else {
            diatonicChordTones[2] = thirdToneData.name;
          }

          // TODO: tetradなら4音目を追加
          if ("tetrad" === this.chordType) {
            // 第4音
            let fourth;
            let fourthOctUp = 0;

            // オークターブ上の場合
            if ((root + 6) >= noteCount) {
              fourth = (root + 6) - noteCount;
              fourthOctUp = 1;
            } else {
              fourth = root + 6;
            }

            let fourthTone = scaleData.notes[fourth];
            let fourthToneData = Note.get(fourthTone);

            // 臨時記号が3つ以上あった場合は単純化（例: F### -> G#）してデータ取得、設定
            if ("bbb" === fourthToneData.acc || "###" === fourthToneData.acc) {
              let simplifyFourthToneName = Note.simplify(fourthToneData.name);
              let simplifyFourthToneData = Note.get(simplifyFourthToneName);
              accidentalMark[3] = simplifyFourthToneData.acc;
              tones[3] = simplifyFourthToneData.pc + "/" + (simplifyFourthToneData.oct + fourthOctUp);
            } else {
              accidentalMark[3] = fourthToneData.acc;
              tones[3] = fourthToneData.pc + "/" + (fourthToneData.oct + fourthOctUp);
            }

            // オクターブアップなら一つ上げる
            if (0 < fourthOctUp) {
              diatonicChordTones[3] = fourthToneData.pc + (fourthToneData.oct + fourthOctUp);
            } else {
              diatonicChordTones[3] = fourthToneData.name;
            }
          }

          // ダイアトニックな音名設定
          diatonicText = Chord.detect(diatonicChordTones);

          //const isInCTriad = isNoteIncludedIn(["C", "E", "G"]);
          // isInCTriad("C4"); // => true
          // isInCTriad("C#4"); // => false
          // TODO: この機能で「diatonicChordTones」がメジャースケールの各音に含まれているか調べる

        } else {
          // 臨時記号が3つの場合
          if ("bbb" === noteData.acc || "###" === noteData.acc) {
            let simplifyNoteName = Note.simplify(noteData.name);
            let simplifyNoteData = Note.get(simplifyNoteName);
            accidentalMark[0] = simplifyNoteData.acc;
            tones[0] = simplifyNoteData.pc + "/" + simplifyNoteData.oct;
          } else {
            accidentalMark[0] = noteData.acc;
            tones[0] = noteData.pc + "/" + noteData.oct;
          }

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
        // chordDisplayがtrueならdiatonicTextは配列（object）なので、一番目を設定し直す
        if (true === this.chordDisplay && "object" === typeof diatonicText) {
          diatonicText = diatonicText[0];
        }

        diatonicNames[index] = new VF.TextNote({
          text: diatonicText,
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
        .format([noteVoice, nameVoice], (this.rendererWidth - 20));
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
    chordType: function(newValue) {
      this.drawChurchModeScale(this.key, this.accidental);
    }
  }
};
</script>

<style lang="scss">
.modal-scales-chords {
  max-width: 640px;
}

.scales {
  &__alias {
    display: block;
    color: #868686;

    // &:not(:first-of-type) {
    //   &::before {
    //     content: ",";
    //   }
    // }
  }

  &__score {
    margin: 0;
  }

  svg {
    width: 100%;
    overflow: visible;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
