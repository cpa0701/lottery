package com.ztesoft.nps.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageHelper;
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
		return dept;
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int delete(Department dept) {
		return departmentMapper.delete(dept);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int deleteById(Long id) {
		return departmentMapper.deleteById(id);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public Department update(Department dept) {
		departmentMapper.update(dept);
		return dept;
	}

	@Transactional(readOnly = true)
	@Override
	public Department findById(Long id) {
		return departmentMapper.findById(id);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Department> findByPage(int pageNum, int pageSize) {
		PageHelper.startPage(pageNum, pageSize);

		return departmentMapper.findAll();
	}

}
