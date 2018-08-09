package com.ztesoft.nps.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ztesoft.nps.mapper.RoleMapper;
import com.ztesoft.nps.mapper.RolePermissionMapper;
import com.ztesoft.nps.mapper.UserRoleMapper;
import com.ztesoft.nps.model.Role;
import com.ztesoft.nps.model.RolePermission;
import com.ztesoft.nps.model.UserRole;
import com.ztesoft.nps.query.RoleQuery;
import com.ztesoft.nps.service.RoleService;

@Service("roleService")
public class RoleServiceImpl implements RoleService {
	@Autowired
	private RoleMapper roleMapper;

	@Autowired
	private RolePermissionMapper rolePermissionMapper;

	@Autowired
	private UserRoleMapper userRoleMapper;

	@Transactional(rollbackFor = Exception.class)
	@Override
	public Role add(Role role) {
		roleMapper.add(role);
		return roleMapper.findById(role.getId());
	}

	@Transactional(readOnly = true)
	@Override
	public Role findById(Long id) {
		return roleMapper.findById(id);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Role> findByParentId(Long id) {
		return roleMapper.findByParentId(id);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public Role update(Role role) {
		roleMapper.update(role);
		return roleMapper.findById(role.getId());
	}

	@Transactional(readOnly = true)
	@Override
	public List<Role> findByCondition(RoleQuery condition) {
		return roleMapper.findByCondition(condition);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int addPermission(RolePermission rolePermission) {
		return rolePermissionMapper.addPermission(rolePermission);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int deletePermission(RolePermission rolePermission) {
		return rolePermissionMapper.delete(rolePermission);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Role> findByPermissionId(Long id) {
		return roleMapper.findByPermissionId(id);
	}

	@Override
	public int addUser(UserRole userRole) {
		return userRoleMapper.addUser(userRole);
	}

	@Override
	public int deleteUser(UserRole userRole) {
		return userRoleMapper.delete(userRole);
	}

	@Override
	public List<Role> findByUserId(Long id) {
		return roleMapper.findByUserId(id);
	}

}
