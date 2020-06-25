<template>
  <div>
<b-modal
      id="modal-saveMessage"
      centered
      hide-footer
      hide-header
      no-close-on-backdrop
      body-bg-variant="dark"
      no-fade
      title="Trivia"
      size="lg"
    >
      <div class="message-box">
        <p class="my-4 mx-auto save-message">
          <span class="blank-box"></span>
          {{messageText}}
        </p>
      </div>
    </b-modal>
    <div class="questions" v-show="isVisible">
      <b-container class="w-75">
        <b-row align-h="center" class="mb-3">
          <audio id="player" :src="file"></audio>
          <b-button id="play-button" class="mx-auto btn-control" @click="playQuestion">
            <v-icon name="play" class="icon-bg"></v-icon>
          </b-button>
          <b-button id="mic-button" class="mx-auto btn-control" @click="convertToText">
            <v-icon name="mic" class="icon-bg" :class="{ recording:isRecording }"></v-icon>
          </b-button>
        </b-row>
        <b-form-input
          id="textarea"
          v-model="userInput"
          autocomplete="off"
          onpaste="return false;">
        </b-form-input>
        <b-button
          id="save-button"
          class="float-right mt-5"
          @click="saveAnswer"
          :disabled="isDisabled"
        >
          İleri
        </b-button>
      </b-container>
    </div>

    <div v-show="!isVisible" class="message-area">
      <p>Çalışmanın sonraki aşamasında bir dikkat testi ekrana gelecek.</p>
      <p>Önce dikkat testinin nasıl yapılacağını tarif edeceğim.</p>
      <p>
        Test başlayınca iki
        <span class="underline">örnek</span> gelecek ve hemen ardından
        <span class="underline">gerçek</span> test başlayacak.
      </p>
      <b-row align-h="center">
        <b-link to='/nback-info' class="mt-3 p-2 link-btn">Devam</b-link>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '@/api';

export default {
  name: 'ListeningTest',
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isVisible: true,
      counter: 0,
      file: this.questions[0],
      startTime: new Date().getTime(),
      answers: [],
      playCount: 0,
      isRecording: false,
      userInput: '',
      saveMessageDuration: 3000,
      isDisabled: true,
      modalMessage: [
        'Girmiş olduğunuz cümle TRIVIA BİLGİLER klasörüne KAYIT edilmiştir.',
        'Girmiş olduğun cümle bilgisayardan SİLİNMİŞTİR.',
      ],
    };
  },
  methods: {
    playQuestion() {
      const player = document.getElementById('player');
      const button = document.getElementById('play-button');
      this.startTime = (this.playCount === 0) ? new Date().getTime() : this.startTime;
      player.play();
      this.playCount += 1;
      player.addEventListener('play', () => {
        button.disabled = true;
      });
      player.addEventListener('ended', () => {
        button.disabled = false;
      });
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
        game.isDisabled = false;
      };
      recognition.onerror = function () {
        recognition.stop();
        game.isRecording = !game.isRecording;
        game.isDisabled = true;
      };
    },
    saveAnswer() {
      this.isDisabled = true;
      this.isRecording = false;

      const player = document.getElementById('player');
      player.pause();
      const button = document.getElementById('play-button');
      this.userInput = '';
      button.disabled = false;
      this.addInputToAnswers(player.duration);
      if (this.counter < this.questions.length - 1) {
        this.counter += 1;
        this.file = this.questions[this.counter];
      } else {
        button.disabled = true;
        this.addTestTimetToAnswers();
        this.isVisible = !this.isVisible;
      }
    },
    addInputToAnswers(playDuration) {
      this.showSaveMessage();
      const questionNo = this.counter;
      const answer = document.getElementById('textarea').value;
      const audioDuration = playDuration * 1000;
      const { playCount } = this;
      const answerTime = new Date().getTime() - this.startTime;
      this.answers.push({
        questionNo,
        answer,
        audioDuration,
        playCount,
        answerTime,
      });
      this.playCount = 0;
      document.getElementById('textarea').value = '';
    },
    addTestTimetToAnswers() {
      const answerTime = this.answers
        .map((item) => item.answerTime)
        .reduce((acc, val) => acc + val);

      this.postTestResult(answerTime);
    },
    postTestResult(answerTime) {
      const testResult = {
        username: this.username,
        testName: this.testName,
        date: new Date().toISOString().split('T')[0],
        totalTime: answerTime,
        answers: this.answers,
      };

      api.postTestResult(testResult).then((result) => {
        console.log(result);
      }).catch((err) => {
        console.log(err);
      });
    },
    showSaveMessage() {
      this.$bvModal.show('modal-saveMessage');

      setTimeout(() => {
        this.$bvModal.hide('modal-saveMessage');
      }, this.saveMessageDuration);
    },
    nextSection() {
      this.$router.push({ name: 'Dummy' });
    },
  },
  computed: {
    // ...mapGetters(['getUsername']),
    ...mapGetters({
      username: 'user/getUsername',
      testName: 'user/getTestName',
      messageType: 'user/getMessageType',
    }),
    messageText() {
      if (this.messageType === 'save') {
        return this.modalMessage[0];
      }
      if (this.messageType === 'delete') {
        return this.modalMessage[1];
      }
      return '';
    },
  },
};
</script>

<style scoped>

</style>
