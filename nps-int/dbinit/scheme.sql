/*
Navicat MySQL Data Transfer

Source Server         : 199mysql
Source Server Version : 50723
Source Host           : 10.45.50.199:3306
Source Database       : nps

Target Server Type    : MYSQL
Target Server Version : 50723
File Encoding         : 65001

Date: 2018-08-23 17:59:56
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for departments
-- ----------------------------
DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '部门ID',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '部门名称',
  `region_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '区域ID',
  `parent_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '父部门ID',
  `is_leaf` tinyint(3) unsigned DEFAULT '1' COMMENT '是否叶子节点(1:叶子节点 0:非叶子节点)',
  `status` tinyint(3) unsigned DEFAULT '1' COMMENT '状态（1:有效 0:无效）',
  `type` tinyint(3) unsigned DEFAULT '1' COMMENT '部门类型',
  `level` tinyint(3) unsigned DEFAULT '1' COMMENT '部门级别',
  `created_by` varchar(64) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modified_by` varchar(64) NOT NULL DEFAULT '' COMMENT '修改人',
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='部门';

-- ----------------------------
-- Records of departments
-- ----------------------------

-- ----------------------------
-- Table structure for permissions
-- ----------------------------
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '权限ID',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '权限名称',
  `type` tinyint(3) unsigned DEFAULT '1' COMMENT '权限类型',
  `url` varchar(512) NOT NULL DEFAULT '' COMMENT '链接URL',
  `app_type` tinyint(3) unsigned DEFAULT '1' COMMENT '应用类型',
  `status` tinyint(3) unsigned DEFAULT '1' COMMENT '状态',
  `parent_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '父权限ID',
  `is_leaf` tinyint(3) unsigned DEFAULT '1' COMMENT '是否叶子节点(1:叶子节点 0:非叶子节点)',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT '权限描述',
  `created_by` varchar(64) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modified_by` varchar(64) NOT NULL DEFAULT '' COMMENT '修改人',
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='权限';

-- ----------------------------
-- Records of permissions
-- ----------------------------

-- ----------------------------
-- Table structure for qstnaire_bank
-- ----------------------------
DROP TABLE IF EXISTS `qstnaire_bank`;
CREATE TABLE `qstnaire_bank` (
  `qstnaire_id` varchar(32) NOT NULL COMMENT '问卷标识(从序列取值seq_questionnaire_bank_id)',
  `qstnaire_title` varchar(100) NOT NULL COMMENT '问卷标题',
  `qstnaire_leadin` varchar(500) DEFAULT '欢迎参与本次问卷答题。' COMMENT '问卷欢迎语',
  `catalog_id` smallint(6) NOT NULL COMMENT '问卷分类',
  `belong_to` tinyint(1) NOT NULL DEFAULT '2' COMMENT '问卷归属(1 标准问卷/2 定制问卷),默认2定制问卷',
  `create_uid` bigint(12) NOT NULL COMMENT '创建人',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `status` varchar(2) NOT NULL COMMENT '状态(00 停用/01 启用/02 草稿/03 待审核/04 审核不通过)',
  `is_inst` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否问卷实例(1 是/0 否)',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  PRIMARY KEY (`qstnaire_id`),
  KEY `FK_Reference_42` (`catalog_id`),
  CONSTRAINT `FK_Reference_42` FOREIGN KEY (`catalog_id`) REFERENCES `qstnaire_catalog` (`catalog_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='问卷库';

-- ----------------------------
-- Records of qstnaire_bank
-- ----------------------------

-- ----------------------------
-- Table structure for qstnaire_catalog
-- ----------------------------
DROP TABLE IF EXISTS `qstnaire_catalog`;
CREATE TABLE `qstnaire_catalog` (
  `catalog_id` smallint(6) NOT NULL COMMENT '目录标识',
  `catalog_name` varchar(100) NOT NULL COMMENT '目录名称',
  `catalog_level` tinyint(2) NOT NULL COMMENT '目录级别(0 问卷大类/1 问卷分类/2 题目分类)',
  `parent_id` smallint(6) NOT NULL COMMENT '上级节点(根节点上级为0)',
  `status` varchar(3) NOT NULL DEFAULT '00A' COMMENT '状态（00A 有效、00X 无效）',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `create_uid` bigint(12) DEFAULT NULL COMMENT '创建人',
  PRIMARY KEY (`catalog_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='问卷目录';

-- ----------------------------
-- Records of qstnaire_catalog
-- ----------------------------

-- ----------------------------
-- Table structure for qstnaire_logic_setup
-- ----------------------------
DROP TABLE IF EXISTS `qstnaire_logic_setup`;
CREATE TABLE `qstnaire_logic_setup` (
  `qstnaire_id` varchar(32) NOT NULL COMMENT '问卷标识',
  `setup_question_order` tinyint(3) NOT NULL COMMENT '设置题目序号',
  `option_order` varchar(20) NOT NULL COMMENT '选项序号(0为任意选项)\r\n            关联逻辑：可存储多个序号，以英文逗号隔开,例如 1,2,3,4（选项之间都是或关系）',
  `skipto_question_order` bigint(12) NOT NULL COMMENT '跳转题目序号(结束作为特殊的题目（-1 提前结束（计入结果）/-2 提前结束（不计入结果））)',
  `logic_type` varchar(2) NOT NULL COMMENT '00关联逻辑/01跳转逻辑/02 其他',
  `act_type` tinyint(1) NOT NULL COMMENT '动作类型(0 选择/1 没有选择)\r\n            默认0，多选可以设置1',
  `and_or` tinyint(1) DEFAULT NULL COMMENT 'and 0，or 1',
  `is_main` tinyint(1) DEFAULT '0' COMMENT '逻辑类型为关联逻辑，多个关联题的关联关系为且，最大题号为组索引 1，否则为0\r\n            是1 否0\r\n            默认为0',
  PRIMARY KEY (`qstnaire_id`,`option_order`,`logic_type`),
  CONSTRAINT `FK_Reference_40` FOREIGN KEY (`qstnaire_id`) REFERENCES `qstnaire_bank` (`qstnaire_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='问卷逻辑设置';

-- ----------------------------
-- Records of qstnaire_logic_setup
-- ----------------------------

-- ----------------------------
-- Table structure for qstnaire_question
-- ----------------------------
DROP TABLE IF EXISTS `qstnaire_question`;
CREATE TABLE `qstnaire_question` (
  `qstnaire_id` varchar(32) NOT NULL COMMENT '问卷标识',
  `question_id` varchar(32) NOT NULL COMMENT '题目标识，如果该数据是分页，标识为-1',
  `question_order` tinyint(3) NOT NULL COMMENT '题目序号',
  `is_blank` tinyint(1) NOT NULL DEFAULT '0' COMMENT '该题是否必答(0 是/1 否)\r\n            默认为是',
  `is_paging` tinyint(1) NOT NULL DEFAULT '0' COMMENT '后面是否分页(1 是/0 否)，如果是，该分页也作为一个题目数据。',
  `page_txt` varchar(500) DEFAULT NULL,
  `is_nps` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'NPS评分题(1 是/0 否)',
  `is_satisfied` tinyint(1) NOT NULL DEFAULT '0' COMMENT '满意度评分题(1 是/0 否)',
  PRIMARY KEY (`qstnaire_id`,`question_order`),
  KEY `FK_Reference_29` (`question_id`),
  CONSTRAINT `FK_Reference_16` FOREIGN KEY (`qstnaire_id`) REFERENCES `qstnaire_bank` (`qstnaire_id`),
  CONSTRAINT `FK_Reference_29` FOREIGN KEY (`question_id`) REFERENCES `question_bank` (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='问卷包含题目';

-- ----------------------------
-- Records of qstnaire_question
-- ----------------------------

-- ----------------------------
-- Table structure for question_bank
-- ----------------------------
DROP TABLE IF EXISTS `question_bank`;
CREATE TABLE `question_bank` (
  `question_id` varchar(32) NOT NULL COMMENT '题目标识(从序列取值seq_question_bank_id)',
  `question_name` varchar(500) NOT NULL COMMENT '题目名称',
  `question_name2` varchar(500) DEFAULT NULL COMMENT '题目名称',
  `question_type` varchar(2) NOT NULL COMMENT '题目类型(01 单选题/02 多选题/03 单行填空题/04 多行填空题/05 矩阵单选题/06 矩阵多选题)00就是分页题',
  `question_category` smallint(6) NOT NULL COMMENT '题目分类(1 终端/2 套餐/3 流量/4 账单/0 其它)',
  `is_common` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否公共题目（1 是/0 否），问卷包含题目属于私有题目，题库管理创建的题目为公共题目。',
  `is_nps` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'NPS评分题(1 是/0 否)',
  `is_satisfied` tinyint(1) NOT NULL DEFAULT '0' COMMENT '满意度评分题(1 是/0 否)',
  `option_layout` tinyint(1) NOT NULL DEFAULT '0' COMMENT '选项布局(0 不限/1 竖排/2 横排)',
  `content_check` tinyint(1) NOT NULL DEFAULT '0' COMMENT '内容校验(0 不限/1 数字/2 字符/3 中文/4 EMAIL/5 手机号码)',
  `lenth_check` bigint(12) NOT NULL DEFAULT '0' COMMENT '字数限制（0为不限制）',
  `create_uid` bigint(12) NOT NULL COMMENT '创建人',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `status` varchar(2) NOT NULL DEFAULT '01' COMMENT '状态(00 停用/01 启用)',
  `question_tags` varchar(200) DEFAULT NULL COMMENT '标签',
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='题库';

-- ----------------------------
-- Records of question_bank
-- ----------------------------

-- ----------------------------
-- Table structure for question_option
-- ----------------------------
DROP TABLE IF EXISTS `question_option`;
CREATE TABLE `question_option` (
  `option_id` varchar(32) NOT NULL COMMENT '选项序号',
  `question_id` varchar(32) NOT NULL COMMENT '题目标识(从序列取值seq_question_bank_id)',
  `option_order` tinyint(3) NOT NULL COMMENT '选项序号',
  `option_name` varchar(200) NOT NULL COMMENT '选项内容',
  `is_other` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否其它注明(0 否/1 是)',
  PRIMARY KEY (`option_id`),
  KEY `FK_Reference_46` (`question_id`),
  CONSTRAINT `FK_Reference_46` FOREIGN KEY (`question_id`) REFERENCES `question_bank` (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='题目选项';

-- ----------------------------
-- Records of question_option
-- ----------------------------

-- ----------------------------
-- Table structure for regions
-- ----------------------------
DROP TABLE IF EXISTS `regions`;
CREATE TABLE `regions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '区域ID',
  `area_id` bigint(20) unsigned NOT NULL COMMENT '区域标识',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '区域名称',
  `type` tinyint(3) unsigned DEFAULT '0' COMMENT '区域类型',
  `code` varchar(64) NOT NULL DEFAULT '' COMMENT '区域码',
  `sequence` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '序号',
  `parent_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '父区域ID',
  `is_leaf` tinyint(3) unsigned DEFAULT '1' COMMENT '是否叶子节点(1:叶子节点 0:非叶子节点)',
  `created_by` varchar(64) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modified_by` varchar(64) NOT NULL DEFAULT '' COMMENT '修改人',
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `area_id` (`area_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COMMENT='区域';

-- ----------------------------
-- Records of regions
-- ----------------------------

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '角色名称',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT '角色描述',
  `parent_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '父角色ID',
  `is_leaf` tinyint(3) unsigned DEFAULT '1' COMMENT '是否叶子节点(1:叶子节点 0:非叶子节点)',
  `created_by` varchar(64) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modified_by` varchar(64) NOT NULL DEFAULT '' COMMENT '修改人',
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色';

-- ----------------------------
-- Records of roles
-- ----------------------------

-- ----------------------------
-- Table structure for role_permission
-- ----------------------------
DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE `role_permission` (
  `role_id` bigint(20) unsigned NOT NULL COMMENT '角色ID',
  `permission_id` bigint(20) unsigned NOT NULL COMMENT '权限ID',
  `created_by` varchar(64) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modified_by` varchar(64) NOT NULL DEFAULT '' COMMENT '修改人',
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`role_id`,`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色权限';

-- ----------------------------
-- Records of role_permission
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `no` varchar(64) NOT NULL DEFAULT '' COMMENT '用户工号',
  `account` varchar(64) NOT NULL DEFAULT '' COMMENT '用户帐号',
  `name` varchar(64) NOT NULL DEFAULT '' COMMENT '用户姓名',
  `sex` varchar(32) NOT NULL DEFAULT 'F' COMMENT '性别',
  `cellphone` varchar(64) NOT NULL DEFAULT '' COMMENT '手机号',
  `email` varchar(128) NOT NULL DEFAULT '' COMMENT '邮箱',
  `identity_card` varchar(64) NOT NULL DEFAULT '' COMMENT '身份证',
  `status` tinyint(3) unsigned DEFAULT '1' COMMENT '状态',
  `password` varchar(128) NOT NULL DEFAULT '' COMMENT '帐号密码',
  `salt` varchar(128) NOT NULL DEFAULT '' COMMENT '密码盐值',
  `dept_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '部门ID',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `created_by` varchar(64) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modified_by` varchar(64) NOT NULL DEFAULT '' COMMENT '修改人',
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `no` (`no`),
  UNIQUE KEY `account` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='用户';

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', '10000', 'admin', '管理员', 'F', '189432435', 'admin@ztesoft.com', '5434324326432', '1', 'd5ba2f763ef411812252a1d093d597c4', '32', '0', '系统管理员', '', '2018-08-13 14:15:51', '', '2018-08-13 14:15:51');

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `user_id` bigint(20) unsigned NOT NULL COMMENT '用户ID',
  `role_id` bigint(20) unsigned NOT NULL COMMENT '角色ID',
  `created_by` varchar(64) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modified_by` varchar(64) NOT NULL DEFAULT '' COMMENT '修改人',
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户角色';

-- ----------------------------
-- Records of user_role
-- ----------------------------
