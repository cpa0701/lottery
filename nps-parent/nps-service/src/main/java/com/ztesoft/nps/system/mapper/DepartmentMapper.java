package com.ztesoft.nps.system.mapper;

import java.util.List;

import com.ztesoft.nps.system.model.Department;
import com.ztesoft.nps.system.query.DepartmentQuery;

public interface DepartmentMapper {
	int add(Department dept);

	Department findById(Long id);

	List<Department> findByCondition(DepartmentQuery condition);

	List<Department> findByParentId(Long id);

	List<Department> findByRegionId(Long id);

	int update(Department dept);

	int delete(Department dept);

	int findChildCount(Long id);
}
