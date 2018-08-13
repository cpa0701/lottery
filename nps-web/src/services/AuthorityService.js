import Http from '../common/Http';

class AuthorityService {
    // 获取权限树
    getAuthTree = async (param) => {
        let url = 'permissions';
        return await Http.get(url, param);
    };




}

export default new AuthorityService();