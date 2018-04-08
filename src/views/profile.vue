<template>
  <section class="section">
    <nav class="navbar level container is-widescreen" role="navigation" aria-label="main navigation">
      <div class="navbar-brand level-left">
        <a href="https://xplex.me" target="_blank">xplex</a>
      </div>
      <div class="navbar-menu level-right">
        <i class="mdi mdi-power mdi-36px"></i>
        <i class="mdi mdi-menu mdi-36px"></i>
      </div>
    </nav>
    <div class="profile container is-widescreen">
      <div class="account-details level">
        <div class="level-left has-text-right-desktop">
          <img class="gravatar" src="https://www.gravatar.com/avatar/00000000000000000000000000000000?s=128">
        </div>
        <div class="level-right has-text-left-desktop">
          <div class="content">
            <p class="heading">{{ username }}</p>
            <p class="title has-text-grey">email@id</p>
            <button class="button is-link is-outlined">Change Password</button>
          </div>
        </div>
      </div>
      <!--
      <div class="app-settings">
        <h1 class="title has-text-weight-normal">App Settings</h1>
        <div class="field">
          <b-switch :value="true" type="is-success">Allow Notifications</b-switch>
        </div>
        <b-dropdown>
          <button class="button is-primary" slot="trigger">
              <span>Choose Theme...</span>
              <b-icon icon="menu-down"></b-icon>
          </button>
          <b-dropdown-item>Apathy</b-dropdown-item>
          <b-dropdown-item>Bliss</b-dropdown-item>
          <b-dropdown-item>Ecstasy</b-dropdown-item>
          <b-dropdown-item>Pacific</b-dropdown-item>
          <b-dropdown-item>Royale</b-dropdown-item>
          <b-dropdown-item>Swelter</b-dropdown-item>
        </b-dropdown>
      </div>
      -->
      <div class="stream-settings">
        <h1 class="title has-text-weight-normal">Stream Settings</h1>
        <div class="panel">
          <p class="panel-heading">
            Existing Stream Ingestions
          </p>
          <p v-for='(ingest, index) in ingestions' :key='index' class="panel-block">
            <span class="panel-icon">
              <i class="mdi" v-bind:class="mdiServiceIcon(ingest.srv)"></i>
            </span>
             {{ ingest.url }}
          </p>
        </div>
        <div class="field has-addons has-addons-centered">
          <p class="control">
            <a class="button is-static is-medium">New Stream</a>
          </p>
          <p class="control is-expanded">
            <input class="input is-medium" type="text" placeholder="Stream Ingestion URL">
          </p>
          <div class="control">
            <a class="button is-link is-medium">Add</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import API from '../api'
var api = new API()

export default {
  name: 'Profile',
  data: () => {
    return {
      username: localStorage.getItem('currentUser'),
      streamID: localStorage.getItem('streamID'),
      streamKey: localStorage.getItem('streamKey'),
      ingestions: JSON.parse(localStorage.getItem('ingestions'))
    }
  },
  methods: {
    mdiServiceIcon: (service) => {
      switch (service) {
        case 'YouTube':
          return 'mdi-youtube-gaming'
        case 'Twitch':
          return 'mdi-twitch'
        default:
          return 'mdi-link'
      }
    }
  },
  created: () => api.streamList().then((d1) => {
    localStorage.setItem('streamID', d1[0]['id'])
    localStorage.setItem('streamKey', d1[0]['streamKey'])

    api.streamDetail(localStorage.getItem('streamID')).then((d2) => {
      let destinations = []
      for (var i of d2.destinations) {
        destinations.push({
          srv: i.service,
          url: i.rtmpUrl
        })
      }
      localStorage.setItem('ingestions', JSON.stringify(destinations))
    })
  })
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
.profile {
  .gravatar {
    margin: 1rem auto;
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  }
  .level {
    justify-content: center;
    .level-left, .level-right {
      margin: auto 1rem;
    }
    .heading {
      font-size: 1rem;
      margin-bottom: 0;
    }
    .title {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    .button.is-link.is-outlined {
      color: #6b4e71;
      border-color: #6b4e71;
      &:hover, &:focus {
        color: #fff;
        border-color: #6b4e71;
        background-color: #6b4e71;
      }
      &:active {
        border-color: #1f252b;
        background-color: #1f252b;
      }
    }
  }
}
</style>
