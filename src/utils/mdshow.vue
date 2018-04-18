<template>
  <mavon-editor
    class="md"
    :value="value"
    :subfield="init"
    defaultOpen="preview"
    :toolbarsFlag="init"
    :editable="init"
    :scrollStyle="init"
  ></mavon-editor>
</template>
<script>
export default {
  name: 'mdshow',
  props: ['mdvalue'],
  data () {
    return {
      value: this.mdvalue
    }
  },
  computed: {
    init () {
      return false
    }
  }
}
</script>
<style lang="less" scoped>
.md {
  min-width: 100%;
  // height: 100%;
  display: inline;
  min-height: auto;
  z-index: 0;
  font-size: 1rem;
  @media screen and (max-width: 768px) {
    font-size: .7rem;
  }
}
</style>


