package com.ztesoft.nps.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ztesoft.nps.mapper.PermissionMapper;
import com.ztesoft.nps.model.Permission;
import com.ztesoft.nps.query.PermissionQuery;
import com.ztesoft.nps.service.PermissionService;

@Service("permissionService")
public class PermissionServiceImpl implements PermissionService {
	@Autowired
	private PermissionMapper permissionMapper;

	@Transactional(rollbackFor = Exception.class)
	@Override
	public Permission add(Permission permission) {
		permissionMapper.add(permission);
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

}
