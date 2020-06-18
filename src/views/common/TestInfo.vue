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
      <b-link to='/recall-listening-info' class="mt-3 p-2 link-btn">Devam</b-link>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'TestInfo',
};
</script>

<style scoped>
</style>
