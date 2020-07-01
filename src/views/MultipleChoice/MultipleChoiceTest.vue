<template>
  <div>
    <div class="questions" v-show="isVisible">
      <p class="sentence">{{ questions[counter].questionText }}</p>
      <b-form-radio
        v-model="selected"
        name="quiz-options"
        value="A"
        class="quiz-option"
      >{{ questions[counter].optionA }}</b-form-radio>
      <b-form-radio
        v-model="selected"
        name="quiz-options"
        value="B"
        class="quiz-option"
      >{{ questions[counter].optionB }}</b-form-radio>
      <b-form-radio
        v-model="selected"
        name="quiz-options"
        value="C"
        class="quiz-option"
      >{{ questions[counter].optionC }}</b-form-radio>
      <b-form-radio
        v-model="selected"
        name="quiz-options"
        value="D"
        class="quiz-option"
      >{{ questions[counter].optionD }}</b-form-radio>
      <b-form-radio
        v-model="selected"
        name="quiz-options"
        value="E"
        class="quiz-option"
      >{{ questions[counter].optionE }}</b-form-radio>
      <b-button
        class="float-right mt-3"
        v-bind:disabled="selected === ''"
        @click="showQuestion"
      >İleri</b-button>

      <div v-show="error">
        <p class="red">{{error}}</p>
      </div>
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
import questions from '@/questions/multipleChoice';

export default {
  name: 'MultipleChoiceTest',
  data() {
    return {
      testType: 'MultipleChoice',
      questions,
      isVisible: true,
      counter: 0,
      selected: '',
      answers: [],
      startTime: new Date().getTime(),
      error: '',
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
      }
    },
    addInputToAnswers() {
      const answer = this.selected;
      const { correctAnswer } = this.questions[this.counter];
      const { level } = this.questions[this.counter];
      const result = answer === correctAnswer ? 'DOĞRU' : 'YANLIŞ';
      const duration = new Date().getTime() - this.startTime;
      this.answers.push({
        answer,
        correctAnswer,
        level,
        result,
        duration,
      });
      this.selected = '';
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

      api.postTestResult(testResult).then(() => {
        this.isVisible = false;
        api.postTestComplete({ testStatus: true, username: this.username }).then(() => {
          this.isVisible = false;
        }).catch(() => {
          this.error = 'Bir hata oluştu. Lütfen tekrar deneyin';
          this.isDisabled = false;
        });
      }).catch(() => {
        this.error = 'Bir hata oluştu. Lütfen tekrar deneyin';
        this.isDisabled = false;
      });
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
