<template>
  <div>
    <mu-paper :z-depth="1" class="demo-list-wrap">
      <mu-sub-header>Message List({{messageList.length}})</mu-sub-header>
      <div v-for="message in messageList" :key="message.msgId" class="demo-list-wrap">


        <div style="float: left; padding: 5px;">
          <mu-avatar>
            <img v-if="message.userType==1" src="../assets/images/avatar1.jpg">
            <img v-else src="../assets/images/avatar2.jpg">
          </mu-avatar>
        </div>


        <div class="message-container">
          <span style="color: #616161;">{{message.userType==1? "ME":"HE/SHE"}}&nbsp;&nbsp;&nbsp;&nbsp;{{message.sendTimeDesc}}</span>
          &nbsp;
          <br/>
          <pre
            style="word-break: break-all;word-wrap:break-word;font-size: 1.1em; color: #3e3e3e;">{{message.content}}</pre>
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
    padding: 10px;
    text-align: left;
  }

  .message-container {
    padding: 10px;
    border: 2px solid #59b269;
    border-radius: 10px;
  }


</style>
