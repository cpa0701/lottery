import Http from '../common/Http';

class DeptService {
    //获取区域树
    getDomainTree = async (param) => {
        var url = 'regions';
        return await Http.get(url, param);
    }
    // 获取部门树
    getDeptTree = async (param) => {
        // var url = 'mock/dept/getDeptTree';
        var url = 'departments';
        return await Http.get(url, param);
    }
    //校验部门名唯一性
    checkDeptName = async (param) => {
        var url = 'mock/dept/checkDeptName';
        return await Http.post(url, param);
    }
    // 新增部门
    addDept = async (param) => {
        var url = 'departments';
        return await Http.post(url, param);
    }
    //修改部门
    ediDept = async (param) => {
        var url = 'departments/' + param.id;
        return await Http.put(url, param);
    }
    //删除部门
    dleDept = async (param) => {
        var url = 'departments/' + param.id;
        return await Http.delete(url);
    }
    //获取员工数据
    getStaffData = async (param) => {
        var url = 'users';
        return await Http.get(url, param);
    }
    // 新增员工
    addStaff = async (param) => {
        var url = 'users';
        return await Http.post(url, param);
    }
    //修改员工
    ediStaff = async (param) => {
        var url = 'users/' + param.id;
        return await Http.put(url, param);
    }
    // 获取角色树
    getRoleTree = async (param) => {
        var url = 'roles';
        return await Http.get(url, param);
    }
    // 新增角色
    addRole = async (param) => {
        var url = 'mock/dept/addRole';
        return await Http.post(url, param);
    }
    // 新增角色
    editAuthority = async (param) => {
        var url = 'mock/dept/editAuthority';
        return await Http.post(url, param);
    }
    // 删除角色
    dleRole = async (param) => {
        var url = 'mock/dept/dleRole';
        return await Http.post(url, param);
    }
    // 获取权限树
    getAuthorityTree = async (param) => {
        var url = 'permissions';
        return await Http.get(url, param);
    }
    // 获取所有权限数据
    getAllAuthorityData = async (param) => {
        var url = 'mock/dept/getAllAuthorityData';
        return await Http.post(url, param);
    }
    // 更改部门
    changeDept = async (param) => {
        var url = 'users/' + param.id;
        return await Http.put(url, param);
    }
}

export default new DeptService();
