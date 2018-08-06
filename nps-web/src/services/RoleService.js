import Http from '../../../../common/Http';

class SysRoleMgService {
  // 平台角色列表分页查询
  qryRolePage = async (param) => {
    var url = 'system/rolesController/qryRolesPage';
    return await Http.post(url, param);
  }
  // 平台角色新增
  addRoles = async (param) => {
    var url = 'system/rolesController/addRoles';
    return await Http.post(url, param);
  }
  // 平台角色删除
  delRoles = async (param) => {
    var url = 'system/rolesController/delRoles';
    return await Http.post(url, param);
  }
  // 平台角色批量删除
  delAllRoles = async (param) => {
    var url = 'system/rolesController/delAllRoles';
    return await Http.post(url, param);
  }
  // 平台角色修改
  editRoles = async (param) => {
    var url = 'system/rolesController/editRoles';
    return await Http.post(url, param);
  }
  // 检查平台角色名称唯一
  checkSysRoleName = async (param) => {
    var url = 'system/rolesController/checkSysRoleName';
    return await Http.post(url, param);
  }
  // 平台角色权限列表分页查询
  qrylRolePrivPage = async (param) => {
    var url = 'system/rolePrivController/qrylRolePrivPage';
    return await Http.post(url, param);
  }
  // 平台角色权限列表级联分页查询
  qryRolePrivPageCascade = async (param) => {
    var url = 'system/rolePrivController/qryRolePrivPageCascade';
    return await Http.post(url, param);
  }
  // 增加角色权限
  addRolePriv = async (param) => {
    var url = 'system/rolePrivController/addRolePriv';
    return await Http.post(url, param);
  }
  // 删除角色权限
  delRolePriv = async (param) => {
    var url = 'system/rolePrivController/delRolePriv';
    return await Http.post(url, param);
  }
}

export default new SysRoleMgService();
