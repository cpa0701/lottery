package com.ztesoft.nps.safe.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ztesoft.nps.safe.mapper.DepartmentMapper;
import com.ztesoft.nps.safe.model.Department;
import com.ztesoft.nps.safe.model.query.DepartmentQuery;
import com.ztesoft.nps.safe.service.DepartmentService;

@Service("departmentService")
public class DepartmentServiceImpl implements DepartmentService {
	@Autowired
	private DepartmentMapper departmentMapper;

	@Transactional(rollbackFor = Exception.class)
	@Override
	public Department add(Department dept) {
		// 新增节点为叶子节点
		dept.setLeaf(Boolean.TRUE);
		departmentMapper.add(dept);

		Department pDept = departmentMapper.findById(dept.getParentId());
		if (pDept != null) {
			// 父节点变为非叶子节点
			pDept.setLeaf(Boolean.FALSE);
			pDept.setModifiedBy(dept.getModifiedBy());
			departmentMapper.update(pDept);
		}

		return departmentMapper.findById(dept.getId());
	}

	@Transactional(readOnly = true)
	@Override
	public Department findById(Long id) {
		return departmentMapper.findById(id);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Department> findByCondition(DepartmentQuery condition) {
		return departmentMapper.findByCondition(condition);
	}

	@Transactional(readOnly = true)
	@Override
	public List<Department> findByRegionId(Long id) {
		return departmentMapper.findByRegionId(id);
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public Department update(Department dept) {
		departmentMapper.update(dept);
		return departmentMapper.findById(dept.getId());
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int delete(Department dept) {
		departmentMapper.delete(dept);

		int cnt = departmentMapper.findChildCount(dept.getParentId());
		if (cnt <= 0) {
			// 将被删节点的父节点转换位叶子节点
			Department pDept = departmentMapper.findById(dept.getParentId());
			pDept.setLeaf(Boolean.TRUE);
			pDept.setModifiedBy(dept.getModifiedBy());
			departmentMapper.update(pDept);
		}

		return 1;
	}

	@Transactional(readOnly = true)
	@Override
	public List<Department> findByParentId(Long id) {
		return departmentMapper.findByParentId(id);
	}

}
