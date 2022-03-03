<template>
  <div id="app">

    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      Silent Chat
      <mu-menu slot="right">
        <mu-button flat>MENU</mu-button>
        <mu-list slot="content">
          <mu-list-item button>
            <mu-list-item-content>
              <mu-list-item-title>Under Construction</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button @click="about">
            <mu-list-item-content>
              <mu-list-item-title>About</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-appbar>
    <silent-chat></silent-chat>


    <mu-dialog title="Abount" width="80%" :open.sync="showAbout">
      <p>
        Silent chat is a encryption tool when you need to encrypt your message communication via IM!
      </p>

      <p>
        It's based on AES encryption algorithm , the security level is based on your password length and complex.
      </p>
      <p>
        The password must 4*N length.

      </p>
      <p>
        the source code : <a herf="https://github.com/planck-david/silent-chat" target="_blank">silent-chat github 仓库</a>

      </p>
      <mu-button slot="actions" flat color="primary" @click="showAbout=false">Close</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
  import SilentChat from './components/SilentChat'

  export default {
    name: 'App',
    components: {
      SilentChat
    },
    data() {
      return {
        showAbout: false
      }
    },
    methods: {
      about() {
        this.showAbout = true
      }
    }
  }
</script>

<style>

</style>
