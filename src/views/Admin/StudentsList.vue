<template>
  <div>
    <b-table :fields="fields" :items="students" dark>
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
      fields: [
        { key: 'idstudents', label: 'ID' },
        { key: 'name', label: 'İsim' },
        { key: 'test', label: 'Test' },
        { key: 'message_type', label: 'K/S' },
        { key: 'tests_completed', label: 'Bitti' },
        { key: 'age', label: 'Yaş' },
        { key: 'gender', label: 'Cinsiyet' },
        { key: 'department', label: 'Bölüm' },
        { key: 'drugs', label: 'İlaç' },
        { key: 'attention_level', label: 'Dikkat' },
        { key: 'memory_level', label: 'Hafıza' },
        { key: 'remember_level', label: 'Hatırlama' },
      ],
    };
  },
  computed: {
    ...mapGetters({
      students: 'admin/getStudentsList',
    }),
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
