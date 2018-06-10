var LOAD_INIT_NUM = 10;

new Vue({
  el: '#app',
  data: {
    total: 0,
    items: [],
    cart: [],
    searchTerm: 'anime',
    prevSearchTerm: '',
    loading: false,
    tempResults: [],
    price: 5
  },
  methods: {
    appendItems: function() {
      var currItemLen = this.items.length;
      var allResultsLen = this.tempResults.length;
      if (currItemLen < allResultsLen) {
        var partResults = 
          this.tempResults.slice(currItemLen, currItemLen + LOAD_INIT_NUM);
        this.items = this.items.concat(partResults);
      }  
    },
    onSubmit: function() {
      if (this.searchTerm.length) {
        this.items = [];
        this.loading = true;
        this.$http.
          get('search/'.concat(this.searchTerm)).
            then(function(res) {
              this.prevSearchTerm = this.searchTerm;
              this.tempResults = res.data;
              this.appendItems();
              this.loading = false;
            });
      }
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
  computed: {
    hasAllItemsLoaded: function() {
      return this.items.length == this.tempResults.length && 
        this.tempResults.length > 0;
    }
  },
  filters: {
    currency: function(price) {
      return '$'.concat(price.toFixed(2));
    }
  },
  mounted: function() {
    this.onSubmit();

    var vueInstance = this;
    var elem = document.getElementById('product-list-bottom');
    var watcher = scrollMonitor.create(elem);
    watcher.enterViewport(function () {
      vueInstance.appendItems();
    });
  }
});