<template>
  <div>
    <b-form-group label="Test Durumu">
      <b-form-radio-group
        id="radio-group-test-status"
        v-model="testStatus"
        :options="testStatusOptions"
        name="radio-test-status"
      >
      </b-form-radio-group>
    </b-form-group>

    <vue-excel-xlsx
      class="float-left btn link-btn "
      :data="filteredStudents"
      :columns="fields"
      :filename="excelFileName"
      :sheetname="excelFileName"
    >
      Excel'e Aktar
    </vue-excel-xlsx>

    <b-table :fields="fields" :items="filteredStudents" dark>
      <template v-slot:cell(name)="data">
        <router-link :to="{name: 'StudentResults', params: {id: data.value} }">
          {{data.value}}
        </router-link>
      </template>
      <template v-slot:cell(tests_completed)="data">
        {{booleanToText(data.value)}}
      </template>
      <template v-slot:cell(drugs)="data">
        {{booleanToText(data.value)}}
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'StudentsList',
  data() {
    return {
      testStatus: 'all',
      testStatusOptions: [
        { text: 'Tümü', value: 'all' },
        { text: 'Tamamlandı', value: 'done' },
        { text: 'Yapılmadı', value: 'notDone' },
      ],
      // b-table uses label, excel-xlsx uses field & dataFormat
      fields: [
        { key: 'idstudents', label: 'ID', field: 'idstudents' },
        { key: 'name', label: 'İsim', field: 'name' },
        { key: 'test', label: 'Test', field: 'test' },
        { key: 'message_type', label: 'K/S', field: 'message_type' },
        {
          key: 'tests_completed', label: 'Bitti', field: 'tests_completed', dataFormat: this.booleanToText,
        },
        { key: 'age', label: 'Yaş', field: 'age' },
        { key: 'gender', label: 'Cinsiyet', field: 'gender' },
        { key: 'department', label: 'Bölüm', field: 'department' },
        {
          key: 'drugs', label: 'İlaç', field: 'drugs', dataFormat: this.booleanToText,
        },
        { key: 'attention_level', label: 'Dikkat', field: 'attention_level' },
        { key: 'memory_level', label: 'Hafıza', field: 'memory_level' },
        { key: 'remember_level', label: 'Hatırlama', field: 'remember_level' },
      ],
    };
  },
  computed: {
    ...mapGetters({
      students: 'admin/getStudentsList',
    }),
    filteredStudents() {
      if (this.testStatus === 'done') {
        return this.students.map((item) => ({
          ...item,
        })).filter((item) => item.tests_completed === 1);
      }

      if (this.testStatus === 'notDone') {
        return this.students.map((item) => ({
          ...item,
        })).filter((item) => item.tests_completed === null);
      }

      return this.students;
    },
    excelFileName() {
      return `Öğrenci Listesi ${this.testStatus}`;
    },
  },
  methods: {
    booleanToText(value) {
      if (value === 0) {
        return 'Hayır';
      }
      if (value === 1) {
        return 'Evet';
      }
      return value;
    },
  },
};
</script>

<style>

</style>
