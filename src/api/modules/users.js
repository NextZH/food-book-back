import axios from 'axios';
//用户异步请求
const users={
    login(data){
        return axios({
            url: '/admin/login',
            method: 'POST',
            data
        })
    },
    getAllAdmins(){
        return axios({
            url: '/admin/getAllAdmins'
        })
    },
    getUserInfo(){
        return axios({
            url: '/admin/getUserInfo'
        })
    },
    //删除管理员
    delAdmins(data){
        return axios({
            url: '/admin/delAdmins',
            method: 'POST',
            headers:{
                Authorization:localStorage.token
            },
            data
        })
    },
     //增加管理员
     addAdmins(data){
        return axios({
            url: '/admin/addAdmins',
            method: 'POST',
            headers:{
                Authorization:localStorage.token
            },
            data
        })
    },
}

export default users;