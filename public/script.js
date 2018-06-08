new Vue({
  el: '#app',
  data: {
    total: 0,
    items: [],
    cart: [],
    searchTerm: '',
    prevSearchTerm: ''
  },
  methods: {
    onSubmit: function() {
      this.$http.
        get('search/'.concat(this.searchTerm)).
          then(function(res) {
            this.prevSearchTerm = this.searchTerm;
            this.items = res.data;
          });
    },
    addItem: function(index) {
      var item = this.items[index];
      var done = false;
      var cartItemIdx = this.getCartItemIdx(item.id);
      if (cartItemIdx != -1) {
        done = true;
        this.cart[cartItemIdx].qty++;
      }
      if (!done) {
        item.qty = 1;
        this.cart.push(item);
      }
      this.total += item.price;
    },
    increment: function(item) {
      item.qty++;
      this.total += item.price;
    },
    decrement: function(item) {
      var cartItemIdx = this.getCartItemIdx(item.id);
      item.qty--;
      this.total -= item.price;
      if (item.qty == 0) {
        this.cart.splice(cartItemIdx, 1);
      }
    },
    getCartItemIdx: function(itemId) {
      for (var k = 0; k < this.cart.length; k++) {
        if (this.cart[k].id === itemId) {
          return k;
        }
      }
      return -1;
    }
  },
  filters: {
    currency: function(price) {
      return '$'.concat(price.toFixed(2));
    }
  }
});
