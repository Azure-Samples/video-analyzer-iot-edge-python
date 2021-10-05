export default class ApiHelper {
   constructor(token)
   {
       this.token = token;
   }

    callApi(endpoint, method, args) {
        return new Promise((resolve, reject) => {
            let body, formData = null;
            let headers = { "Authorization": "Bearer " + this.token, 'Accept': '*/*' };

            if (args) {
                if (args.query) {
                    endpoint += `?${args.query}`;
                }
                else if (args.id) {
                    endpoint += `/${args.id}`;
                }

                if (args.body) {
                    body = args.body;
                    headers = { 'Content-Type': 'application/json', ...headers };
                }
                else if (args.formData) {
                    formData = args.formData;
                }
            }

            fetch(
                endpoint,
                {
                    headers: headers,
                    method,
                    body: !formData ? body : formData
                })
                .then(response => {
                    if (response.status === 401 || response.status === 403) {
                        return reject(response.statusText);
                    }

                    return resolve(response);
                })
                .catch(error => {
                    return reject(error);
                });
        });
    }
}

