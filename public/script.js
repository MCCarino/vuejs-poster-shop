new Vue({
  el: '#app',
  data: {
    total: 0,
    items: [],
    cart: [],
    searchTerm: 'anime',
    prevSearchTerm: '',
    loading: false,
    price: 5
  },
  methods: {
    onSubmit: function() {
      this.items = [];
      this.loading = true;
      this.$http.
        get('search/'.concat(this.searchTerm)).
          then(function(res) {
            this.prevSearchTerm = this.searchTerm;
            this.items = res.data;
            this.loading = false;
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
      this.total += this.price;
    },
    increment: function(item) {
      item.qty++;
      this.total += this.price;
    },
    decrement: function(item) {
      var cartItemIdx = this.getCartItemIdx(item.id);
      item.qty--;
      this.total -= this.price;
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
  },
  mounted: function() {
    this.onSubmit();
  }
});
