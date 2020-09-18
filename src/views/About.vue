<template>
  <ion-app class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{getInfo.title}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <span v-if="this.list.length >= this.pageing">
      {{this.pageing+1}} / {{this.list.length+1}}
      </span>
      <ion-button v-else>
        アプリダウンロード！！！
      </ion-button>
      <img :src="this.list[this.pageing]"/>
    </ion-content>
    <ion-footer>
      <ion-toolbar class="flexView">
        <button @click="onPrev" class="left">prev</button>
        <button @click="onNext" class="right">next</button>
      </ion-toolbar>
    </ion-footer>
  </ion-app>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import axios from 'axios'
export default {
  name: 'Home',
  props: ['book'],
  components: {
  },
  data () {
    return {
      list: ['https://res.cloudinary.com/teamb/image/upload/v1600318026/noimage_jj1ubq.jpg'],
      pageing: 0
    }
  },
  mounted () {
    this.getPages()
  },
  methods: {
    getPages: function () {
      axios
        .get('/bookPage/' + this.getInfo.id + '/' + 5)
        .then(res => {
          console.log('res', res)
          this.list = []
          for (const value of Object.values(res.data)) {
            this.list.push(value.uri)
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    onNext: function () {
      if (this.list.length >= this.pageing) {
        this.pageing += 1
      }
    },
    onPrev: function () {
      if (this.pageing > 0) {
        this.pageing -= 1
      }
    }
  },
  computed: {
    getInfo () {
      console.log('this', this.props, this.$route.params.book)
      return this.$route.params.book
    }
  }

}
</script>
<style scoped>
.book {
  width: 50%;
  border: 2px #000000 solid;
}
.kasen {
  border-bottom: 1px solid black;
}
.flexView {
  display: inline-flex;
}
.left {
  width: 200px;
  position: absolute;
  left: 0;
}
.right {
  width: 200px;
  position: absolute;
  right: 0;
}
</style>
