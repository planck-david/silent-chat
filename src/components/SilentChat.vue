<template>
  <div>

    <alert-dialog ref="alertDialog"></alert-dialog>

    <mu-container class="demo-container is-stripe">
      <mu-row>
        <mu-col span="12">
          <mu-text-field v-model="nickName" label="昵称" label-float @change="nickNameChange"></mu-text-field>
        </mu-col>
      </mu-row>

      <mu-row>
        <mu-col span="12">
          <mu-text-field v-model="aesKey" label="加密KEY" label-float></mu-text-field>
          <mu-button @click="randomMakeAESKey" small color="primary">{{$t('randomGenTxt')}}</mu-button>
          <mu-button @click="saveAESKey" small color="primary">Save</mu-button>


        </mu-col>
      </mu-row>

      <mu-row>
        <mu-col span="8">
          <mu-text-field v-model="word" multi-line :rows="4" :maxrows="4"
                         full-width placeholder="请输入需要加密的内容"></mu-text-field>
        </mu-col>
        <mu-col span="4">
          <mu-button color="primary" @click="doSend" small>发送</mu-button>
          <br/> <br/>
          <mu-button @click="clearWord" small>{{$t('clearTxt')}}</mu-button>
        </mu-col>
      </mu-row>


      <mu-row>
        <mu-col span="8">
          <mu-text-field v-model="chatInfo" multi-line :rows="4" :maxrows="4"
                         full-width placeholder="请输入需要解密的内容"></mu-text-field>
        </mu-col>
        <mu-col span="4">
          <mu-button color="success" @click="doDecrypt" small>解密并接收</mu-button>
          <br/> <br/>
          <mu-button @click="clearChatInfo" small>{{$t('clearTxt')}}</mu-button>
        </mu-col>
      </mu-row>


      <div style="overflow-y: auto;">
        <mu-row>
          <mu-col span="12">
            <mu-button @click="clear" small color="warning">{{$t('clearMsgTxt')}}</mu-button>
            <message-list ref="messageList"></message-list>
          </mu-col>
        </mu-row>
      </div>


    </mu-container>

  </div>
</template>

<script>
  import encryption from '../libs/encryption'
  import MessageList from './MessageList'
  import AlertDialog from './AlertDialog'
  import Message from 'muse-ui-message';
  import 'muse-ui-message/dist/muse-ui-message.css';
  import Vue from 'vue'
  import Toast from 'muse-ui-toast';

  Vue.use(Toast);
  Vue.use(Message);

  const CryptoJS = require("crypto-js");

  export default {
    name: "SilentChat",
    components: {AlertDialog, MessageList},
    data() {
      return {
        aesKey: '',
        word: '',
        nickName: '',
        chatInfo: '',
        keyMap: {}
      }
    },
    mounted() {
      let aesKey = localStorage.getItem('aesKey');
      let nickName = localStorage.getItem('nickName');
      if (aesKey !== null && aesKey !== undefined && aesKey != '') {
        this.aesKey = aesKey;
      }
      if (nickName != null && nickName != '') {
        this.nickName = nickName;
      }
    },
    methods: {
      doSend() {
        if (this.aesKey == null || this.aesKey.length < 1) {
          Toast.error('请输入秘钥key');
          return;
        }
        if (this.word == null || this.word.length < 1) {
          Toast.error('请输入文本内容');
          return;
        }

        let encryptMsg = encryption.encryptByAES(this.word, this.getAESKey());
        this.$refs.messageList.appendMessage({userType: 1, content: this.word})

        let alertInfo = encryptMsg;
        let nickName = this.nickName;
        if (nickName != '') {
          alertInfo = nickName + " :" + encryptMsg;
        }
        this.$refs.alertDialog.showMessage({"title": "请复制以下并通过IM发送", content: alertInfo});
        this.clearWord()
      },
      doDecrypt() {
        if (this.aesKey == null || this.aesKey.length < 1) {
          Toast.error('请输入秘钥key');
          return;
        }
        let senderName = '';
        let chatInfo = this.chatInfo.trim()
        let idx = chatInfo.lastIndexOf(':')
        if (idx < 0) {
          idx = chatInfo.lastIndexOf('：')
        }
        if (idx != -1) {
          senderName = chatInfo.substr(0, idx + 1);
          chatInfo = chatInfo.substr(idx + 1)
        }

        if (chatInfo == null || chatInfo.length < 1) {
          Toast.error('请输入待解密内容');
          return;
        }
        let msg = encryption.decryptByAES(chatInfo, this.getAESKey());
        if (msg && msg.length > 1) {
          this.$refs.messageList.appendMessage({userType: 2, content: senderName + msg})
          this.clearChatInfo()
        } else {
          Toast.error('解密失败，请确认消息体是否复制完整或者密码是否正确！');
        }
      },
      getAESKey() {
        // let aesKey = this.keyMap[this.aesKey];
        /* if (aesKey) {
           return aesKey;
         }*/
        let parse = CryptoJS.enc.Utf8.parse(this.aesKey);
        this.keyMap[this.aesKey] = parse
        return parse;
      },
      randomMakeAESKey() {
        this.aesKey = encryption.randomKey(32)
      },
      clear() {
        this.$refs.messageList.clear();
      },
      clearWord() {
        this.word = ''
      },
      clearChatInfo() {
        this.chatInfo = ''
      },
      saveAESKey() {
        localStorage.setItem('aesKey', this.aesKey);
      },
      nickNameChange() {
        localStorage.setItem('nickName', this.nickName);
      }
    },
    component: {
      MessageList,
      AlertDialog
    }
  }
</script>

<style>
  .test {
    color: red;
  }
</style>
