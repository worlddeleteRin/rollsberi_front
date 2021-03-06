<template> 

<div>

	<!-- main page slider -->
	<MainSlider 
        :sliders="main_sliders"
		class="mb-5"
	/>
	<!-- eof main page slider -->


	<!-- products categories -->
		<el-affix
			class="md:hidden"
            z-index="10"
		>
				<CatalogueCategories 
					class="max-w-screen-lg mx-auto 2xl:max-w-screen-xl w-full z-[300] bg-white"
					:categories="categories"
					:active-category-slug="active_category_slug"
				/>
		</el-affix>
	<!-- eof products categories -->
	
	<!-- products list -->
	<ProductsList
		v-if="products && categories"
		:products="products"
		:categories="categories"
		:mobileCatScrollbar="mobile_cat_scrollbar"
	/>

	<MainLoadingContainer 
		v-else
		:title="'Загрузка товаров...'"
	/>
	<!-- products list -->


</div>
</template>

<script lang="ts">

import { defineComponent, ref, computed, onMounted, onBeforeMount } from "vue";
import { useStore } from 'vuex';

import { createToast } from 'mosha-vue-toastify';
// local components
import MainLoadingContainer from '@/components/loaders/MainLoadingContainer.vue';
import MainSlider from '@/components/sliders/MainSlider.vue';
import CatalogueCategories from '@/components/product/CatalogueCategories.vue';

import ProductsList from '@/components/product/ProductsList.vue';

export default defineComponent({
  name: "MainPage",
  props: {
  },
  components: {
  //
	MainLoadingContainer,
	MainSlider,
	CatalogueCategories,

	ProductsList,
  },
	setup () {
		// ref
		const mobile_cat_scrollbar: any = ref(null)
		// const
		const store = useStore()
		// computed
		const active_category_slug = computed(() => store.state.site.active_category);
		// cart
		const cart = computed(() => store.state.cart.cart);
		// categories
		const categories = computed(() => store.state.catalogue.categories);
		// products
		const products = computed(() => store.state.catalogue.products);
        // main sliders
        const main_sliders = computed(() => store.state.site.main_sliders);
		// functions
		onMounted(() => {
			console.log('cat scroll is', mobile_cat_scrollbar.value)
		});

		const getProductsByCategoryId = (category_id: string) => {
			const pr = products.value.filter((p: Record<string,any>) => {
				if (p.categories.some((c: Record<string,any>) => c.id == category_id)) {
					return true
				}
				return false
			});
			return pr
		}

		const addProductToCart = async (product: Record<string,any>) => {
			const is_added = await store.dispatch("cart/addLineItemAPI", {product: product})
			if (is_added) { return productAddedToast("Добавлено:", product.name); }
			return errorToast("Ошибка в процессе добавления товара");
		}
		const removeProductFromCart = async (line_item: Record<string,any>) => {
			const is_removed = await store.dispatch("cart/removeLineItemAPI", {line_item: line_item})
			if (is_removed) { return productRemovedToast("Удалено:", line_item.product.name); }
			return errorToast("Ошибка в процессе добавления товара");
		}
		const addProductQuantity = async(line_item: Record<string,any>) => {
			const is_added = await store.dispatch("cart/addLineItemQuantityAPI", {line_item: line_item})
			if (is_added) { return true;}
			//{ return productAddedToast("Добавлено:", line_item.product.name); }
			return errorToast("Ошибка в процессе добавления товара");
		}
		const removeProductQuantity = async(line_item: Record<string,any>) => {
			const is_removed = await store.dispatch("cart/removeLineItemQuantityAPI", {line_item: line_item})
			if (is_removed) { return true;}
			//{ return productRemovedToast("Удалено:", line_item.product.name); }
			return errorToast("Ошибка в процессе добавления товара");
		}
		const getProductCartItem = (product_id: string) => {
			const cartItem = store.getters["cart/getProductCartItem"]({product_id: product_id})
			if (cartItem) {return cartItem}
			return null
		};
		onBeforeMount (() => {
			// get categories api
			store.dispatch("catalogue/getCategoriesAPI")
			// get products from api
			store.dispatch("catalogue/getProductsAPI")
            // get main sliders
            store.dispatch("getMainSlidersAPI")
		});



		// toast 
		const inputErrorToast = (title: string) => {
			createToast(
				title, {
					'type': 'danger',
					'showIcon': true,
					'hideProgressBar': true,	
					'timeout': 2000,
				}
			);
		};
		const inputSuccessToast = (title: string, description: string) => {
			createToast(
				{title: title, description: description,},
				{
					'type': 'success',
					'showIcon': true,
					'hideProgressBar': true,
					'toastBackgroundColor': 'black',
					'timeout': 2000,
				}
			);
		};
		var errorToast = (title: string) => inputErrorToast(title)
		var productAddedToast =  (title: string, description: string) => inputSuccessToast(title, description)
		var productRemovedToast = (title: string, description: string) => inputSuccessToast(title, description)



		return {
			// refs
			mobile_cat_scrollbar,
			// computed
			cart,
			categories,
			products,
            main_sliders,
				// active_category 
			active_category_slug,
			// functions
			getProductsByCategoryId,

			addProductToCart,
			removeProductFromCart,
			addProductQuantity,
			removeProductQuantity,
			getProductCartItem,
		}
	}
});
</script>

