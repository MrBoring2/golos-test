import { getApiClient } from './apiClient';
let api = null;
export default {
    async getApi() {
        if(!api) {
            api = await getApiClient()
        }
        return api
    },
    async getFlat(id) {
        const api = await this.getApi();
        return api.get(`/flats/${id}`)
    },
    async getFlats(filter) {
        const api = await this.getApi();
        const params = {};
        if(filter != undefined){
            if (filter.minPrice !== undefined) params.minPrice = filter.minPrice;
            if (filter.maxPrice !== undefined) params.maxPrice = filter.maxPrice;
            if (filter.minArea !== undefined) params.minArea = filter.minArea;
            if (filter.maxArea !== undefined) params.maxArea = filter.maxArea;
            if (filter.minFloor !== undefined) params.minFloor = filter.minFloor;
            if (filter.maxFloor !== undefined) params.maxFloor = filter.maxFloor;
            if (filter.orderBy !== undefined) {
                let direction = '';
                let type = 'price'
                if (filter.orderBy.direction == 'desc')
                    direction = '-'
                if (filter.orderBy.type == 'price')
                    type = 'price'
                else if(filter.orderBy.type == 'area')
                    type = 'area'

                params.orderBy = `${direction}${type}`
            }

            if (filter.selectedRooms && filter.selectedRooms.length) {
                params.rooms = filter.selectedRooms;
            }

            if(filter.selectedSales && filter.selectedSales.length) {
                params.sales = filter.selectedSales;
            }
        }
  
        return api.get('/flats', {
            params: params,
            paramsSerializer: {
                indexes: true
            }
        });
    },
    async getStartBoundaryValues() {
        const api = await this.getApi();
        return api.get('/flats-boundary-values');
    }
}
