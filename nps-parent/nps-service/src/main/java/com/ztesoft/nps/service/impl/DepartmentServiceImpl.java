package com.ztesoft.nps.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ztesoft.nps.mapper.DepartmentMapper;
import com.ztesoft.nps.model.Department;
import com.ztesoft.nps.service.DepartmentService;

@Service("departmentService")
public class DepartmentServiceImpl implements DepartmentService {
	@Autowired
	private DepartmentMapper departmentMapper;

	@Transactional(rollbackFor = Exception.class)
	@Override
	public Department add(Department dept) {
		departmentMapper.add(dept);
		return departmentMapper.findById(dept.getId());
	}

	@Transactional(readOnly = true)
	@Override
	public Department findById(Long id) {
		return departmentMapper.findById(id);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Department> findByParentId(Long id) {
		return departmentMapper.findByParentId(id);
	}

}
