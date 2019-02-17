//Dropdown hint
// https://forum.vuejs.org/t/one-component-applicable-to-multiple-elements/22441
let dropdowns = document.getElementsByClassName('accordion-scope');
for(let el of dropdowns){
	new Vue({
		el: el,
		data: {
			isDropdown: false,
			panel: "panel"
		},
		methods: {
		  toggleHint: function () {
			this.isDropdown = !this.isDropdown;
		  }
		}
	  });
};