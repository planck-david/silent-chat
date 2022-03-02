<template>
  <div>
    <mu-paper :z-depth="1" class="demo-list-wrap">
      <mu-sub-header>Message List</mu-sub-header>
      <div v-for="message in messageList" :key="message.msgId" class="demo-list-wrap">


        <div style="float: left;">
          <mu-avatar>
            <img v-if="message.userType==1" src="../assets/images/avatar1.jpg">
            <img v-else src="../assets/images/avatar2.jpg">
          </mu-avatar>
        </div>


        <div class="message-container">
          <span style="color: #efefef">{{message.userType==1? "YOU":"HE/SHE"}}           {{message.sendTimeDesc}}</span> &nbsp;
          <br/>
          <pre style="word-break: break-all;word-wrap:break-word;font-size: 1.1em;">{{message.content}}</pre>
        </div>


        <mu-divider></mu-divider>
      </div>
    </mu-paper>

  </div>
</template>

<script>

  import * as renderUtil from '/src/libs/renderUtil.js'

  function packMessage(rawData) {
    let msgId = rawData.msgId ? rawData.msgId : (new Date().getTime()) + '';
    let data = {
      userType: rawData.userType,
      sendTime: rawData.sendTime ? rawData.sendTime : new Date(),
      content: rawData.content,
      msgId
    }
    data['sendTimeDesc'] = renderUtil.formatDateTime(data.sendTime)
    return data
  }

  export default {
    name: "MessageList",
    data() {
      return {
        messageList: []
      }
    },
    methods: {
      appendMessage(data) {
        this.messageList = [packMessage(data)].concat(this.messageList)
      },
      clear() {
        this.messageList = []
      }
    }
  }
</script>

<style>
  .demo-list-wrap {
    width: 100%;
    padding: 10px 3px 5px 3px;
    text-align: left;
  }

  .message-container {
    margin-left: 50px;
    background-color: #59b269;
    padding: 10px;
    border-radius:10px;
  }
</style>
