<template>
  <section class="section">
    <nav class="navbar level container is-widescreen" role="navigation" aria-label="main navigation">
      <div class="navbar-brand level-left">
        <a href="https://xplex.me" target="_blank">xplex</a>
      </div>
      <div class="navbar-menu level-right">
        <i class="mdi mdi-menu mdi-36px"></i>
      </div>
    </nav>
    <div class="main container is-widescreen">
      <img class="xplex-logo" src="/img/logo.png">
      <h1>Welcome to xplex dashboard!</h1>
      <a class="button is-link is-rounded is-large">
        <span>Come on in</span>
        <span class="icon">
          <i class="mdi mdi-arrow-right mdi-24px"></i>
        </span>
      </a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
nav {
  .navbar-brand {
    font-size: 2rem;
    a {
      color: #6b4e71;
      text-decoration: none;
      font-weight: bold;
      font-family: "Unica One", sans-serif;
      &:hover, &:focus {
        color: #1f252b;
      }
      &:active {
        color: #222;
      }
    }
  }
}
.main {
  .xplex-logo {
    width: 192px;
    margin: 1rem;
  }
  h1 {
    font-size: 2rem;
    margin: 1rem auto;
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
