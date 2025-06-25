import { getApiClient } from './apiClient';
let api = null;
export default {
    async getApi() {
        if(!api) {
            api = await getApiClient()
        }
        return api
    },
    async getSales() {
         const api = await this.getApi();
         return api.get('/sales');
    }
}