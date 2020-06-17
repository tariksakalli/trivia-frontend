<template>
  <div class="message-area">
    <b-container>
        <p>Merhaba,</p>

        <p>
          Doktora tezim için oluşturulmuş bu çalışmanın amacı
          teknolojinin öğrenme ve zihin üzerinde oluşturduğu yükü ve etkilerini ölçmektir.
        </p>

        <p>
          Çalışmam art arda gelen 3 adet görevden oluşmaktadır.
          Uygulamayı tek bir oturumda yapmanız gerekmektedir ve yaklaşık 30 - 40 dakika sürmektedir.
        </p>

        <p>
          Bu görevleri yaparken baştan sona ekran başında olmanız, dikkatinizi
          dağıtacak kişi ve etkenlerden uzak bir ortamda bulunmanız son derece önemlidir.
        </p>

        <p>
          Çalışmanın sağlığı açısından bu çalışmayla ilgili ayrıntıları
          lütfen başka kişilerle paylaşmayınız.
        </p>

        <p>
          Çalışma sonuçları sadece araştırma amaçlı kullanılacak,
          kişisel bilgileriniz herhangi bir ortamda yer almayacak ve paylaşılmayacaktır.
          Çalışmaya katılmayı kabul ediyorsanız aşağıdaki kabul ediyorum
          butonuna basarak başlayabilirsiniz.
        </p>

        <p>
          Katkılarınız için şimdiden çok teşekkür ederim.
        </p>
      <b-row align-h="center">
        <b-link
          to="/survey"
          class="float-right mt-3 p-3 link-btn"
        >
          Kabul Ediyorum
        </b-link>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Info',

};
</script>

<style>

</style>
