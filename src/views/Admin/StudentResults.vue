<template>
  <div>
    <b-table :items="filterResults" dark></b-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'StudentResults',
  data() {
    return {
      studentId: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters({
      testResults: 'admin/getTestResults',
    }),
    filterResults() {
      return this.testResults.map((item) => ({
        ...item,
      })).filter((item) => {
        console.log(item.answers);
        return item.studentname === this.studentId;
      });
    },
  },
};
</script>

<style>

</style>
