<template>
  <div>
    <div class="start-test" v-show="isStartVisible">
      <button @click="startGame" class="big-btn">{{ buttonText }}</button>
    </div>

    <div class="questions" v-show="isGameVisible">
      <div id="number">
        <span class="num">{{ question }}</span>
      </div>
      <div class="repeat-area">
        <button class="big-btn" @click="logAnswer">TEKRAR</button>
      </div>
    </div>

    <div class="message-area" v-show="isFinishedVisible">
      <p>Örnek test sona erdi, gerçek testi başlatmak için Devam'a tıklayın.</p>
      <b-link to="/nback-test" class="float-right mt-3 link-btn">Devam</b-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NBackDemo',
  data() {
    return {
      questions: [
        {
          questionSet: ['B', 'F', 'T', 'F'],
          type: '2 Geri',
        },
        {
          questionSet: ['R', 'C', 'G', 'R'],
          type: '3 Geri',
        },
      ],
      question: '',
      gameType: '',
      gameIndex: 0,
      isStartVisible: true,
      isGameVisible: false,
      isFinishedVisible: false,
      buttonText: '2 Geri İçin Seti Başlat',
    };
  },
  methods: {
    startGame() {
      this.isStartVisible = false;
      this.isGameVisible = true;
      this.showSetQuestions(this.questions[this.gameIndex]);
    },
    showSetQuestions(setQuestions) {
      let setIndex = 0;
      this.gameType = setQuestions.type;
      const questionInterval = setInterval(() => {
        this.question = setQuestions.questionSet[setIndex];
        setIndex += 1;
        if (setIndex === setQuestions.questionSet.length) {
          clearInterval(questionInterval);
          this.gameIndex += 1;
          this.question = '';
          this.isStartVisible = true;
          this.isGameVisible = false;
          if (this.gameIndex === this.questions.length) {
            this.isStartVisible = false;
            this.isGameVisible = false;
            this.isFinishedVisible = true;
          }
        }
      }, 2000);
      this.buttonText = '3 Geri İçin Seti Başlat';
    },
    logAnswer() {},
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
