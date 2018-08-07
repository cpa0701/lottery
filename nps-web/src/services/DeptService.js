import Http from '../common/Http';

class DeptService {
    // 获取部门树
    getDeptTree = async (param) => {
        var url = 'mock/dept/initDeptTree';
        return await Http.post(url, param);
    }
    //校验部门名唯一性
    checkDeptName = async (param) => {
        var url = 'mock/dept/checkDeptName';
        return await Http.post(url, param);
    }
    // 新增部门
    addMenuSys = async (param) => {
        var url = 'mock/dept/addMenuSys';
        return await Http.post(url, param);
    }
    //修改部门
    ediMenuSys = async (param) => {
        var url = 'mock/dept/ediMenuSys';
        return await Http.post(url, param);
    }
}

export default new DeptService();
