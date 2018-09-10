package com.ztesoft.nps.safe.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ztesoft.nps.safe.mapper.PermissionMapper;
import com.ztesoft.nps.safe.mapper.RolePermissionMapper;
import com.ztesoft.nps.safe.model.Permission;
import com.ztesoft.nps.safe.model.RolePermission;
import com.ztesoft.nps.safe.model.query.PermissionQuery;
import com.ztesoft.nps.safe.service.PermissionService;

@Service("permissionService")
public class PermissionServiceImpl implements PermissionService {
	@Autowired
	private PermissionMapper permissionMapper;

	@Autowired
	private RolePermissionMapper rolePermissionMapper;

	@Transactional(rollbackFor = Exception.class)
	@Override
	public Permission add(Permission permission) {
		// 新增节点为叶子节点
		permission.setLeaf(Boolean.TRUE);
		permissionMapper.add(permission);

		Permission pPermission = permissionMapper.findById(permission.getParentId());
		if (pPermission != null) {
			// 父节点变为非叶子节点
			pPermission.setLeaf(Boolean.FALSE);
			pPermission.setModifiedBy(permission.getModifiedBy());
			permissionMapper.update(pPermission);
		}

		return permissionMapper.findById(permission.getId());
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public Permission update(Permission permission) {
		permissionMapper.update(permission);
		return permissionMapper.findById(permission.getId());
	}

	@Transactional(readOnly = true)
	@Override
	public Permission findById(Long id) {
		return permissionMapper.findById(id);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Permission> findByCondition(PermissionQuery condition) {
		return permissionMapper.findByCondition(condition);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Permission> findByRoleId(Long id) {
		return permissionMapper.findByRoleId(id);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int addRole(RolePermission rolePermission) {
		return rolePermissionMapper.addRole(rolePermission);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int deleteRole(RolePermission rolePermission) {
		return rolePermissionMapper.delete(rolePermission);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Permission> findByUserId(Long id) {
		return permissionMapper.findByUserId(id);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Permission> findByParentId(Long id) {
		return permissionMapper.findByParentId(id);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int delete(Permission permission) {

		permissionMapper.delete(permission);

		int cnt = permissionMapper.findChildCount(permission.getParentId());
		if (cnt <= 0) {
			// 将被删节点的父节点转换位叶子节点
			Permission pPermission = permissionMapper.findById(permission
					.getParentId());
			pPermission.setLeaf(Boolean.TRUE);
			pPermission.setModifiedBy(permission.getModifiedBy());
			permissionMapper.update(pPermission);
		}

		return 1;
	}

}
