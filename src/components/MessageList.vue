<template>
  <div>
    <mu-paper :z-depth="1" class="demo-list-wrap">
      <mu-sub-header>今天</mu-sub-header>
      <div v-for="message in messageList" :key="message.msgId" class="demo-list-wrap">


        <div style="float: left;">
          <mu-avatar>
            <img v-if="message.userType==1" src="../assets/images/avatar1.jpg">
            <img v-else src="../assets/images/avatar2.jpg">
          </mu-avatar>
        </div>


        <div class="message-container" >
          <span style="color: rgba(0, 0, 0, .87)">{{message.userType==1? "YOU":"HE/SHE"}}</span> &nbsp;
          {{message.sendTimeDesc}}<br/>
          <span style="word-break: break-all;word-wrap:break-word;">{{message.content}}</span>
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
        this.messageList.push(packMessage(data))
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
  }
</style>
