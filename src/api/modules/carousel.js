import axios from 'axios';
//轮播图异步请求
const carousel = {
    getAllSwiper(params) {
        return axios({
            url: '/admin/getAllSwiper',
            method: 'GET',
            params
        })
    },
    updateSwiper(data) {
        return axios({
            url: '/admin/updateSwiper',
            method: 'POST',
            data
        })
    },
    addSwiper(data) {
        return axios({
            url: '/admin/addSwiper',
            method: 'POST',
            data
        })
    },
    deleteSwiper(params) {
        return axios({
            url: '/admin/deleteSwiper',
            method: 'GET',
            params
        })
    },
}

export default carousel;