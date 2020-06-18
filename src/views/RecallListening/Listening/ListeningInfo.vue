<template>
  <div class="message-area">
    <RecallListeningTestInfo></RecallListeningTestInfo>
    <b-row align-h="center">
      <b-link to='/recall-listening-demo' class="mt-3 p-2 link-btn">Devam</b-link>
    </b-row>
  </div>
</template>

<script>
import RecallListeningTestInfo from '@/components/Listening/ListeningTestInfo.vue';

export default {
  name: 'RecallListeningInfo',
  components: {
    RecallListeningTestInfo,
  },
};
</script>

<style scoped>

</style>
