<template>
<div>
    <div class="question-area" v-show="isVisible">
      <b-container fluid>
        <h1 class="warning-message">DİKKAT: Aşağıdaki cümle örnektir.</h1>
        <h3>Şempanzelerin kuyruğu yoktur</h3>
        <p class="info-text mb-0">
          *Lütfen ses kayıt ikonuna tıklayın ve yukarıdaki cümleyi
          <span class="underline">sesli</span> olarak tekrar edin.
          İstersen cümleleri ses kayıt ikonuna basıp tekrar deneyebilirsin.
        </p>
        <b-row>
          <b-button id="mic-button" class="mx-auto my-3" @click="convertToText">
            <v-icon name="mic" class="icon-bg" :class="{recording:isRecording}"></v-icon>
          </b-button>
        </b-row>
        <b-row>
          <b-form-textarea
            id="textarea"
            v-model="userInput"
            rows="3"
            no-resize
            plaintext
          >
          </b-form-textarea>
        </b-row>
        <b-button
          id="save-button"
          class="float-right mt-3"
          @click="toggleRecording"
        >
          İleri
        </b-button>
      </b-container>
    </div>

    <div class="message-area" v-show="!isVisible">
      <ul class="info-message">
        <li>
          Birazdan girişini yapacağınız cümleler 3'üncü aşama olan Test aşamasında size sorulacak.
        </li>
        <li class="underline">Eğer isterseniz testi cevaplarken bu cümlelere bakabileceksiniz.</li>
      </ul>
      <b-row align-h="center">
        <b-button @click="nextSection" class="mt-3 p-2 link-btn">Devam</b-button>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import recallSpeaking from '@/questions/recallSpeaking';
import recognitionSpeaking from '@/questions/recognitionSpeaking';

export default {
  name: 'SpeakingDemo',
  data() {
    return {
      isVisible: true,
      isRecording: false,
      userInput: '',
    };
  },
  methods: {
    convertToText() {
      this.isRecording = !this.isRecording;

      let SpeechRecognition = SpeechRecognition || webkitSpeechRecognition; // eslint-disable-line
      let SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList; // eslint-disable-line

      const game = this;

      const recognition = new SpeechRecognition();
      const speechRecognitionList = new SpeechGrammarList();

      recognition.grammars = speechRecognitionList;
      recognition.lang = 'tr-TR';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.start();

      recognition.onresult = function (event) {
        const speechResult = event.results[0][0].transcript.toLowerCase();
        game.userInput = speechResult;
      };

      recognition.onspeechend = function () {
        recognition.stop();
        game.isRecording = !game.isRecording;
        game.isDisabled = !game.isDisabled;
      };
      recognition.onerror = function () {
        recognition.stop();
        game.isRecording = !game.isRecording;
      };
    },
    toggleRecording() {
      this.isVisible = !this.isVisible;
    },
    nextSection() {
      const section = this.testName.split('-')[0];
      if (section === 'recall') {
        const questions = recallSpeaking;
        this.$router.push({ name: 'SpeakingTest', params: { questions } });
      } else if (section === 'recognition') {
        const questions = recognitionSpeaking;
        this.$router.push({ name: 'SpeakingTest', params: { questions } });
      }
    },
  },
  computed: {
    ...mapGetters({
      testName: 'user/getTestName',
    }),
  },
};
</script>

<style>

</style>
