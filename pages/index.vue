<template>
  <div class="mode-list">
    <section class="hero">
      <div class="hero-body">
        <h1 class="title is-1">Mode List</h1>
        <p class="subtitle">Modal scales &amp; chords list.</p>
      </div>
    </section>

    <div class="mode-contents">
      <div class="mode-contents__results">
        <section class="section">
          <div class="mode-results">
            <!-- <div class="mode-results__source"></div> -->
            <div class="mode-results__modal-interchange">
              <h2 class="title is-3">
                <b-icon icon="playlist-music" size="is-medium"></b-icon>
                <span class="has-text-primary">{{tonicName}} {{ this.keyScaleType }} scale</span> mode including
                <span class="has-text-success" v-html="formatedChordName"></span> chord.
              </h2>
              <p class="subtitle">Click mode name. Find modal interchange.</p>
              <div class="buttons" v-if="0 < organizedIncludedScaleTypes.length">
                <b-button
                  v-for="includedScaleName in organizedIncludedScaleTypes"
                  :key="'included-' + getFormatIdName(includedScaleName)"
                  :id="'included-' + getFormatIdName(includedScaleName)"
                  tag="a"
                  href="#"
                  :data-scroll="'#scale-' + getFormatIdName(keyScaleType) + '-' + getFormatIdName(includedScaleName)"
                  v-scroll-to="'#scale-' + getFormatIdName(keyScaleType) + '-' + getFormatIdName(includedScaleName)"
                  type="is-dark"
                >{{tonicName}} {{ includedScaleName }}</b-button>
              </div>
              <p v-else class="mode-results__not-modal">
                <span class="has-text-danger">Not found.</span>
              </p>

              <b-collapse :open="false" position="is-bottom" aria-id="contentIdForA11y1">
                <a slot="trigger" slot-scope="props" aria-controls="contentIdForA11y1">
                  <b-icon :icon="!props.open ? 'menu-down' : 'menu-up'"></b-icon>
                  {{ !props.open ? 'Show all scales that chord fits' : 'hide' }}
                </a>
                <b-taglist v-if="0 < checkChordScales.length">
                  <b-tag
                    v-for="checkChordScale in checkChordScales"
                    :key="'included-' + getFormatIdName(checkChordScale)"
                    size="is-medium"
                  >{{ checkChordScale }}</b-tag>
                </b-taglist>
              </b-collapse>
            </div>

            <div class="mode-results__mode-list">
              <div class="scale-scores">
                <div class="mode-results__mode-list-description">
                  <h2 class="title is-3">
                    <b-icon icon="playlist-music" size="is-medium"></b-icon>
                    <span class="has-text-primary">{{ keyScaleName }} scale</span> Parallel modes
                  </h2>
                  <p class="subtitle">
                    <i class="has-background-secondary"></i>
                    <span class="has-text-secondary">Color</span> - modal interchange chord
                  </p>
                </div>
                <b-tabs v-model="scoreDisplayTab">
                  <template v-for="(scaleTypeData, scaleName) in scaleTypeDatas">
                    <b-tab-item
                      :label="scaleName"
                      :key="scaleName"
                      :id="getFormatIdName(scaleName)"
                    >
                      <div
                        class="scale"
                        v-for="scaleData in scaleTypeData"
                        :key="scaleData.name"
                        :id="'scale-' + scaleData.id"
                      >
                        <div class="scale__name">
                          <h3 class="is-size-4">{{tonicName}} {{ scaleData.title }}</h3>
                          <span
                            v-for="alias in scaleData.aliases"
                            :key="alias"
                            class="scale__alias"
                          >
                            <small>{{tonicName}} {{ alias }} scale</small>
                          </span>
                        </div>
                        <div :id="scaleData.id" class="scale__score"></div>
                      </div>
                    </b-tab-item>
                  </template>
                </b-tabs>
              </div>
              <!-- .scale-scores -->
            </div>
          </div>
        </section>
      </div>
      <!-- .mode-contents__results -->

      <div class="mode-contents__utility">
        <section class="section">
          <div class="operation-boards">
            <h3 class="title is-3">
              <b-icon icon="cog-outline" size="is-medium"></b-icon>Setting
            </h3>
            <div class="operation-boards__section">
              <h3 class="title is-4">
                Scale:
                <span class="has-text-primary">{{ tonicName }} {{ this.keyScaleType }}</span>
              </h3>
              <b-field label="Key">
                <b-field type="is-primary">
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

              <b-field label="Type" type="is-primary">
                <b-select v-model="keyScaleType" placeholder="Select a scale type">
                  <option value="major">Major</option>
                  <option value="minor">Minor</option>
                  <option value="harmonic minor">Harmonic minor</option>
                  <option value="melodic minor">Melodic minor</option>
                </b-select>
              </b-field>
            </div>

            <div class="operation-boards__section">
              <h4 class="title is-4">
                Chord:
                <span class="has-text-success" v-html="formatedChordName"></span>
                <small class="is-size-6 has-text-success">({{ this.checkChordData.name }})</small>
              </h4>
              <chord-selector
                :rootTone="key"
                :rootToneAcc="accidental"
                :chordQuality="keyScaleType"
                :chordData.sync="checkChordData"
              />
            </div>

            <div class="operation-boards__section">
              <h4 class="title is-4">Display type</h4>
              <b-field grouped>
                <b-field label="Chord">
                  <b-switch v-model="chordDisplay" type="is-secondary">On</b-switch>
                </b-field>

                <transition name="fade">
                  <b-field label="Chord type" v-if="chordDisplay">
                    <b-field>
                      <b-radio-button
                        v-model="chordType"
                        native-value="triad"
                        type="is-secondary"
                      >Triad</b-radio-button>
                      <b-radio-button
                        v-model="chordType"
                        native-value="tetrad"
                        type="is-secondary"
                      >Tetrad</b-radio-button>
                    </b-field>
                  </b-field>
                </transition>
              </b-field>
            </div>
          </div>
        </section>
      </div>
      <!-- .mode-contents__utility -->
    </div>
    <!-- .mode-contents -->
  </div>
  <!-- .scale-contents -->
</template>

<script>
import Vex from "vexflow";
import { Note, Interval, Scale, Key, Chord, ChordType, Pcset } from "@tonaljs/tonal";
import ChordSelector from "~/components/ChordSelector.vue";

export default {
  head() {
    return {
      title: "Mode List | Enotlas Music Tools",
      meta: [
        { hid: 'description', name: 'description', content: 'Modal scales & chords list.' }
      ]
    }
  },
  components: {
    ChordSelector
  },
  data() {
    return {
      key: "C",
      accidental: "",
      chordDisplay: true,
      chordType: "triad",
      keyScaleType: "major",
      centerScaleNotes: [],
      scaleTypes: ["major", "minor", "harmonic minor", "melodic minor"],
      scaleTypeDatas: {},
      checkChordData: {},
      includedScaleTypes: [],
      VF: Object,
      rendererWidth: 620,
      highlightColor:"#a22ad6",
      checkChordColor: "#3cb371",
      scoreDisplayTab: 0
    };
  },
  methods: {
    /**
     * 半角スペースをハイフンに変換して取得
     */
    getFormatIdName(str) {
      str = str.replace(" ", "-");
      str = str.replace("#", "sharp");
      return str;
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
            this.scaleTypeDatas[scaleType][index] = { id: this.getFormatIdName(scaleId), name: modeName[1], title: titleText, aliases: scaleProperties.aliases };
        }
      }
    },
    /**
     * 判断の中心とするスケールの各音を配列で設定
     */
    setCenterScaleNotes() {
      // スケールのデータ（ダイアトニックノートなど）を取得
      this.centerScaleNotes = Scale.get(this.key + this.accidental + " " + this.keyScaleType);
    },
    /**
     * 設定したコードが、現在設定しているキーとそのモードに属しているかをチェックし、属しているスケールを返す
     */
    checkIncludedScaleOfChord() {
      // 借用モード（スケール）一覧を初期化
      this.includedScaleTypes = [];

        for (let [scaleIndex, scaleTypeData] of Object.entries(this.scaleTypeDatas[this.keyScaleType])) {
          // スケールのデータ（ダイアトニックノートなど）を取得
          let scaleData = Scale.get(this.key + this.accidental + " " + scaleTypeData.name);

          // チェックするコードのがスケール内に存在するかチェック
          let scaleDataNotes = scaleData.notes;
          let isSubsetChord = Pcset.isSubsetOf(scaleDataNotes);
          if (true === isSubsetChord(this.checkChordData.notes)) {
            // 存在するスケールをプッシュ
            this.includedScaleTypes.push(scaleData.type);
          }
        }
    },
    /**
     * チャーチモードスケールを全て描画
     */
    drawChurchModeScale(key, accidental) {
      // チャーチモードスケールごとに楽譜生成
      for (let scaleType of this.scaleTypes) {
        for (let [scaleIndex, scaleTypeData] of Object.entries(this.scaleTypeDatas[scaleType])) {
        // 既に描画されているスケールを削除
        this.deleteScale(scaleTypeData.id);

        // スケールを描画
        this.drawScale(scaleTypeData.id, key, accidental, scaleTypeData.name);
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
      let scaleDataNotes = scaleData.notes;

      // ダイアトニックノート格納用配列
      // ダイアトニック名格納用配列
      let diatonicNotes = new Array();
      let diatonicNames = new Array();

      // スケールのインターバルに合わせてキーのスケールノートを生成
      for (let [index, note] of scaleDataNotes.entries()) {
        let noteData = Note.get(note);
        let accidentalMark = [];
        let diatonicText = "";

        // スケール外の音かを判定する用
        let notExistNote = false;

        // チェックしたいコードと同じかを判定する用
        let equaledCheckChord = false;

        // ダイアトニックノート設定用の変数
        let tones = [];

        // コード表示にチェックが入っているならコードトーン
        if (true === this.chordDisplay) {
          // スケール音の数
          let noteCount = scaleDataNotes.length;

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
            diatonicChordTones[0] = simplifyRootToneData.name;

            // 音が中心スケールに存在するか
            if (false === notExistNote && this.keyScaleType !== scaleName) {
              notExistNote = this.centerScaleNotes.notes.indexOf(simplifyRootToneData.pc) === -1 ? true : false;
            }
          } else {
            accidentalMark[0] = rootToneData.acc;
            tones[0] = rootToneData.pc + "/" + rootToneData.oct;
            diatonicChordTones[0] = rootToneData.name;

            // 音が中心スケールに存在するか
            if (false === notExistNote && this.keyScaleType !== scaleName) {
              notExistNote = this.centerScaleNotes.notes.indexOf(rootToneData.pc) === -1 ? true : false;
            }
          }


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

          let secondTone = scaleDataNotes[second];
          let secondToneData = Note.get(secondTone);

          // 臨時記号が3つ以上あった場合は単純化（例: F### -> G#）してデータ取得、設定
          if ("bbb" === secondToneData.acc || "###" === secondToneData.acc) {
            let simplifySecondToneName = Note.simplify(secondToneData.name);
            let simplifySecondToneData = Note.get(simplifySecondToneName);
            accidentalMark[1] = simplifySecondToneData.acc;
            tones[1] = simplifySecondToneData.pc + "/" + (simplifySecondToneData.oct + secondOctUp);

            // オクターブアップなら一つ上げる
            if (0 < secondOctUp) {
              diatonicChordTones[1] = simplifySecondToneData.pc + (simplifySecondToneData.oct + secondOctUp);
            } else {
              diatonicChordTones[1] = simplifySecondToneData.name;
            }

            // 音が中心スケールに存在するか
            if (false === notExistNote && this.keyScaleType !== scaleName) {
              notExistNote = this.centerScaleNotes.notes.indexOf(simplifySecondToneData.pc) === -1 ? true : false;
            }
          } else {
            accidentalMark[1] = secondToneData.acc;
            tones[1] = secondToneData.pc + "/" + (secondToneData.oct + secondOctUp);

            // オクターブアップなら一つ上げる
            if (0 < secondOctUp) {
              diatonicChordTones[1] = secondToneData.pc + (secondToneData.oct + secondOctUp);
            } else {
              diatonicChordTones[1] = secondToneData.name;
            }

            // 音が中心スケールに存在するか
            if (false === notExistNote && this.keyScaleType !== scaleName) {
              notExistNote = this.centerScaleNotes.notes.indexOf(secondToneData.pc) === -1 ? true : false;
            }
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

          let thirdTone = scaleDataNotes[third];
          let thirdToneData = Note.get(thirdTone);

          // 臨時記号が3つ以上あった場合は単純化（例: F### -> G#）してデータ取得、設定
          if ("bbb" === thirdToneData.acc || "###" === thirdToneData.acc) {
            let simplifyThirdToneName = Note.simplify(thirdToneData.name);
            let simplifyThirdToneData = Note.get(simplifyThirdToneName);
            accidentalMark[2] = simplifyThirdToneData.acc;
            tones[2] = simplifyThirdToneData.pc + "/" + (simplifyThirdToneData.oct + thirdOctUp);

            // オクターブアップなら一つ上げる
            if (0 < thirdOctUp) {
              diatonicChordTones[2] = simplifyThirdToneData.pc + (simplifyThirdToneData.oct + thirdOctUp);
            } else {
              diatonicChordTones[2] = simplifyThirdToneData.name;
            }

            // 音が中心スケールに存在するか
            if (false === notExistNote && this.keyScaleType !== scaleName) {
              notExistNote = this.centerScaleNotes.notes.indexOf(simplifyThirdToneData.pc) === -1 ? true : false;
            }
          } else {
            accidentalMark[2] = thirdToneData.acc;
            tones[2] = thirdToneData.pc + "/" + (thirdToneData.oct + thirdOctUp);

            // オクターブアップなら一つ上げる
            if (0 < thirdOctUp) {
              diatonicChordTones[2] = thirdToneData.pc + (thirdToneData.oct + thirdOctUp);
            } else {
              diatonicChordTones[2] = thirdToneData.name;
            }

            // 音が中心スケールに存在するか
            if (false === notExistNote && this.keyScaleType !== scaleName) {
              notExistNote = this.centerScaleNotes.notes.indexOf(thirdToneData.pc) === -1 ? true : false;
            }
          }


          // chordTypeがtetradなら4音目を追加
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

            let fourthTone = scaleDataNotes[fourth];
            let fourthToneData = Note.get(fourthTone);

            // 臨時記号が3つ以上あった場合は単純化（例: F### -> G#）してデータ取得、設定
            if ("bbb" === fourthToneData.acc || "###" === fourthToneData.acc) {
              let simplifyFourthToneName = Note.simplify(fourthToneData.name);
              let simplifyFourthToneData = Note.get(simplifyFourthToneName);
              accidentalMark[3] = simplifyFourthToneData.acc;
              tones[3] = simplifyFourthToneData.pc + "/" + (simplifyFourthToneData.oct + fourthOctUp);

              // オクターブアップなら一つ上げる
              if (0 < fourthOctUp) {
                diatonicChordTones[3] = simplifyFourthToneData.pc + (simplifyFourthToneData.oct + fourthOctUp);
              } else {
                diatonicChordTones[3] = simplifyFourthToneData.name;
              }

              // 音が中心スケールに存在するか
              if (false === notExistNote && this.keyScaleType !== scaleName) {
                notExistNote = this.centerScaleNotes.notes.indexOf(simplifyFourthToneData.pc) === -1 ? true : false;
              }
            } else {
              accidentalMark[3] = fourthToneData.acc;
              tones[3] = fourthToneData.pc + "/" + (fourthToneData.oct + fourthOctUp);

              // オクターブアップなら一つ上げる
              if (0 < fourthOctUp) {
                diatonicChordTones[3] = fourthToneData.pc + (fourthToneData.oct + fourthOctUp);
              } else {
                diatonicChordTones[3] = fourthToneData.name;
              }

              // 音が中心スケールに存在するか
              if (false === notExistNote && this.keyScaleType !== scaleName) {
                notExistNote = this.centerScaleNotes.notes.indexOf(fourthToneData.pc) === -1 ? true : false;
              }
            }
          }

          // ダイアトニックな音名設定
          diatonicText = Chord.detect(diatonicChordTones);

          // 設定したコードと同じかを判定
          let checkChordNames = Chord.detect(this.checkChordData.notes);
          if (checkChordNames[0] === diatonicText[0]) {
            equaledCheckChord = true;
          }
        } else {
          // 臨時記号が3つの場合
          if ("bbb" === noteData.acc || "###" === noteData.acc) {
            let simplifyNoteName = Note.simplify(noteData.name);
            let simplifyNoteData = Note.get(simplifyNoteName);
            accidentalMark[0] = simplifyNoteData.acc;
            tones[0] = simplifyNoteData.pc + "/" + simplifyNoteData.oct;

            // 音が中心スケールに存在するか
            if (false === notExistNote && this.keyScaleType !== scaleName) {
              notExistNote = this.centerScaleNotes.notes.indexOf(simplifyNoteData.pc) === -1 ? true : false;
            }
          } else {
            accidentalMark[0] = noteData.acc;
            tones[0] = noteData.pc + "/" + noteData.oct;

            // 音が中心スケールに存在するか
            if (false === notExistNote && this.keyScaleType !== scaleName) {
              notExistNote = this.centerScaleNotes.notes.indexOf(noteData.pc) === -1 ? true : false;
            }
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

        // スケールに無い音だったら色付け
        if (notExistNote) {
          diatonicNotes[index].setStyle({fillStyle: this.highlightColor, strokeStyle: this.highlightColor});
        }

        // 選択しているチェック用コードと同じなら音符の色を更に上書き
        if (equaledCheckChord) {
          diatonicNotes[index].setStyle({fillStyle: this.checkChordColor, strokeStyle: this.checkChordColor});
        }

        // ダイアトニック名を設定
        // chordDisplayがtrueならdiatonicTextは配列（object）なので、一番目を設定し直す
        if (true === this.chordDisplay && "object" === typeof diatonicText) {
          diatonicText = diatonicText[0];
        }

        diatonicNames[index] = new VF.TextNote({
          text: diatonicText,
          duration: "w"
        });

        diatonicNames[index].setStave(stave);
        diatonicNames[index].setLine(12);
        diatonicNames[index].setJustification(VF.TextNote.Justification.LEFT);

        // 特定の条件のとき、setStyleメソッドで色付けを行う
        if (notExistNote) {
          diatonicNames[index].setStyle({fillStyle: this.highlightColor, strokeStyle: this.highlightColor});
        }

        // 選択しているチェック用コードと同じなら名前の色を更に上書き
        if (equaledCheckChord) {
          diatonicNames[index].setStyle({fillStyle: this.checkChordColor, strokeStyle: this.checkChordColor});
        }
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

    // 選択中のキー＆スケールの各音を設定
    this.setCenterScaleNotes();

    // チェック用コードのデータを取得して設定
    this.checkChordData = Chord.get(this.key + this.accidental + " " + this.keyScaleType);
  },
  mounted() {
    // DOM読み込み完了後にモードのスケールを描画
    this.drawChurchModeScale(this.key, this.accidental);

    console.log(this.checkChordScales);
  },
  watch: {
    key: function(newValue) {
      this.setCenterScaleNotes();
      this.drawChurchModeScale(newValue, this.accidental);
      this.checkIncludedScaleOfChord();
    },
    accidental: function(newValue) {
      this.setCenterScaleNotes();
      this.drawChurchModeScale(this.key, newValue);
      this.checkIncludedScaleOfChord();
    },
    chordDisplay: function(newValue) {
      this.drawChurchModeScale(this.key, this.accidental);
      this.checkIncludedScaleOfChord();
    },
    chordType: function(newValue) {
      this.drawChurchModeScale(this.key, this.accidental);
      this.checkIncludedScaleOfChord();
    },
    keyScaleType: function(newValue) {
      // 表示しているタブも切り替え
      switch(newValue) {
        case "major":
          this.scoreDisplayTab = 0;
          break;
        case "minor":
          this.scoreDisplayTab = 1;
          break;
        case "harmonic minor":
          this.scoreDisplayTab = 2;
          break;
        case "melodic minor":
          this.scoreDisplayTab = 3;
          break;
        default:
          break;
      }

      this.setCenterScaleNotes();
      this.drawChurchModeScale(this.key, this.accidental);
      this.checkIncludedScaleOfChord();
    },
    checkChordData: function(newValue) {
      this.drawChurchModeScale(this.key, this.accidental);
      this.checkIncludedScaleOfChord();
    }
  },
  computed: {
    tonicName: {
      get: function() {
        return this.key + this.accidental;
      }
    },
    keyScaleName: {
      get: function() {
        return this.key + this.accidental + " " + this.keyScaleType;
      }
    },
    organizedIncludedScaleTypes: {
      get: function() {
          return Array.from(new Set(this.includedScaleTypes));
      }
    },
    checkChordScales: {
      get: function() {
        console.log(this.checkChordData.name);
        return Chord.chordScales(this.checkChordData.name);
      }
    },
    formatedChordName: {
      get: function() {
        let formatedQualityName = this.checkChordData.aliases.length > 0 ? this.checkChordData.aliases[0] : this.checkChordData.name;

        // 表記方法を整形する
        switch(formatedQualityName) {
          case "M":
            formatedQualityName = "";
            break;
        }

        return this.checkChordData.tonic + formatedQualityName;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mode-contents {
  $utility-width: 385px;

  @media screen and (min-width: 769px), print {
    display: flex;
  }

  &__utility {
    border-left: solid 1px #eee;

    @media screen and (min-width: 769px), print {
      order: 2;
      width: $utility-width;
    }
  }

  &__results {
    @media screen and (min-width: 769px), print {
      order: 1;
      width: calc(100% - #{$utility-width});
    }
  }
}

.operation-boards {
  &__section {
    padding-bottom: 1.5rem;
    border-bottom: solid 1px #eee;

    &:not(:first-of-type) {
      margin-top: 1.5rem;
    }
  }
}

.mode-results {
  &__source {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 3rem;

    dl {
      display: flex;
      font-size: 1.5rem;

      &:not(:first-of-type) {
        margin-left: 1.5rem;
        padding-left: 1.5rem;
        border-left: solid 1px #eee;
      }
    }

    dt {
      &::after {
        content: "=";
        padding-left: 0.2em;
        padding-right: 0.2em;
      }
    }
  }

  &__modal-interchange {
    margin-bottom: 3rem;
  }

  &__not-modal {
    margin-bottom: 1rem;
  }

  &__mode-list-description {
    margin-bottom: 1rem;

    /deep/ p i {
      display: inline-block;
      width: 12px;
      height: 12px;
    }
  }
}

.modal-scales-chords {
  max-width: 640px;

  &__section {
    &:not(:first-of-type) {
      margin-top: 24px;
    }
  }
}

.scale {
  &:not(:first-of-type) {
    margin-top: 3rem;
  }

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

    /deep/ svg {
      max-width: 100%;
      overflow: visible;
    }
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
