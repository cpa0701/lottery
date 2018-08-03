package com.ztesoft.nps.service;

import java.util.List;

import com.ztesoft.nps.model.Department;

public interface DepartmentService {
	Department add(Department dept);

	int delete(Department dept);

	int deleteById(Long id);

	Department update(Department dept);

	Department findById(Long id);

	List<Department> findByPage(int pageNum, int pageSize);
}
