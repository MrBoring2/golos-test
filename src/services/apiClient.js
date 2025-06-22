import axios from "axios";

let apiClient = null;

export const initializeApiClient = async () => {
    if(apiClient) return apiClient;

    try {
        const response = await fetch('/config.json');
        console.log('dsadasdadasdasd123123123213')
        const config = await response.json();
      
        apiClient = axios.create({
            baseURL: config.apiUrl,
            timeout: 10000,
            headers: {
                'Content-Type': 'applictaion/json'
            }
        })
         
        return apiClient;
    }
    catch(error) {
        console.error("Не удалось загрузить конфиг: ", error);
    }
}

export const getApiClient = async () => {
    if(!apiClient) await initializeApiClient();
     console.log('dasdasdasdapiClient')
    return apiClient
}