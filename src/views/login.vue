<template>
  <section class="hero is-light is-fullheight">
    <div class="login container hero-body is-widescreen has-text-centered">
      <div class="column is-4 is-offset-4">
        <div class="box">
          <figure class="avatar">
            <img class="xplex-logo" src="/img/logo.png">
          </figure>
          <form @submit.prevent="login()">
            <div class="field">
              <div class="control has-icons-left">
                <input class="input is-large" v-model="username" type="text" placeholder="Username" autofocus="">
                <span class="icon is-left"><i class="mdi mdi-account"></i></span>
              </div>
            </div>
            <div class="field">
              <div class="control has-icons-left">
                <input class="input is-large" v-model="password" type="password" placeholder="Password">
                <span class="icon is-left"><i class="mdi mdi-key"></i></span>
              </div>
            </div>
            <button class="button is-block is-link is-large is-fullwidth" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import API from '../api'
var api = new API()

export default {
  name: 'Login',
  data: function () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      api.login(this.username, this.password)
        .then((d) => location.assign('/profile'))
        .catch((e) => this.$toast.open(e.message))
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  .xplex-logo {
    width: 128px;
    margin: 1rem auto 2rem;
  }
  .button.is-link {
    background-color: #6b4e71;
    &:hover, &:focus {
      background-color: #1f252b;
    }
    &:active {
      background-color: #222;
    }
  }
}
</style>
