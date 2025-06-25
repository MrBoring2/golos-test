import axios from "axios";

let apiClient = null;

export const initializeApiClient = async () => {
    if(apiClient) return apiClient;

    try {
        const response = await fetch('/config.json');
   
        const config = await response.json();
      
        apiClient = axios.create({
            baseURL: config.apiUrl,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            },
            
        })
         
        return apiClient;
    }
    catch(error) {
        console.error("Не удалось загрузить конфиг: ", error);
    }
}

export const getApiClient = async () => {
    if(!apiClient) apiClient = await initializeApiClient();

    return apiClient
}