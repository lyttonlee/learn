<template>
  <div class="container">
    <h2>{{news.title}}</h2>
    <p class="sub">发布时间：{{news.date}} | 发布者：{{news.author}}</p>
    <!-- <mavon-editor
     class="md"
     :value="prop.value"
     :subfield = "prop.subfield"
     :default_open = "prop.default_open"
     :toolbarsFlag = "prop.toolbarsFlag"
     :editable="prop.editable"
     :scrollStyle="prop.scrollStyle"
     ></mavon-editor> -->
     <md-show :key="news._id" :mdvalue="news.info"></md-show>
    <back></back>
  </div>
</template>
<script>
import {GetNews} from '../../api/adminApi'
import Back from '@/components/back'
export default {
  components: {
    Back
  },
  data () {
    return {
      news: {}
    }
  },
  methods: {
    curnews () {
      let par = {
        params: {
          _id: this.$route.params.id
        }
      }
      // console.log(par)
      GetNews(par).then(res => {
        // console.log(res)
        this.news = res.data[0]
      })
    }
  },
  mounted () {
    this.curnews()
  }
}
</script>
<style lang="less" scoped>
.container {
  max-width: 1280px;
  .sub {
    color: #8f8f8c;
    font-size: 12px;
  }
}
</style>


