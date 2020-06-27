<template>
  <div>
    <b-row class="text-left">
      <b-table  :items="testResult" dark stacked>
        <template v-slot:cell(answers)="data">
          <b-table :items="JSON.parse(data.item.answers)" dark>
          </b-table>
        </template>
      </b-table>
    </b-row>
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
};
</script>

<style>

</style>
