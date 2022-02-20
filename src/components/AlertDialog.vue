<template>
  <mu-container>
    <mu-dialog :title="data.title" width="90%" :open.sync="openSimple">
      <span style="word-break: break-all;word-wrap:break-word;"> {{data.content}} </span>
      <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">Close</mu-button>
    </mu-dialog>
  </mu-container>
</template>


<script>
  export default {
    name: "AlertDialog",
    data() {
      return {
        openSimple: false,
        data: {title: '', content: ''}
      };
    },
    methods: {
      showMessage(data) {
        this.openSimple = true;
        this.data = data;
      },
      closeSimpleDialog() {
        this.openSimple = false;
      }
    }
  };
</script>


<style scoped>

</style>
