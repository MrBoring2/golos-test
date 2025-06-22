import { getApiClient } from './apiClient';

export default {
    async getFlats() {
        const api = await getApiClient();
        console.log('api: ' + api)
        return api.get('/flats');
    }
}
