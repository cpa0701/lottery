package com.ztesoft.nps.safe.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ztesoft.nps.safe.mapper.RoleMapper;
import com.ztesoft.nps.safe.mapper.RolePermissionMapper;
import com.ztesoft.nps.safe.mapper.UserRoleMapper;
import com.ztesoft.nps.safe.model.Role;
import com.ztesoft.nps.safe.model.RolePermission;
import com.ztesoft.nps.safe.model.UserRole;
import com.ztesoft.nps.safe.model.query.RoleQuery;
import com.ztesoft.nps.safe.service.RoleService;

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
		// 新增节点为叶子节点
		role.setLeaf(Boolean.TRUE);
		roleMapper.add(role);

		Role pRole = roleMapper.findById(role.getParentId());
		if (pRole != null) {
			// 父节点变为非叶子节点
			pRole.setLeaf(Boolean.FALSE);
			pRole.setModifiedBy(role.getModifiedBy());
			roleMapper.update(pRole);
		}

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
		if (condition.getParentId()==null){
			condition.setParentId(0L);
		}
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

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int addUser(UserRole userRole) {
		return userRoleMapper.addUser(userRole);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int deleteUser(UserRole userRole) {
		return userRoleMapper.delete(userRole);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Role> findByUserId(Long id) {
		return roleMapper.findByUserId(id);
	}

	@Override
	public int delete(Role role) {
		roleMapper.delete(role);

		int cnt = roleMapper.findChildCount(role.getParentId());
		if (cnt <= 0) {
			// 将被删节点的父节点转换位叶子节点
			Role pRole = roleMapper.findById(role.getParentId());
			pRole.setLeaf(Boolean.TRUE);
			pRole.setModifiedBy(role.getModifiedBy());
			roleMapper.update(pRole);
		}

		return 1;
	}

}
