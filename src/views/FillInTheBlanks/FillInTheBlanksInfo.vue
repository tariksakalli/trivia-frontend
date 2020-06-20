<template>
  <div class="message-area">
    <ul>
      <li>
        Birazdan birinci aşamada verilen cümleler içerisindeki
        bazı bilgiler eksik bırakılarak tekrar verilecek.
      </li>
      <li>
        Bu eksik bilgileri yine büyük/küçük harf ve noktalama işaretlerine
        dikkat etmenize gerek olmadan kutucuklara yazmanızı istiyorum.
      </li>
      <li>
        Örnek: ___________ kuyruğu yoktur.
        <div class="example-text">
          <b-form-input disabled value="Şempanzelerin"></b-form-input>
        </div>
      </li>
    </ul>
    <b-row align-h="center">
      <b-link to='/fillintheblanks-demo' class="mt-3 p-2 link-btn">Devam</b-link>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'FillInTheBlanksInfo',
};
</script>

<style>

</style>
