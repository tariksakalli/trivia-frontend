<template>
  <div class="message-area">
    <h1>Uyarı</h1>
    <ul class="mt-4">
      <li>Uygulama sadece Google Chrome tarayıcısında çalışmaktadır.</li>
      <li>
        İlk bölümdeki soruları cevaplayabilmek için mikrofon erişimine izin verilmesi gerekmektedir.
      </li>
    </ul>
    <b-row align-h="center">
      <b-link to='/test-info' class="mt-3 p-2 link-btn">Devam</b-link>
    </b-row>
  </div>
</template>

<script>

export default {
  name: 'Warning',
};
</script>

<style>

</style>
