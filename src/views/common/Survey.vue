<template>
  <div class="message-area">
    <div class="form-group mt-3 pb-3 survey-question">
      <label for="age" class="ml-3">Yaş</label>
      <div class="col-sm-3">
        <input type="number" class="form-control" id="age" v-model="user.age" required>
      </div>
    </div>

    <div class="form-group mt-3 pb-3 survey-question">
      <label for="gender" class="ml-3">Cinsiyet</label>
      <div class="col-sm-6">
        <b-form-radio-group id="gender" v-model="user.gender" name="radio-gender">
          <b-form-radio value="Erkek">Erkek</b-form-radio>
          <b-form-radio value="Kadın">Kadın</b-form-radio>
        </b-form-radio-group>
      </div>
    </div>

    <div class="form-group mt-3 pb-3 survey-question">
      <label for="department" class="ml-3">Devam etmekte olduğunuz bölüm</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" id="department" v-model="user.department">
      </div>
    </div>

    <div class="form-group mt-3 pb-3 survey-question">
      <label for="drugs" class="ml-3">
        Şu anda herhangi bir nörolojik / psikiyatrik ilaç kullanıyor musunuz?
      </label>
       <div class="col-sm-6">
        <b-form-radio-group id="drugs" v-model="user.drugs" name="radio-drugs">
          <b-form-radio value="1">Evet</b-form-radio>
          <b-form-radio value="0">Hayır</b-form-radio>
        </b-form-radio-group>
      </div>
    </div>

    <div class="form-group mt-3 pb-3 survey-question">
      <label for="attentionLevel" class="ml-3">Genel olarak dikkatiniz nasıldır?</label>
      <b-container>
        <b-row>
          <b-col class="col-sm-8">
            <b-form-input
              type="range"
              id="attentionLevel"
              v-model="user.attentionLevel"
              min="0"
              max="10"
              step="0.5"
            >
            </b-form-input>
          </b-col>
          <b-col>
            <p>{{user.attentionLevel}}</p>
          </b-col>
      </b-row>
      </b-container>
    </div>

    <div class="form-group mt-3 pb-3 survey-question">
      <label for="memoryLevel" class="ml-3">Genel olarak belleğiniz nasıldır?</label>
      <b-container>
        <b-row>
          <b-col class="col-sm-8">
            <b-form-input
              type="range"
              id="memoryLevel"
              v-model="user.memoryLevel"
              min="0"
              max="10"
              step="0.5"
            >
            </b-form-input>
          </b-col>
          <b-col>
            <p>{{user.memoryLevel}}</p>
          </b-col>
      </b-row>
      </b-container>
    </div>

    <div class="form-group mt-3 pb-3 survey-question">
      <label for="rememberLevel" class="ml-3">
        Birazdan size verilecek kısa cümleleri tahmini ne kadar iyi hatırlayacaksınız?
      </label>
      <b-container>
        <b-row>
          <b-col class="col-sm-8">
            <b-form-input
              type="range"
              id="rememberLevel"
              v-model="user.rememberLevel"
              min="0"
              max="10"
              step="0.5">
            </b-form-input>
          </b-col>
          <b-col>
            <p>{{user.rememberLevel}}</p>
          </b-col>
      </b-row>
      </b-container>
    </div>
    <b-row align-h="center">
      <b-button class="mt-3" @click="submitSurvey">Devam</b-button>
    </b-row>
    <div class="mt-3" v-if="error">
      <b-row align-h="center">
        <p>Lütfen tüm soruları cevaplayın.</p>
      </b-row>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import { mapGetters } from 'vuex';

export default {
  name: 'Survey',
  data() {
    return {
      user: {
        age: 0,
        gender: '',
        department: '',
        drugs: '',
        attentionLevel: 0,
        memoryLevel: 0,
        rememberLevel: 0,
        username: '',
      },
      error: null,
    };
  },
  methods: {
    submitSurvey() {
      this.user.username = this.userid;
      api.submitSurvey(this.user).then(() => {
        this.$router.push({ name: 'Warning' });
      }).catch((err) => {
        this.error = err.message;
      });
    },
    log() {
      console.log(this.user);
    },
  },
  computed: {
    ...mapGetters({
      userid: 'user/getUsername',
    }),
  },
  mounted() {
    this.user.username = this.userid;
  },
};
</script>

<style>

</style>
