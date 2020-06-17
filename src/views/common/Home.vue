<template>
  <div class="login p-3">
    <b-container>
      <b-row align-h="center">
        <h3>Giriş için kullanıcı adı ve şifrenizi girin</h3>
      </b-row>
      <div class="form-group mt-3">
        <label for="username" class="ml-3">Kullanıcı Adı</label>
        <div class="col-sm-4">
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="formLogin.username"
          >
        </div>
      </div>
      <div class="form-group mt-3">
        <label for="password" class="ml-3">Şifre</label>
        <div class="col-sm-4">
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="formLogin.password"
          >
        </div>
      </div>
      <b-button @click="login">Giriş</b-button>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      formLogin: {
        username: '',
        password: '',
      },
      error: null,
    };
  },
  methods: {
    login() {
      // evt.preventDefault();
      this.$store.dispatch('user/login', this.formLogin)
        .then(() => {
          this.$router.push({ name: 'Info' });
        }).catch((err) => {
          this.error = err.message;
        });
    },
  },
};
</script>
