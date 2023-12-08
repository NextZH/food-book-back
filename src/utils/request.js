
import router from "@/router";
import axios from "axios";
import { MessageBox } from "element-ui";



//配置axios公共url
axios.defaults.baseURL = 'http://127.0.0.1:4001';

//配置请求拦截器
axios.interceptors.request.use((config) => {
    //所有请求在发往后端之前都会先拦截下来，给请求头上加上token
    // console.log("前端发起请求");
    if (localStorage.token) {
        config.headers.Authorization = localStorage.token;

    }
    return config
})

//配置响应拦截器
axios.interceptors.response.use((res) => {
    // console.log("响应拦截器", res);
    return res.data
}, (err) => {
    // console.log("响应错误信息", err);
    if (err.response && err && (err.response.status || err.response.status === 0)) {
        if (err.response && err && (err.response.status || err.response.status === 0)) {
            // console.log("响应错误状态码", err.response.status);
            if (err.response.status === 401 || err.response.status === 0) {

                MessageBox.alert('登录过期，请重新登录', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        localStorage.removeItem('token');
                        router.replace('/login')
                    }
                });

            }
        }
    }


    return Promise.reject(err.message)
});