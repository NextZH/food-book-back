
import axios from 'axios';
//会员界面异步请求
const member = {
    get(params) {
        return axios({
            url: '/member/getAllMembers',
            method: 'GET',
            params
        })
    },
    toPayVipAsync(data) {
        return axios({
            url: '/member/updateMemberToVip',
            method: 'POST',
            data
        })
    },
    
    cancelMemberVipAsync(data) {
        return axios({
            url: '/member/cancleMember',
            method: 'POST',
            data
        })
    },
    delMemberVipAsync(data) {
        return axios({
            url: '/member/delMember',
            method: 'POST',
            data
        })
    },


}
export default member;