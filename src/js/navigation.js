//Nav Bar
var navDropdown = new Vue({
  el: ".navbar",

  data: {
    isActive: false,
    navMenu: "navbar-menu",
    navBurger: "navbar-burger"
  },
  methods: {
    toggleNavBurger: function() {
      this.isActive = !this.isActive;
    }
  }
});