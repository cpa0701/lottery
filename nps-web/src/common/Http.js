import axios from 'axios';

const $ = require("jquery");

export class Http {
    mode = 'local';

    getUrl(url) {
        // let prefix = '';
        // let suffix = '';
        // switch (this.mode) {
        //     case 'local': {
        //         prefix = 'mock/';
        //         suffix = '';
        //         break;
        //     }
        //     case 'remote': {
        //         prefix = '';
        //         break;
        //     }
        //     case 'product': {
        //         prefix = '';
        //         break;
        //     }
        //     default: {
        //         prefix = '';
        //         break;
        //     }
        // }
        // let _url = prefix + url + suffix;
        return url;
    }

    async get(api,data = {}, config = {}) {
        api = this.getUrl(api);
        if (api.includes('mock')) {
            return await new Promise(function (resolve, reject) {
                $.ajax({
                    url: api, type: "get",
                    success: (res) => {
                        resolve(JSON.parse(res))//在异步操作成功时调用
                    },
                    error: (error) => {
                        reject(error);
                    }
                });
            })
        } else
            return await this._request(
                {
                    url: api,
                    method: 'GET',
                    params: data,
                }, config
            );
    }

    async post(api, data = {}, config = {}) {
        api = this.getUrl(api);
        if (api.includes('mock')) {
            return await new Promise(function (resolve, reject) {
                $.ajax({
                    url: api, data: data, type: "post",
                    success: (res) => {
                        resolve(JSON.parse(res))//在异步操作成功时调用
                    },
                    error: (error) => {
                        reject(error);
                    }
                });
            })
        } else {
            return await this._request(
                {
                    url: api,
                    method: 'POST',
                    data: data,
                }, config
            );
        }

    }

    async delete(api, config = {}) {
        api = this.getUrl(api);
        return await this._request(
            {
                url: api,
                method: 'DELETE',
            }, config
        );
    }

    async put(api, data = {}, config = {}) {
        api = this.getUrl(api);

        const formBody = JSON.stringify(data);
        return await this._request(
            {
                url: api,
                method: 'PUT',
                params: formBody,
            }, config
        );
    }

    async _request(params, config = {
        baseURL: '',
    }) {
        params = Object.assign(params, config);
        return await axios(params).catch(function (error) {
            if (error.response) {
                // 发送请求后，服务端返回的响应码不是 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // 发送请求但是没有响应返回
                console.log(error.request);
            } else {
                // 其他错误
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
    }

    log(msg) {
        if (this.mode !== 'product') {
            console.log(msg);
        }
    }
}

const http = new Http();

export default http;
