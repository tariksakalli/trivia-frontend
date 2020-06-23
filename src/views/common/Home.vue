<template>
  <div class="login p-3">
    <b-container>
      <b-row align-h="center">
        <h3>Devam etmek için kullanıcı adı ve şifrenizi girin</h3>
      </b-row>
      <b-row align-h="center">
        <div class="form-group mt-3">
          <label for="username">Kullanıcı Adı</label>
          <div>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="formLogin.username"
            >
          </div>
        </div>
      </b-row>
      <b-row align-h="center">
        <div class="form-group ">
          <label for="password">Şifre</label>
          <div>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="formLogin.password"
            >
          </div>
        </div>
      </b-row>
      <b-row align-h="center">
        <b-button @click="login" size="lg">Giriş</b-button>
      </b-row>
    </b-container>
    <div class="mt-3" v-if="error">
      <b-row align-h="center">
        <p>Hatalı kullanıcı adı / şifre.</p>
      </b-row>
    </div>
  </div>
</template>

<script>

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
    login(evt) {
      evt.preventDefault();
      this.$store.dispatch('user/login', this.formLogin)
        .then(() => {
          if (this.formLogin.username === 'user999') {
            this.$router.push({ name: 'AdminMenu' });
          } else {
            this.$router.push({ name: 'Info' });
          }
        }).catch((err) => {
          this.error = err.message;
        });
    },
  },
};
</script>
