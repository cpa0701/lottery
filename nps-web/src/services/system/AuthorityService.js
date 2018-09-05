import Http from '../../common/Http';

class AuthorityService {
    // 获取权限树
    getAuthTree = async (param) => {
         let url = 'permissionMgr/permissionList';
        //let url = 'mock/systemController/Authority';
        return await Http.post(url,param);
    };
    //新增权限
    addAuthority = async (param) => {
        let url = 'permissionMgr/addPermission';
        return await Http.post(url, param);
    };
    //更新权限
    updateAuthority = async(param)=>{
        let url = 'permissionMgr/updatePermission';
        return await Http.post(url, param);
    };
    //删除权限
    deleteAuthority=async(param)=>{
        let url = 'permissionMgr/deletePermission';
        return await Http.post(url, param);
    }
}

export default new AuthorityService();