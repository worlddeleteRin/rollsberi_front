<template> 
<div v-if="order"
    class="px-4 py-3 bg-gray-50 rounded-md"
>
	<div 
        class="flex justify-between"
    >
	<!-- order id and status -->
	<div class="flex flex-col justify-between">
		<div class="font-bold">
			{{ order?.cart?.total_amount }} &#8381;
		</div>
		<div 
		class="px-3 py-1 text-[0.7rem] md:text-[0.8rem] tracking-wide text-center text-white uppercase rounded-md"
		:style="{backgroundColor: order?.status?.color }"
		>
			{{ order?.status?.name }}	
		</div>
	</div>
	<!-- eof order is and status -->

	<!-- order delivery info -->
	<div class="flex-col justify-between hidden w-3/12 mx-3 md:flex">
		<div class="text-sm font-semibold">
			Адрес доставки
		</div>		
		<div v-if="order.delivery_method.id == 'pickup' && order.pickup_address"
		class="text-sm">
			{{ order?.pickup_address?.name }}
		</div>
		<div v-if="order.delivery_method.id == 'delivery' && order.delivery_address"
		class="text-sm">
			{{ order?.delivery_address?.address_display }}
		</div>
	</div>
	<!-- eof order delivery info -->

	<!-- order main info -->
	<div class="flex flex-col justify-between w-6/12 ml-2">
		<!-- order payment method and amount -->
		<div class="text-sm">
			<span>
				{{ order?.delivery_method.name }}, {{ order?.payment_method.name }}	
			</span>
		</div>
		<!-- eof order payment methods and amount -->
		<!-- order items images -->	
		<div class="flex mt-2 overflow-x-scroll shrink-0">
			<div
				v-for="cart_item in order?.cart?.line_items"
				:key="cart_item.id"
				class="flex-shrink-0 w-16 h-12 px-1 fle4"
			>
				<img
					:src="cart_item?.product.imgsrc[0]"
					class="object-contain w-full h-full"
				/>
			</div>
		</div>
		<!-- eof order items images -->
	</div>
	<!-- eof order main info -->
	</div>
    <!-- order bonuses -->
    <div 
        v-if="order?.cart?.bonuses_to_apply && order?.cart?.bonuses_to_apply > 0"
        class="mt-2 bg-green-400 max-w-max rounded-md px-2"
    >
        <span 
        class="uppercase text-[13px] text-white"
        >
            Бонусов с заказа:
            {{ order?.cart?.bonuses_to_apply }}
        </span>
    </div>
    <!-- eof order bonuses -->
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	name: "UserProfileOrderCard",
	props: {
		order: {
			type: Object,
			required: true,
			default: null,
		},
		userOrderStatusColors: {
			type: Object,
			default: null,
		}
	},
	setup() {
		// ref 
		return {
		}
	}
});
</script>
