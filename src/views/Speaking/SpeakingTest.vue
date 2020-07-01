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
      <p class="my-4 mx-auto save-message">
        <span class="blank-box"></span>
        {{messageText}}
      </p>
    </b-modal>
    <div class="questions" v-show="isVisible">
      <b-container fluid class="w-75">
        <h3 class="question-text">{{ questions[counter] }}</h3>
        <b-row>
          <b-button id="mic-button" class="mx-auto my-3" @click="convertToText">
            <v-icon name="mic" class="icon-bg" :class="{ recording:isRecording }"></v-icon>
          </b-button>
        </b-row>
        <b-row>
          <b-form-textarea
            id="textarea"
            v-model="userInput"
            rows="3"
            no-resize
            plaintext>
          </b-form-textarea>
        </b-row>
        <b-button
          id="save-button"
          class="float-right mt-3"
          @click="saveAnswer"
          :disabled="isDisabled"
        >İleri</b-button>
      </b-container>
      <div v-show="error">
        <p class="red">{{error}}</p>
      </div>
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
  name: 'SpeakingTest',
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      testType: 'Speaking',
      isVisible: true,
      counter: 0,
      answers: [],
      startTime: new Date().getTime(),
      saveMessageDuration: 3000,
      isRecording: false,
      isDisabled: true,
      userInput: '',
      modalMessage: [
        'Girmiş olduğunuz cümle TRIVIA BİLGİLER klasörüne KAYIT edilmiştir.',
        'Girmiş olduğun cümle bilgisayardan SİLİNMİŞTİR.',
      ],
      error: '',
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

      recognition.onresult = function recognitionOnResult(event) {
        const speechResult = event.results[0][0].transcript.toLowerCase();
        game.userInput = speechResult;
      };

      recognition.onspeechend = function recognitionOnSpeechEnd() {
        recognition.stop();
        game.isRecording = !game.isRecording;
        game.isDisabled = !game.isDisabled;
      };
      recognition.onerror = function recognitionOnError() {
        recognition.stop();
        game.isRecording = !game.isRecording;
      };

      const button = document.getElementById('save-button');
      button.disabled = !button.disabled;
    },
    saveAnswer() {
      this.isDisabled = true;
      this.userInput = '';
      if (this.counter < this.questions.length - 1) {
        this.addInputToAnswers();
      } else {
        this.addInputToAnswers();
        this.addTestTimetToAnswers();
        setTimeout(() => {
        }, this.saveMessageDuration + 500);
      }
    },
    addInputToAnswers() {
      this.showSaveMessage();
      const text = this.questions[this.counter];
      const answer = document.getElementById('textarea').value;
      const duration = new Date().getTime() - this.startTime - this.saveMessageDuration;
      this.answers.push({
        text,
        answer,
        duration,
      });
      this.startTime = new Date().getTime();
      document.getElementById('textarea').value = '';
      this.counter += 1;
    },
    addTestTimetToAnswers() {
      const answerTime = this.answers
        .map((item) => item.duration)
        .reduce((acc, val) => acc + val);

      this.postTestResult(answerTime);
    },
    postTestResult(answerTime) {
      const testResult = {
        username: this.username,
        testName: this.testName,
        testType: this.testType,
        date: new Date().toISOString().split('T')[0],
        totalTime: answerTime,
        answers: this.answers,
      };

      api.postTestResult(testResult).then(() => {
        this.isVisible = false;
      }).catch(() => {
        this.error = 'Bir hata oluştu. Lütfen tekrar deneyin';
        this.isDisabled = false;
      });
    },
    showSaveMessage() {
      this.$bvModal.show('modal-saveMessage');

      setTimeout(() => {
        this.$bvModal.hide('modal-saveMessage');
      }, this.saveMessageDuration);
    },
  },
  computed: {
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

<style>

</style>
