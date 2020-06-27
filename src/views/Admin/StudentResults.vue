<template>
  <div>
    <ListeningReport
      :testResult="listeningResults"
      v-if="listeningResults">
    </ListeningReport>

    <SpeakingReport
      :testResult="speakingResults"
      v-if="speakingResults">
    </SpeakingReport>

    <NBackReport
      :testResult="nBackResults"
      v-if="nBackResults">
    </NBackReport>

    <FillInTheBlanksReport
      :testResult="fillInTheBlanksResults"
      v-if="fillInTheBlanksResults">
    </FillInTheBlanksReport>

    <MultipleChoiceReport
      :testResult="multipleChoiceResults"
      v-if="multipleChoiceResults">
    </MultipleChoiceReport>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FillInTheBlanksReport from '@/components/AdminReports/FillInTheBlanksReport.vue';
import ListeningReport from '@/components/AdminReports/ListeningReport.vue';
import MultipleChoiceReport from '@/components/AdminReports/MultipleChoiceReport.vue';
import NBackReport from '@/components/AdminReports/NBackReport.vue';
import SpeakingReport from '@/components/AdminReports/SpeakingReport.vue';

export default {
  name: 'StudentResults',
  components: {
    FillInTheBlanksReport,
    ListeningReport,
    MultipleChoiceReport,
    NBackReport,
    SpeakingReport,
  },
  data() {
    return {
      studentId: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters({
      testResults: 'admin/getTestResults',
    }),
    fillInTheBlanksResults() {
      return this.testResults.map((item) => ({
        ...item,
      })).filter((item) => item.studentname === this.studentId && item.testtype === 'FillInTheBlanks');
    },
    listeningResults() {
      return this.testResults.map((item) => ({
        ...item,
      })).filter((item) => item.studentname === this.studentId && item.testtype === 'Listening');
    },
    multipleChoiceResults() {
      return this.testResults.map((item) => ({
        ...item,
      })).filter((item) => item.studentname === this.studentId && item.testtype === 'MultipleChoice');
    },
    nBackResults() {
      return this.testResults.map((item) => ({
        ...item,
      })).filter((item) => item.studentname === this.studentId && item.testtype === 'NBack');
    },
    speakingResults() {
      return this.testResults.map((item) => ({
        ...item,
      })).filter((item) => item.studentname === this.studentId && item.testtype === 'Speaking');
    },
  },
};
</script>

<style>

</style>
