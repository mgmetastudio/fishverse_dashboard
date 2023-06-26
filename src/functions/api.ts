export const getApiConfig = (auth = true) => {
    let config = {
        baseURL: 'https://api-fisher.thefishverse.com',
        headers: {}
    };
    if (auth == true) {
        config["headers"] = {
            'authorization': 'Bearer ' + localStorage.getItem("accessToken")
        }
    }
    return config;
}