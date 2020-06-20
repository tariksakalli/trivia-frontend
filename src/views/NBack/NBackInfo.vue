<template>
  <div class="message-area">
    Her test içinde bir grup harf ekranda
    <span class="underline">tek tek</span> belirecek.
    2 GERİ aşamasında bir harfin aynısı kendisinden 2 önce gelmişse ya da
    3 GERİ aşamasında 3 harf önce gelmişse bilgisayar faresinin tuşuna
    <span
      class="underline"
    >tıklamanı</span> istiyorum.
    Örnek olarak aşağıdaki harflerin ekrana
    <span class="underline">tek tek</span> geldiğini düşün:
    <div class="img-area">
      <img src="@/assets/nbackexample.jpg" alt="nback example" class="info-img my-3" />
    </div>
    <b-row align-h="center">
      <b-link to="/nback-demo" class="mt-3 p-2 link-btn">Devam</b-link>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'NBackInfo',
};
</script>

<style>

</style>
