CREATE TABLE `regions`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '区域ID',
  `area_id` bigint UNSIGNED NOT NULL COMMENT '区域标识',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '区域名称',
  `type` tinyint UNSIGNED DEFAULT 0 COMMENT '区域类型',
  `code` varchar(64) NOT NULL DEFAULT '' COMMENT '区域码',
  `sequence` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '序号',
  `parent_id` bigint UNSIGNED NOT NULL DEFAULT 0 COMMENT '父区域ID',
  `is_leaf` tinyint UNSIGNED DEFAULT 1 COMMENT '是否叶子节点(1:叶子节点 0:非叶子节点)',
  `created_by` varchar(64) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modified_by` varchar(64) NOT NULL DEFAULT '' COMMENT '修改人',
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY (`area_id`)
) engine=innodb charset=utf8mb4 comment '区域';

CREATE TABLE `departments`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '部门ID',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '部门名称',
  `region_id` bigint UNSIGNED NOT NULL DEFAULT 0 COMMENT '区域ID',
  `parent_id` bigint UNSIGNED NOT NULL DEFAULT 0 COMMENT '父部门ID',
  `is_leaf` tinyint UNSIGNED DEFAULT 1 COMMENT '是否叶子节点(1:叶子节点 0:非叶子节点)',
  `status` tinyint UNSIGNED DEFAULT 1 COMMENT '状态（1:有效 0:无效）',
  `type` tinyint UNSIGNED DEFAULT 1 COMMENT '部门类型',
  `level` tinyint UNSIGNED DEFAULT 1 COMMENT '部门级别',
  `created_by` varchar(64) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modified_by` varchar(64) NOT NULL DEFAULT '' COMMENT '修改人',
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) engine=innodb charset=utf8mb4 comment '部门';


CREATE TABLE `users`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `no` varchar(64) NOT NULL DEFAULT '' COMMENT '用户工号',
  `account` varchar(64) NOT NULL DEFAULT '' COMMENT '用户帐号',
  `name` varchar(64) NOT NULL DEFAULT '' COMMENT '用户姓名',
  `sex` varchar(32) NOT NULL DEFAULT 'F' COMMENT '性别',
  `cellphone` varchar(64) NOT NULL DEFAULT '' COMMENT '手机号',
  `email` varchar(128) NOT NULL DEFAULT '' COMMENT '邮箱',
  `identity_card` varchar(64) NOT NULL DEFAULT '' COMMENT '身份证',
  `status` tinyint UNSIGNED DEFAULT 1 COMMENT '状态',
  `password` varchar(128) NOT NULL DEFAULT '' COMMENT '帐号密码',
  `salt` varchar(128) NOT NULL DEFAULT '' COMMENT '密码盐值',
  `dept_id` bigint UNSIGNED NOT NULL DEFAULT 0 COMMENT '部门ID',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `created_by` varchar(64) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modified_by` varchar(64) NOT NULL DEFAULT '' COMMENT '修改人',
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY (`no`),
  UNIQUE KEY (`account`)
) engine=innodb charset=utf8mb4 comment '用户';

CREATE TABLE `roles`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '角色名称',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT '角色描述',
  `parent_id` bigint UNSIGNED NOT NULL DEFAULT 0 COMMENT '父角色ID',
  `is_leaf` tinyint UNSIGNED DEFAULT 1 COMMENT '是否叶子节点(1:叶子节点 0:非叶子节点)',
  `created_by` varchar(64) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modified_by` varchar(64) NOT NULL DEFAULT '' COMMENT '修改人',
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) engine=innodb charset=utf8mb4 comment '角色';

CREATE TABLE `permissions`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '权限ID',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '权限名称',
  `type` tinyint UNSIGNED DEFAULT 1 COMMENT '权限类型',
  `url` varchar(512) NOT NULL DEFAULT '' COMMENT '链接URL',
  `app_type` tinyint UNSIGNED DEFAULT 1 COMMENT '应用类型',
  `status` tinyint UNSIGNED DEFAULT 1 COMMENT '状态',
  `parent_id` bigint UNSIGNED NOT NULL DEFAULT 0 COMMENT '父权限ID',
  `is_leaf` tinyint UNSIGNED DEFAULT 1 COMMENT '是否叶子节点(1:叶子节点 0:非叶子节点)',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT '权限描述',
  `created_by` varchar(64) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modified_by` varchar(64) NOT NULL DEFAULT '' COMMENT '修改人',
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) engine=innodb charset=utf8mb4 comment '权限';

CREATE TABLE `role_permission`  (
  `role_id` bigint UNSIGNED NOT NULL COMMENT '角色ID',
  `permission_id` bigint UNSIGNED NOT NULL COMMENT '权限ID',
  `created_by` varchar(64) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modified_by` varchar(64) NOT NULL DEFAULT '' COMMENT '修改人',
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`role_id`, `permission_id`)
) engine=innodb charset=utf8mb4 comment '角色权限';

CREATE TABLE `user_role`  (
  `user_id` bigint UNSIGNED NOT NULL COMMENT '用户ID',
  `role_id` bigint UNSIGNED NOT NULL COMMENT '角色ID',
  `created_by` varchar(64) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modified_by` varchar(64) NOT NULL DEFAULT '' COMMENT '修改人',
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`user_id`, `role_id`)
) engine=innodb charset=utf8mb4 comment '用户角色';