package com.ztesoft.nps.safe.mapper;

import java.util.List;

import com.ztesoft.nps.safe.model.query.RoleUserListBo;
import org.apache.ibatis.annotations.Param;

import com.ztesoft.nps.safe.model.User;
import com.ztesoft.nps.safe.model.query.UserQuery;

public interface UserMapper {
	int add(User user);

	User findById(Long id);

	List<User> findByDeptId(@Param("deptId") Long deptId);

	User findByAccount(String account);

	User findByNo(String no);

	int update(User user);

	List<User> findByCondition(UserQuery condition);

	List<User> findByRoleId(Long id);

	List<User> findByRole(RoleUserListBo bo);

}
