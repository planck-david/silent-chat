<template>
  <mu-container>
    <mu-dialog :title="data.title" width="90%" :open.sync="openSimple">

      <mu-text-field v-model="data.content" multi-line :rows="4" :maxrows="10"
                     full-width></mu-text-field>


      <div slot="actions">

        <mu-button flat color="primary" @click="closeSimpleDialog">Close</mu-button>

        <mu-button color="primary" @click="copyActiveCode($event,data.content )">
          复制
        </mu-button>
      </div>
    </mu-dialog>
  </mu-container>
</template>


<script>
  import Vue from 'vue'
  import Clipboard from 'clipboard'
  import Toast from 'muse-ui-toast';

  Vue.use(Toast);

  export default {
    name: "AlertDialog",
    data() {
      return {
        openSimple: false,
        data: {title: '', content: ''}
      };
    },
    computed: {},
    methods: {
      showMessage(data) {
        this.openSimple = true;
        this.data = data;
      },
      closeSimpleDialog() {
        this.openSimple = false;
      },
      copyActiveCode(e, text) {
        let _this = this
        const clipboard = new Clipboard(e.target, {text: () => text})
        clipboard.on('success', () => {
          Toast.success('复制成功');
          // this.$message({ type: 'success', message: '复制成功' })
          // 释放内存
          clipboard.off('error')
          clipboard.off('success')
          clipboard.destroy()
          _this.closeSimpleDialog();
        })
        clipboard.on('error', () => {
          // 不支持复制
          Toast.error('复制失败');
          //  this.$message({ type: 'waning', message: '该浏览器不支持自动复制' })
          // 释放内存
          clipboard.off('error')
          clipboard.off('success')
          clipboard.destroy()
        })
        clipboard.onClick(e)
      }
    }
  };
</script>


<style scoped>

</style>
