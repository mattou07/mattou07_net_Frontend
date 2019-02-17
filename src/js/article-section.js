Vue.component("articletile", {
    props: ["title", "url", "colours"],
    computed: {
        assignColour: function() {
            return this.colours[Math.floor(Math.random() * colours.length)];
        }
    },
    template: `<article class="tile is-child" v-bind:class="assignColour"><p class="title">{{ title }}</p><a v-bind:href="url">Visit Me</a></article>`
  });

  new Vue({
    el: "#article-section-app",
    data: {
      leftposts: [],
      rightposts: [],
      colours: ["notification is-primary", "notification is-link", "notification is-info", "notification is-success", "notification is-warning","notification is-danger"],
      posts: contentArr
    },
    created: function() {
      this.assignContent();
    },
    methods: {
      assignContent: function() {
        var left = true;
        for (var i = 0; i < contentArr.length; i++) {
          if (left) {
            left = false;
            this.leftposts.push(contentArr[i]);
          } else {
            left = true;
            this.rightposts.push(contentArr[i]);
          }
        }
      }
    }
  });