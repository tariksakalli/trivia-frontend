<template>
  <div>
    <ListeningReport
      :testResult="testResult('Listening')"
    >
    </ListeningReport>

    <SpeakingReport
      :testResult="testResult('Speaking')"
    >
    </SpeakingReport>

    <NBackReport
      :testResult="testResult('NBack')"
    >
    </NBackReport>

    <FillInTheBlanksReport
      :testResult="testResult('FillInTheBlanks')"
    >
    </FillInTheBlanksReport>

    <MultipleChoiceReport
      :testResult="testResult('MultipleChoice')"
    >
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
  methods: {
    testResult(testName) {
      return this.testResults.map((item) => ({
        ...item,
      })).filter((item) => item.studentname === this.studentId && item.testtype === testName);
    },
  },
  computed: {
    ...mapGetters({
      testResults: 'admin/getTestResults',
    }),
  },

};
</script>

<style>

</style>
