import axios from 'axios';
//套餐异步请求
const carousel = {
    getAllMeal(params) {
        return axios({
            url: '/meal/getAllMeal',
            method: 'GET',
            params
        })
    },
    updateMeal(data) {
        return axios({
            url: '/meal/updateMeal',
            method: 'POST',
            data
        })
    },
    addMeal(data) {
        return axios({
            url: '/meal/addMeal',
            method: 'POST',
            data
        })
    },
    delMeal(data) {
        return axios({
            url: '/meal/delMeal',
            method: 'POST',
            data
        })
    },
}

export default carousel;