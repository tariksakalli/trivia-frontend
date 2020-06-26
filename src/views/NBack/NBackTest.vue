<template>
  <div>
    <div class="start-test" v-show="isStartVisible">
      <button @click="startGame" class="big-btn">{{ startGameType }} Geri İçin Seti Başlat</button>
    </div>

    <div class="questions" v-show="isGameVisible">
      <div id="number">
        <span class="num">{{ question }}</span>
      </div>
      <div class="repeat-area">
        <button id="repeat-button"></button>
      </div>
    </div>

    <div class="message-area" v-show="isFinishedVisible">
      <p>Dikkat testi sonra erdi.</p>
      <p>Şimdi rahatlayın ve son aşamaya geçmek için ileri butonuna tıklayın.</p>
      <b-row align-h="center">
        <b-button @click="nextSection" class="mt-3 p-2 link-btn">Devam</b-button>
      </b-row>
    </div>
  </div>
</template>

<script>
import questions from '@/questions/nBack';
import { mapGetters } from 'vuex';
import api from '@/api';

export default {
  name: 'NBackTest',
  data() {
    return {
      testType: 'NBack',
      questions,
      isStartVisible: true,
      isGameVisible: false,
      isFinishedVisible: false,
      gameIndex: 0,
      gameType: '',
      startGameType: '2',
      question: '',
      nBack: '',
      answers: [],
      startTime: new Date().getTime(),
      isResponse: false,
      answerDuration: 2000,
    };
  },
  methods: {
    startGame() {
      this.isStartVisible = false;
      this.isGameVisible = true;
      this.showSetQuestions(this.questions[this.gameIndex]);
    },
    showSetQuestions(setQuestions) {
      this.gameType = setQuestions.type;
      let setIndex = 0;
      const questionInterval = setInterval(() => {
        this.question = setQuestions.questionSet[setIndex];
        this.nBack = setQuestions.questionSet[setIndex - this.gameType];

        const repeatButton = document.getElementById('repeat-button');
        repeatButton.addEventListener('click', this.changeResponse);
        // document.body.addEventListener("click", this.changeResponse, true);

        const setData = {
          gameIndex: this.gameIndex + 1,
          letter: this.question,
          nback: this.nBack,
          response: null,
          duration: this.answerDuration,
          result: null,
        };

        if (!this.isResponse) {
          // student not clicked repeat button
          if (this.question !== this.nBack) {
            setData.response = 'no-R';
            setData.result = 'TRUE 2'; // correct
          } else if (this.question === this.nBack) {
            setData.response = 'no-R';
            setData.result = 'FALSE 2'; // should clicked
          }
        } else if (this.isResponse) {
          // student clicked repeat button
          if (this.question !== this.nBack) {
            setData.response = 'R';
            setData.result = 'FALSE 1'; // should not clicked
          } else if (this.question === this.nBack) {
            setData.response = 'R';
            setData.result = 'TRUE 1'; // correct
          }
        }
        this.logAnswer(setData);
        setIndex += 1;
        this.isResponse = false;
        if (setIndex === setQuestions.questionSet.length) {
          clearInterval(questionInterval);
          this.startGameType = this.startGameType === '2' ? '3' : '2';
          this.gameIndex += 1;
          this.question = '';
          this.addSetTimeToAnswers();
          this.isStartVisible = true;
          this.isGameVisible = false;
          if (this.gameIndex === this.questions.length) {
            this.addGameTimeToAnswers();
            this.isStartVisible = false;
            this.isGameVisible = false;
            this.isFinishedVisible = true;
          }
        }
      }, 2000); // if interval value changed update answerDuration in data() and logAnswer
    },
    changeResponse() {
      this.isResponse = true;
      this.answerDuration = new Date().getTime() - this.startTime;
    },
    logAnswer(data) {
      this.answers.push(data);
      this.answerDuration = 2000;
    },
    addSetTimeToAnswers() {
      const letter = 'Set Time (ms)';
      const duration = this.answers
        .filter((item) => item.gameIndex === this.gameIndex)
        .map((item) => item.duration)
        .reduce((acc, val) => acc + val);
      this.answers.push({
        letter,
        duration,
      });
    },
    addGameTimeToAnswers() {
      const answerTime = this.answers
        .filter((item) => item.letter === 'Set Time (ms)')
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
      }).catch((err) => {
        console.log(err);
      });
    },
    nextSection() {
      const section = this.testName.split('-')[0];
      if (section === 'recall') {
        this.$router.push({ name: 'FillInTheBlanksInfo' });
      } else if (section === 'recognition') {
        this.$router.push({ name: 'MultipleChoiceInfo' });
      }
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
  watch: {
    question() {
      setTimeout(() => {
        this.question = '';
      }, 500);
    },
  },
};
</script>

<style>

</style>
