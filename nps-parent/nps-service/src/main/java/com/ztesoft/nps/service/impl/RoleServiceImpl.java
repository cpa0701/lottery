package com.ztesoft.nps.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ztesoft.nps.mapper.RoleMapper;
import com.ztesoft.nps.model.Role;
import com.ztesoft.nps.service.RoleService;

@Service("roleService")
public class RoleServiceImpl implements RoleService {
	@Autowired
	private RoleMapper roleMapper;

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

}
