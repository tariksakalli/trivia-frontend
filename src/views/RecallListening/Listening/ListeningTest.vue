<template>
  <div>
    <ListeningTestMain
    :questions="questions"
    section="recall-listening">
    </ListeningTestMain>
  </div>

</template>

<script>
import ListeningTestMain from '@/components/Listening/ListeningTestMain.vue';
import questions from '@/questions/recallListening';

export default {
  name: 'RecallListeningTest',
  components: {
    ListeningTestMain,
  },
  data() {
    return {
      questions,
    };
  },

};
</script>

<style scoped>

</style>
