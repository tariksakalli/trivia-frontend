<template>
  <div class="message-area">
    <ul>
      <li>Birazdan ekranda tek tek cümleler göreceksin.</li>
      <li>
        Gördüğün cümleleri beyaz
        <v-icon name="mic" class="icon info-icon"></v-icon>
        ikonuna basarak sesli tekrar etmeni istiyorum.
      </li>
      <li>
        İkona bastığında rengi kırmızıya dönecek
        <v-icon name="mic" class="icon info-icon recording"></v-icon>
        , cümleyi sesli okumayı bitirince ikon otomatik olarak beyaz olacak.
      </li>
      <li>İLERİ butonuna tıklayınca bir sonraki cümleye geçeceksin.</li>
    </ul>
    <b-row align-h="center">
      <b-link to='/speaking-demo' class="mt-3 p-2 link-btn">Devam</b-link>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'SpeakingInfo',
};
</script>

<style>

</style>
