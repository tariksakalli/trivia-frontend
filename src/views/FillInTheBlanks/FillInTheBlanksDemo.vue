<template>
  <div class="question-area">
    <h1 class="warning-message">DİKKAT: Aşağıdaki cümle örnektir.</h1>
    <b-container>
      <p class="sentence">_____ kuyruğu yoktur</p>
      <b-form-input id="answer-input" v-model="answer" autocomplete="off"></b-form-input>
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
          <b-link
            to="/fillintheblanks-test"
            class="float-right mt-3 link-btn"
            v-bind:disabled="answer === ''"
          >
            Kaydet
          </b-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'FillInTheBlanksDemo',
  data() {
    return {
      answer: '',
    };
  },
};
</script>

<style>

</style>
