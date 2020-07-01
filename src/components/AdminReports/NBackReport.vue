<template>
  <div class="m-4">
    <b-row>
      <b-button v-b-toggle.collapse-nbackTable>{{testResult[0].testtype}} Detay</b-button>
      <vue-excel-xlsx
        class="btn link-btn ml-3"
        :data="testAnswers"
        :columns="fields"
        :filename="excelFileName"
        sheetname="nback"
      >
        {{testResult[0].testtype}} Excel
      </vue-excel-xlsx>

    </b-row>
    <b-collapse id="collapse-nbackTable">
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
  name: 'NBackReport',
  props: {
    testResult: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        { key: 'gameIndex', label: 'No', field: 'gameIndex' },
        { key: 'letter', label: 'Cevap', field: 'letter' },
        { key: 'nback', label: 'NBack', field: 'nback' },
        { key: 'result', label: 'Sonuç', field: 'result' },
        { key: 'duration', label: 'Cevap Süresi', field: 'duration' },
        { key: 'response', label: 'Cevap', field: 'response' },
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
};
</script>

<style>

</style>
