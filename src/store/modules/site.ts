import { ActionContext } from 'vuex';
import { SiteDataService } from '@/api/site';

const request_call_info_default = {
	name: '',
	phone: '',
	phone_mask: '+7',
	session_id: null,
	stocks: null,
}

export default {
  state: {
	common_info: {
		location_address: "",
        delivery_phone: "",
        delivery_phone_display: "",
        main_logo_link: "",
        menu_links: [],
	},
	request_call_info: { ...request_call_info_default },
	loading_states: {
		critical_data_loading: true,
        common_data_loaded: false,
	},
	active_category: "",
	observe_category_scroll: true,
  },
  mutations: {
    setCommonInfo(state: Record<string,any>, common_info: Record<string,any>) {
        common_info = { ...common_info }
    },
	setSessionId(state: Record<string,any>, session_id: string) {
		state.session_id = session_id	
	},
	setActiveCategory(state: Record<string,any>, active_category: string) {
		state.active_category = active_category
	},
	setObserveCategoryScroll(state: Record<string,any>, need_observe: boolean) {
		state.observe_category_scroll = need_observe
	},
	setStocks(state: Record<string,any>, stocks: Array<Record<string,any>>) {
		state.stocks = stocks
	},
	setSiteLoadingState(state: Record<string,any>, 
	{loading_state_name, is_loading}: {loading_state_name: string, is_loading: boolean}) {
		state.loading_states[loading_state_name] = is_loading;
	},
	setRequestCallInfo(state: Record<string,any>, request_call_info: Record<string,any>) {
		state.request_call_info = { ...request_call_info }
	},
	resetRequestCallInfo(state: Record<string,any>) {
		state.request_call_info = { ...request_call_info_default } 
	},	
  },
  actions: {
	async checkGetSessionId(
		context: ActionContext<any,unknown>
	) {
		const session_id = localStorage.getItem("session_id")
		if (!session_id) {
			context.dispatch("getSessionIdAPI")
		} else {
			context.commit('setSessionId', session_id)
			return true
		}
	},
	async getSessionIdAPI(
		context: ActionContext<any,unknown>
	) {
		const response = await SiteDataService.getSessionId()
		if (response && response.status == 200) {
			context.commit('setSessionId', response.data.session_id)
			localStorage.setItem('session_id', response.data.session_id)
			return true
		}
		return false
	},
	async getStocksAPI(
		context: ActionContext<any,unknown>
	) {
		const response = await SiteDataService.getStocks()
		if (response && response.status == 200) {
			context.commit('setStocks', response.data.stocks)
			return true
		}
		return false
	},
    async getCommonInfoAPI(
		context: ActionContext<any,unknown>
    ) {
        console.log("run get common info api")
        const response = await SiteDataService.getCommonInfo()
        if (response && response.status == 200) {
            context.commit('setCommonInfo', response.data)
        }
        context.commit('setSiteLoadingState', {
            'loading_state_name': 'common_data_loaded',
            'is_loading': true
        })
    },
	sendRequestCallAPI(
        context: ActionContext<any,unknown>
    ) {
        console.log('context is', context)
		// code goes here
	},
  },
}
