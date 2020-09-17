<template>
  <ion-app class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>おすすめ本棚</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h1 v-if="this.twitter.length == 0">Welcome</h1>
      <h1 v-else>{{twitter}}</h1>
      <input v-model="twitter" />
      <button @click="onSubmit()">決定!!</button>
      <ion-grid>
        <ion-row v-for="(items, key) in bookSeparates" :key="key" class="kasen">
          <ion-col v-for="(item, childKey) in items" :key="childKey">
            <img class="book" v-on:click="gogo(item)" :src="item.uri"/>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-app>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import axios from 'axios'
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      books: [
      ],
      bookSeparates: [[]],
      twitter: ''
    }
  },
  mounted () {
    console.log('check', this.$route, ...Object.values(this.$route.query))
    let value = [...Object.values(this.$route.query)][0]
    if (value) {
      value = value.substr(1, (value.length - 2))
      console.log('check', value)
      if (!!value && value.length > 0) {
        this.twitter = value
        this.onSubmit()
      }
    }
  },
  methods: {
    onSubmit: function () {
      const twitterId = this.twitter
      console.log('check', twitterId, this.$route.query)
      this.books = []
      this.bookSeparates = [[]]
      axios
        .get('/book_by_twitter_id/' + twitterId)
        .then(res => {
          this.items = res.data.books
          console.log('check', res, this.items)
          let check = 0
          let index = 0
          for (const item of this.items) {
            if (check > 5) {
              index += 1
              check = 0
            }
            const toBook = item
            if (!toBook.uri || toBook.uri.length === 0) {
              toBook.uri = 'https://res.cloudinary.com/teamb/image/upload/v1600318026/noimage_jj1ubq.jpg'
            }
            this.bookSeparates[index].push(toBook)
          }
          console.log('確認', this.bookSeparates)
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    gogo: function (data) {
      this.$router.push({ name: 'Book', params: { book: data } }).catch(() => {})
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
</style>
