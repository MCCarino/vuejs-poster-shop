new Vue({
  el: '#app',
  data: {
    total: 0
  },
  methods: {
    addItem: function() {
      this.total += 5;
    }
  }
});
