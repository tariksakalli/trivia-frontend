<template>
  <div>
    <b-table :fields="fields" :items="filterResults" dark>
      <template v-slot:cell(answers)="data">
        <b-table :fields="answerFields" :items="JSON.parse(data.item.answers)" dark>
        </b-table>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'StudentResults',
  data() {
    return {
      studentId: this.$route.params.id,
      testAnswers: [],
      fields: [
        { key: 'idtests', label: 'ID' },
        { key: 'studentname', label: 'İsim' },
        { key: 'testname', label: 'Test' },
        { key: 'date', label: 'Tarih' },
        { key: 'totaltime', label: 'Süre' },
        { key: 'answers', label: 'Cevaplar' },
      ],
      answerFields: [
        { key: 'level', label: 'Seviye' },
        { key: 'answer', label: 'Cevap' },
        { key: 'duration', label: 'Süre' },
        { key: 'correctAnswer', label: 'Doğru Cevap' },
      ],
    };
  },
  computed: {
    ...mapGetters({
      testResults: 'admin/getTestResults',
    }),
    filterResults() {
      return this.testResults.map((item) => ({
        ...item,
      })).filter((item) => item.studentname === this.studentId);
    },
  },
};
</script>

<style>

</style>
