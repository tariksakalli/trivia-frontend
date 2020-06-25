<template>
  <div class="info-message">
      <p>{{messageText}}</p>
  </div>
</template>

<script>
export default {
  name: 'messageType',
  props: {
    messageType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      message: [
        'Birazdan girişini yapacağınız cümleler 3\'üncü aşama olan Test aşamasında size sorulacaktır. Eğer isterseniz testi cevaplarken bu cümlelere bakabileceksiniz.',
        'Birazdan girişini yapacağınız cümleler daha sonra SİLİNECEK ve 3\'üncü Test aşamasında size sorulacaktır.',
      ],
    };
  },
  computed: {
    messageText() {
      if (this.messageType === 'save') {
        return this.message[0];
      }
      if (this.messageType === 'delete') {
        return this.message[1];
      }
      return '';
    },
  },

};
</script>

<style>

</style>
