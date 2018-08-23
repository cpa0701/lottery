import axios from 'axios';
import {
    message,
} from 'antd';

const $ = require("jquery");

export class Http {
    mode = 'remote';

    getUrl(url) {
        let prefix = '';
        switch (this.mode) {
            case 'local': {
                prefix = 'mock/';
                break;
            }
            case 'remote': {
                prefix = '';
                break;
            }
            case 'product': {
                if (!url.includes('rapapi'))
                    prefix = 'http://'+window.location.host+':18088/';
                break;
            }
            default: {
                prefix = '';
                break;
            }
        }
        return prefix + url;
    }

    async get(api, data = {}, config = {}) {
        api = this.getUrl(api);
        if (api.includes('mock')) {
            return await new Promise(function (resolve, reject) {
                $.ajax({
                    url: api, type: "get",
                    success: (res) => {
                        resolve(res.data ? res.data : JSON.parse(res))//在异步操作成功时调用
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
                    url: api, data: JSON.stringify(data), type: "post", datatype: "json",contentType: "application/json;charset=utf-8",
                    success: (res) => {
                        resolve(res.data ? res.data : JSON.parse(res))//在异步操作成功时调用
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

    async delete(api, data = {}, config = {}) {
        api = this.getUrl(api);
        return await this._request(
            {
                url: api,
                method: 'DELETE'
            }, config
        );
    }

    async put(api, data = {}, config = {}) {
        api = this.getUrl(api);
        return await this._request(
            {
                url: api,
                method: 'PUT',
                data: data,
            }, config
        );
    }

    async _request(params, config = {
        withCredentails:true,
        header:{
            'Access-Control-Allow-Origin':true,
            'Content-Type':'application/x-www-form-urlencoded'
        },
        credentials:'same-origin'
    }) {
        params = Object.assign(params, config);
        return await axios(params)
            .then(result => {
                if (result.data.code === 200)
                    return result.data.data ? result.data.data : false
                else return true;
            }).catch(function (error) {
                if (error.response.data.code === 401) {
                    message.error('登录超时');
                    window.location.href = '#/login'
                } else if (error.response.data.code === 500)
                    message.error('请求超时');
                else
                    message.error(error.response.data.description);
                return false
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
