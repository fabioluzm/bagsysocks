Vue.component('product-details', {
	props: {
		details: {
			type: Array,
			required: true,
		}
	},
	template: `
	<ul>
		<li v-for="detail in details">{{ detail }}</li>
	</ul>
	`
})

Vue.component('product', {
	props: {
		premium: {
			type: Boolean,
			required: true
		}
	},
	template: `
	<div class="product">

		<div class="product-image">
			<img v-bind:src="image">
		</div>
	
		<div class="product-info">
			<h1>{{ title }}</h1>

			<p v-if="inStock">In Stock</span></p>
			<p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
			<p>{{ sale }}</p>
			<p>Shipping: {{ shipping }}</p>

			<product-details :details="details"></product-details>

			<div v-for="(variant, index) in variants"
				:key="variant.variantId"
				class="color-box"
				:style="{'background-color': variant.variantColor}"
				@mouseover="updateProduct(index)">
			</div>

			<button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add Cart</button>
			<button @click="removeFromCart" v-show="inStock">Remove Cart</button>
		</div>
	</div>
	`,
	data(){
		return {
			brand: 'Bagsy',
			product: 'Socks',
			selectedVariant: 0,			
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
			]
		}
	},
	methods: {
		addToCart: function() {
			this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
		},
		removeFromCart: function() {
			this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
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
		},
		shipping() {
			if (this.premium) {
				return "Free"
			}
			return "2.99€"
		}
	}
})

var app = new Vue({
	el: '#app',
	data: {
		premium: false,
		cart: [],
	},
	methods: {
		addItem(id) {
			this.cart.push(id);
		},
		removeItem(id) {			
			this.cart.pop(id);
		}
	}
})