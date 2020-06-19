<template>
  <div class="message-area">
    <p>Bu çalışmada size 3 aşamalı bir uygulama vereceğim;</p>
    <ol>
      <li>Bilgi öğrenme</li>
      <li>Dikkat testi</li>
      <li>Bilgi testi</li>
    </ol>
    <p>Çalışmaya devam etmek ve detayları öğrenmek için devam butonuna tıklayın.</p>
    <b-row align-h="center">
      <b-button @click="nextSection" class="mt-3 p-2 link-btn">Devam</b-button>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TestInfo',
  methods: {
    nextSection() {
      const section = this.testName.split('-')[1];
      if (section === 'listening') {
        this.$router.push({ name: 'ListeningInfo' });
      } else if (section === 'speaking') {
        this.$router.push({ name: 'Dummy' });
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

<style scoped>
</style>
