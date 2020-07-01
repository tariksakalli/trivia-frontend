<template>
  <div class="m-4">
    <b-row>
      <b-button v-b-toggle.collapse-listeningTable>{{testResult[0].testtype}} Detay</b-button>
      <vue-excel-xlsx
        class="btn link-btn ml-3"
        :data="testAnswers"
        :columns="fields"
        :filename="excelFileName"
        sheetname="listening"
      >
        {{testResult[0].testtype}} Excel
      </vue-excel-xlsx>

    </b-row>
    <b-collapse id="collapse-listeningTable">
      <b-row class="text-left mt-2">
        <b-table :items="testResult" dark stacked>
          <template v-slot:cell(answers)="data">
            <b-table :fields="fields" :items="JSON.parse(data.item.answers)" dark>
            </b-table>
          </template>
        </b-table>
      </b-row>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: 'ListeningReport',
  props: {
    testResult: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        {
          key: 'questionNo', label: 'No', field: 'questionNo', dataFormat: this.questionNo,
        },
        { key: 'answer', label: 'Cevap', field: 'answer' },
        { key: 'playCount', label: 'Tekar', field: 'playCount' },
        { key: 'answerTime', label: 'Cevap Süresi', field: 'answerTime' },
        { key: 'audioDuration', label: 'Soru Süresi', field: 'audioDuration' },
      ],
    };
  },
  computed: {
    testAnswers() {
      return JSON.parse(this.testResult[0].answers);
    },
    excelFileName() {
      const { studentname, testtype, date } = this.testResult[0];
      return `${studentname} - ${testtype} - ${date.split('T')[0]}`;
    },
  },
  methods: {
    questionNo(value) {
      let no = value;
      no += 1;
      return no;
    },
  },
};
</script>

<style>

</style>
