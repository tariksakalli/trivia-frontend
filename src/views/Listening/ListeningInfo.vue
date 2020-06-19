<template>
  <div class="message-area">
    <ul>
      <li>
        Birazdan ekranda Dinle
        <v-icon
          name="play"
          class="icon info-icon">
        </v-icon>
        Butonuna bastığında çeşitli cümleler dinleyeceksin.
      </li>
      <li>
        Dinleyeceğin her cümleyi ses kayıt
        <v-icon name="mic" class="icon info-icon"></v-icon>ikonuna basarak
        <span class="underline">sesli</span> olarak tekrar etmeni istiyorum.
      </li>
      <li>
        İkona bastığında rengi kırmızıya dönecek
        <v-icon name="mic" class="icon info-icon recording"></v-icon>, cümleyi
        <span class="underline">sesli</span> okumayı bitirince ikon otomatik olarak tekrar
        <span class="underline">beyaz</span> olacak.
      </li>
      <li>İLERİ butonuna tıklayınca bir sonraki cümleye geçeceksin.</li>
    </ul>
    <b-row align-h="center">
      <b-link to='/listening-demo' class="mt-3 p-2 link-btn">Devam</b-link>
    </b-row>
  </div>
</template>

<script>

export default {
  name: 'ListeningInfo',
};
</script>

<style scoped>

</style>
