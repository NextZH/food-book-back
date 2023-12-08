import axios from 'axios';
//菜单页面异步
const menu = {
    get(data) {
        return axios({
            url: '/admin/findAllMenu',
            method: 'POST',
            data
        })
    },
    search(data) {
        return axios({
            url: '/admin/searchMenu',
            method: 'POST',
            data
        })
    },
    update(data){
        return axios({
            url: '/admin/updateMenu',
            method: 'POST',
            data
        })
    }


}
export default menu;