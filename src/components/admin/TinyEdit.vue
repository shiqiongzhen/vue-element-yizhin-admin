<template>
  <div class="page">
    <Editor id="tinymce" v-model="content" :init="editorInit"></Editor>
  </div>
</template>

<script type="text/ecmascript-6">
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'

export default {
  data() {
    return {
        editorInit: {
          // language_url: '../../../static/tinymce/zh_CN.js',
          language_url: './static/tinymce/zh_CN.js',   //'./static'可以替换成'/dist/static',即'./'代表当前目录下，即在static的上一级目录下
          language: 'zh_CN',
          skin_url: './static/tinymce/skins/lightgray',
          height: 300,
          plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
          toolbar:
            'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
          branding: false
        },
        content:this.tinyHtml
    }
  },
  props:['tinyHtml'],
  watch:{
    content:function(val){
      // console.log(val)
      this.$emit('content',val)
    }
  },
  mounted() {
    tinymce.init({})
  },
  components: {
    Editor
  }
}
</script>

<style scoped lang="stylus">
</style>
