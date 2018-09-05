import Http from '../../common/Http';

class DeptService {
    //获取区域树
    getDomainTree = async (param) => {
        var url = 'regionMgr/regionList';
        return await Http.post(url, param);
    };
    // 获取部门树
    getDeptTree = async (param) => {
        // var url = 'mock/dept/getDeptTree';
        var url = 'deptMgr/deptList';
        return await Http.post(url, param);
    };
    //校验部门名唯一性
    checkDeptName = async (param) => {
        var url = 'mock/dept/checkDeptName';
        return await Http.post(url, param);
    };
    // 新增部门
    addDept = async (param) => {
        var url = 'deptMgr/addDept';
        return await Http.post(url, param);
    };
    //修改部门
    ediDept = async (param) => {
        var url = 'deptMgr/updateDept';
        return await Http.post(url, param);
    };
    //删除部门
    dleDept = async (param) => {
        var url = 'deptMgr/deleteDept';
        return await Http.post(url, param);
    };

    //获取员工数据
    getStaffData = async (param) => {
        var url = 'userMgr/userList';
        return await Http.post(url, param);
    };
    // 新增员工
    addStaff = async (param) => {
        var url = 'userMgr/addUser';
        return await Http.post(url, param);
    };
    //修改员工
    ediStaff = async (param) => {
        var url = 'userMgr/updateUser';
        return await Http.post(url, param);
    };
    // 获取角色树
    getRoleTree = async (param) => {
        var url = 'roleMgr/roleList';
        return await Http.post(url, param);
    };
    // 新增角色
    addRole = async (param) => {
        var url = 'roleMgr/addRole';
        return await Http.post(url, param);
    };
    // 删除角色
    dleRole = async (param) => {
        var url = 'roleMgr/deleteRole';
        return await Http.post(url, param);
    };
    // 获取权限树
    getAuthorityTree = async (param) => {
        var url = 'permissionMgr/permissionList';
        return await Http.post(url, param);
    };
    // 获取所有权限数据
    getAllAuthorityData = async (param) => {
        var url = 'permissionMgr/permissionList';
        return await Http.post(url, param);
    };
    // 更改部门
    changeDept = async (param) => {
        var url = '/userMgr/updateUser';
        return await Http.post(url, param);
    }
}

export default new DeptService();
