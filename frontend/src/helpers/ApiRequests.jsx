export const ApiRequests = async (url, method, dataSave = "", file = false, token = "") => {

    let loading = true;

    let options = {
        method: "GET"
    }
    if (method == "GET" || method == "DELETE") {
        options = {
            method: method,
        }
        if (token) {
            options = {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }   
        }
    }
    if (method == "POST" || method == "PUT") {
        if (file) {
            options = {
                method: method,
                body: dataSave
            }
            if (token) {
                options = {
                    method: method,
                    body: dataSave,
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }   
            }
        } else {
            options = {
                method: method,
                body: JSON.stringify(dataSave),
                headers: {
                    "Content-Type": "application/json"
                }
            }
            if (token) {
                options = {
                    method: method,
                    body: JSON.stringify(dataSave),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }   
            }
        }
    }
    const apirequests = await fetch(url, options);
        // Capturar el status de la respuesta
    const status = apirequests.status;
    const data = await apirequests.json();

    loading = false;

    return {
        data,
        status,
        loading
    }
}