import Http from '../common/Http';

class SysRoleMgService {
    // 角色树查询
    roleTree = async (params) => {
          // let url = 'mock/system/rolesController/qryRolesTree';
        let url = 'roles';
        return await Http.get(url, params);
    };
    // 平台角色新增
    addRoles = async (param) => {
        // let url = 'system/rolesController/addRoles';
        let url = 'roles';
        return await Http.post(url, param);
    };
    // 平台角色修改
    editRoles = async (param) => {
        let url = 'roles/' + param.id;
        return await Http.put(url);
    };
    // 平台角色复制
    copyRoles = async (param) => {
        let url = 'roles';
        return await Http.post(url, param);
    };
    // 平台角色删除
    delRoles = async (param) => {
        let url = 'roles/' + param.id;
        return await Http.delete(url, param);
    };


    // 获取角色拥有权限树
    getRoleAuthTree = async (param) => {
        let url = `/roles/${param}/permissions`;
        return await Http.get(url);
    };
    // 修改角色拥有权限
    editRoleAuth = async (param) => {
        let url = `/roles/${param.roleId}/permissions`;
        return await Http.post(url, param);
    };
    // 删除角色拥有权限
    delRoleAuth = async (param) => {
        let url = `/roles/${param}/permissions/${0}`;
        return await Http.delete(url, param);
    };



    // 查询用户数据
    getRoleUserDate = async (param) => {
        let url = `/roles/${param.id}/users`;
        return await Http.get(url, param);
    };
    // 新增用户数据
    addRoleUserDate = async (param) => {
        let url = `/roles/${param.roleId}/users`;
        return await Http.post(url, param);
    };
    // 平台用户删除
    delRoleUsers = async (param) => {
        let url = `/roles/${param.rid}/users/${param.uid}`;
        return await Http.delete(url);
    };



    // 区域树查询
    qryRegionTree = async (param) => {
        let url = 'mock/system/rolesController/qryRegionTree';
        return await Http.post(url, param);
    };
    // 区域树修改
    editRegion = async (param) => {
        let url = 'mock/system/rolesController/editRegion';
        return await Http.post(url, param);
    };
    // 区域查询
    qryRegion = async (param) => {
        let url = 'mock/system/rolesController/qryRegion';
        return await Http.post(url, param);
    };
}

export default new SysRoleMgService();
