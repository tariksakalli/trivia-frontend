<template>
  <div class="questions">
    <div v-show="isVisible">
      <b-container>
        <p class="sentence" oncopy="return false;">{{ questions[counter].question }}</p>
        <b-form-input
          id="answer-input"
          v-model="answer"
          onpaste="return false;"
          autocomplete="off">
        </b-form-input>
        <b-row>
          <b-col>
            <b-form-radio
              class="my-3 mt-5"
              v-model="answer"
              name="noAnswer"
              value="Hatırlamıyorum"
            >Hatırlamıyorum</b-form-radio>
          </b-col>
          <b-col>
            <b-button
              class="float-right mt-3"
              v-bind:disabled="answer === ''"
              @click="showQuestion"
            >İleri</b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div v-show="!isVisible" class="message-area">
      <h3>Çalışma sona ermiştir.</h3>
      <h3>Katıldığınız için teşekkür ederim. :)</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '@/api';
import questions from '@/questions/fillInTheBlanks';

export default {
  name: 'FillInTheBlanksTest',
  data() {
    return {
      testType: 'FillInTheBlanks',
      questions,
      isVisible: true,
      counter: 0,
      answers: [],
      startTime: new Date().getTime(),
      answer: '',
    };
  },
  methods: {
    showQuestion() {
      if (this.counter < this.questions.length - 1) {
        this.addInputToAnswers();
        this.counter += 1;
      } else {
        this.addInputToAnswers();
        this.addTestTimeToAnswers();
        this.isVisible = !this.isVisible;
      }
    },
    addInputToAnswers() {
      const answer = document.getElementById('answer-input').value;
      const { correctAnswer } = this.questions[this.counter];
      const { level } = this.questions[this.counter];
      const duration = new Date().getTime() - this.startTime;
      this.answers.push({
        answer,
        correctAnswer,
        level,
        duration,
      });
      this.answer = '';
    },
    addTestTimeToAnswers() {
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

      api.postTestResult(testResult).then((result) => {
        console.log(result);
        api.postTestComplete({ testStatus: true, username: this.username }).then((statusResult) => {
          console.log(statusResult);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    nextSection() {
      this.$router.push('/section-end');
    },
  },
  beforeUpdate() {
    this.startTime = new Date().getTime();
  },
  computed: {
    ...mapGetters({
      username: 'user/getUsername',
      testName: 'user/getTestName',
    }),
  },
};
</script>

<style>

</style>
