<template>

	<!-- categories -->
	<div
		class="flex overflow-x-scroll pt-2 px-1"
		id="mobile-category-nav"
	>
		<div
			@click="goToCategory(category)"
			v-for="category in categories"
			:key="category"
			class="flex-shrink-0 mb-3"
			:id="'mb-cat-nav-' + category.slug"
		>
			<div 
			v-if="category.slug == activeCategorySlug"
			class="bg-defaultDim mx-1 px-4 py-[6px] rounded-full text-defaultTextBg text-md font-semibold"
			>
				{{ category.name }} 
			</div>
			<div 
			v-else
			class="bg-gray-100 mx-1 px-4 py-[6px] rounded-full text-gray-700 text-md font-semibold"
			>
				{{ category.name }} 
			</div>

		</div>
	</div>
	<!-- eof categories -->

</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
	name: "CatalogueCategories",
	components: {
	},
	props: {
		categories: {
			type: Array,
			default: null,
		},
		activeCategorySlug: {
			type: String,
			default: null,
		}
	},
	setup () {
		const store = useStore()
		const router = useRouter()

		const goToCategory = (category: Record<string,any>) => {
			// set new category_slug state
			// store.commit('setObserveCategoryScroll', false)
			store.commit('setActiveCategory', category.slug)
			// document.querySelector("#" + category.slug)?.scrollIntoView({behavior: "smooth"})
			// document.querySelector("#" + category.slug)?.scrollIntoView({behavior: "smooth"})
			//location.href = "#" + category.slug

			router.push('/#' + category.slug)
			// store.commit('setObserveCategoryScroll', true)
		}
		return {
			// functions
			goToCategory	
		}
	}
});
</script>
