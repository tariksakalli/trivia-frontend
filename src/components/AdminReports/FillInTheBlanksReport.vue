<template>
  <div>
    <b-table :items="testResult" dark stacked>
      <template v-slot:cell(answers)="data">
        <b-table :items="JSON.parse(data.item.answers)" dark>
        </b-table>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'FillInTheBlanksReport',
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
