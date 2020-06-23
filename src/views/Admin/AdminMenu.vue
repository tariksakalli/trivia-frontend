<template>
  <div>
    <div class="admin-menu">
      <router-link :to="{name: 'StudentsList'}">Öğrenci Listesi</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AdminMenu',
  created() {
    this.$store.dispatch('admin/getStudents');
    this.$store.dispatch('admin/getTestResults');
  },
};
</script>

<style>

</style>
