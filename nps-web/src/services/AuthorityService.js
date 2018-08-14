import Http from '../common/Http';

class AuthorityService {
    // 获取权限树
    getAuthTree = async (param) => {
        let url = 'permissions';
        return await Http.get(url,param);
    };
    //新增权限
    addAuthority = async (param) => {
        let url = 'permissions';
        return await Http.post(url, param);
    };
    //更新权限
    updateAuthority = async(param)=>{
        let url = 'permissions/'+param.id;
        return await Http.put(url, param);
    }
    //删除权限
    deleteAuthority=async(param)=>{
        let url = 'permissions/'+param.id;
        return await Http.delete(url, param);
    }


}

export default new AuthorityService();