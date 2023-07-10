function Cart(cart) {
    this.items = cart.items || {};
    this.itemCount = cart.itemCount || 0;
    this.subtotal = cart.subtotal || 0;

    this.addItem = function (id, product, price) {
        let item = this.items[id];
        if (!item) {
            item = this.items[id] = { product: product, quantity: 0, price: 0 };
        }
        item.quantity++;
        this.itemCount++;
        item.price = parseFloat((item.quantity * price).toFixed(2));
        this.subtotal += parseFloat((price).toFixed(2));
    }

    this.removeItem = function (id, price, callback) {
        let item = this.items[id];
        if (item) {
            if (item.quantity > 0) {
                item.quantity--;
                this.itemCount--;
                item.price -= price;
                this.subtotal -= price;
                this.subtotal = parseFloat(this.subtotal.toFixed(2));
                if (item.quantity === 0) {
                    delete this.items[id];
                    callback();
                    return 'Removed from cart!'
                }
                callback()
                return 'Removed from cart!';
            } else {
                delete this.items[id];
                callback()
                return 'Item not in cart!';
            }
        }
    }

    this.get = function () {
        let output = [];
        for (let id in this.items) {
            output.push(this.items[id])
        }
        return output;
    }

    this.getCount = function () {
        return this.itemCount;
    }

    this.getSubtotal = function () {
        return this.subtotal;
    }

    this.clear = function () {
        this.items = {};
        this.itemCount = 0;
        this.subtotal = 0;
    }
}

module.exports = Cart;