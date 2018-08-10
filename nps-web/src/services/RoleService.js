import Http from '../common/Http';

class SysRoleMgService {
    // 角色树查询
    roleTree = async (params) => {
          // let url = 'mock/system/rolesController/qryRolesTree';
        let url = 'roles';
        return await Http.get(url, params);
    };
    // 角色树异步查询
    roleTreeAsync = async (param) => {
        // let url = 'mock/system/rolesController/qryRolesTree';
        let url = 'roles/' + param;
        return await Http.get(url);
    };
    // 平台角色新增
    addRoles = async (param) => {
        // let url = 'system/rolesController/addRoles';
        let url = 'roles';
        return await Http.post(url, param);
    };
    // 平台角色复制
    copyRoles = async (param) => {
        let url = 'system/rolesController/copyRoles';
        return await Http.post(url, param);
    };
    // 平台角色删除
    delRoles = async (param) => {
        let url = 'system/rolesController/delRoles';
        return await Http.post(url, param);
    };
    // 平台角色批量删除
    delAllRoles = async (param) => {
        let url = 'system/rolesController/delAllRoles';
        return await Http.post(url, param);
    };
    // 平台角色修改
    editRoles = async (param) => {
        let url = 'system/rolesController/editRoles';
        return await Http.post(url, param);
    };

    // 权限树查询
    qryAuthTree = async (param) => {
        let url = 'mock/system/rolesController/qryAuthTree';
        return await Http.post(url, param);
    };
    // 修改角色权限
    editRolePriv = async (param) => {
        let url = 'system/rolePrivController/editRolePriv';
        return await Http.post(url, param);
    };
    // 删除角色权限
    delRolePriv = async (param) => {
        let url = 'system/rolePrivController/delRolePriv';
        return await Http.post(url, param);
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

    // 查询用户数据
    getUserDate = async (param) => {
        let url = 'mock/system/rolesController/getUserDate';
        return await Http.post(url, param);
    };
    // 平台用户删除
    delUsers = async (param) => {
        let url = 'mock/system/rolesController/delUsers';
        return await Http.post(url, param);
    };
}

export default new SysRoleMgService();
