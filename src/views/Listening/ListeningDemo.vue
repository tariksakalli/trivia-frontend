<template>
  <div>
    <div class="question-area" v-show="isVisible">
      <b-container fluid>
        <h1 class="warning-message">DİKKAT: Aşağıdaki cümle örnektir.</h1>
        <b-row>
          <audio id="player" src="audioFiles/ornek.mp3"></audio>
        </b-row>
        <b-row align-h="center" class="my-3">
          <b-button id="play-button" class="mx-auto btn-control" @click="playQuestion">
            <v-icon name="play" class="icon-bg"></v-icon>
          </b-button>
          <b-button id="mic-button" class="mx-auto btn-control" @click="convertToText">
            <v-icon name="mic" class="icon-bg" :class="{recording:isRecording}"></v-icon>
          </b-button>
        </b-row>
        <p class="info-text mb-0">
          *Lütfen yukarıdaki Dinle butonuna tıklayarak cümleyi dinleyin.
          Ses kaydını birden fazla kere dinleyebilirsin.
          Dinlediğin cümleleri ses kayıt ikonuna tıklayıp sesli olarak tekrar etmelisin,
          istersen ikona basıp tekrar deneyebilirsin.
        </p>
        <b-button class="float-right mt-3" @click="toggleVisible">İleri</b-button>
      </b-container>
    </div>

    <div class="message-area" v-show="!isVisible">
      <MessageType :messageType="messageType"></MessageType>
      <b-row align-h="center">
        <b-button @click="nextSection" class="mt-3 p-2 link-btn">Devam</b-button>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import recallListening from '@/questions/recallListening';
import recognitionListening from '@/questions/recognitionListening';
import MessageType from '@/components/Common/MessageType.vue';

export default {
  name: 'ListeningDemo',
  components: {
    MessageType,
  },
  data() {
    return {
      isVisible: true,
      isRecording: false,
    };
  },
  methods: {
    toggleVisible() {
      this.isVisible = !this.isVisible;
    },
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
    playQuestion() {
      const player = document.getElementById('player');
      const button = document.getElementById('play-button');
      player.play();
      player.addEventListener('play', () => {
        button.disabled = true;
      });
      player.addEventListener('ended', () => {
        button.disabled = false;
      });
    },
    nextSection() {
      const section = this.testName.split('-')[0];
      if (section === 'recall') {
        const questions = recallListening;
        this.$router.push({ name: 'ListeningTest', params: { questions } });
      } else if (section === 'recognition') {
        const questions = recognitionListening;
        this.$router.push({ name: 'ListeningTest', params: { questions } });
      }
    },
  },
  computed: {
    ...mapGetters({
      testName: 'user/getTestName',
      messageType: 'user/getMessageType',
    }),
  },
};
</script>

<style scoped>

</style>
