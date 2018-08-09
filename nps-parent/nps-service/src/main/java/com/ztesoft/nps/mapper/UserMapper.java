package com.ztesoft.nps.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ztesoft.nps.model.User;
import com.ztesoft.nps.query.UserQuery;

public interface UserMapper {
	int add(User user);

	User findById(Long id);

	List<User> findByDeptId(@Param("deptId") Long deptId);

	User findByAccount(String account);

	User findByNo(String no);

	int update(User user);

	List<User> findByCondition(UserQuery condition);
}
