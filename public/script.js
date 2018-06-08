new Vue({
  el: '#app',
  data: {
    total: 0,
    items: [
      { id: 1, title: 'apple', price: 1 },
      { id: 2, title: 'banana', price: 5 },
      { id: 3, title: 'oranges', price: 10 }
    ],
    cart: []
  },
  methods: {
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
      var cartItem = this.cart[this.getCartItemIdx(item.id)];
      cartItem.qty++;
      this.total += cartItem.price;
    },
    decrement: function(item) {
      var cartItemIdx = this.getCartItemIdx(item.id);
      var cartItem = this.cart[cartItemIdx];
      
      if (cartItem.qty > 0) {
        cartItem.qty--;
        this.total -= cartItem.price;
      } 
      if (cartItem.qty == 0) {
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
