var app = new Vue({
	el: '#app',
	data: {
		brand: 'Bagsy',
		product: 'Socks',
		selectedVariant: 0,
		link: 'https://github.com/fabioluzm',
		// inventory: 0,
		// inStock: true,
		onSale: true,
		details: ['80% cotton','20% polyester','Gender-neutral'],
		variants: [
			{
				variantId: 2234,
				variantColor: 'green',
				variantImage: 'assets/img/vmSocks-green.jpg',
				variantQuantity: 10
			},
			{
				variantId: 2235,
				variantColor: 'blue',
				variantImage: 'assets/img/vmSocks-blue.jpg',
				variantQuantity: 0
			},
		],
		// sizes: ['(XS)Extra Small','(S)Small','(M)Medium','(L)Large','(XL)Extra Large'],
		cart: 0,
	},
	methods: {
		addToCart: function() {
			this.cart += 1;
		},
		removeFromCart: function() {
			if(this.cart == 0) {
				this.cart = 0;
			}else{
				this.cart -= 1;
			}
		},
		updateProduct: function(index) {
			this.selectedVariant = index;
		}
	},
	computed: {
		title() {
			return this.brand + ' ' + this.product
		},
		image() {
			return this.variants[this.selectedVariant].variantImage
		},
		inStock() {
			return this.variants[this.selectedVariant].variantQuantity
		},
		sale() {
			if (this.onSale) {
				return this.brand + ' ' + this.product + ' are on sale!'
			}
		}
	}
})