<template>
  <div class="message-area">
    <ul>
      <li>
        Birazdan çalışmanın ilk aşamasında size verilen bilgiler
        ile birebir aynı olan seçeneği işaretlemenizi istiyorum.
      </li>
      <li>
        Hiç hatırlayamadığınız cümleler için lütfen
        <strong>«hatırlamıyorum»</strong> seçeneğine tıklayın.
      </li>
      <li>Şimdi rahatlayın</li>
    </ul>
    <b-row align-h="center">
      <b-link to='/multiplechoice-test' class="mt-3 p-2 link-btn">Devam</b-link>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'MultipleChoiceInfo',
};
</script>

<style>

</style>
