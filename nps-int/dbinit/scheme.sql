/*
 Navicat Premium Data Transfer

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 50723
 Source Host           : localhost:3306
 Source Schema         : nps

 Target Server Type    : MySQL
 Target Server Version : 50723
 File Encoding         : 65001

 Date: 10/09/2018 21:29:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for auth_token
-- ----------------------------
DROP TABLE IF EXISTS `auth_token`;
CREATE TABLE `auth_token`  (
  `log_id` bigint(12) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(0) NOT NULL,
  `token` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'task_id+user_account+channel_id+res_sys',
  `task_user_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`log_id`) USING BTREE,
  INDEX `FK_Reference_39`(`task_user_id`) USING BTREE,
  CONSTRAINT `FK_Reference_39` FOREIGN KEY (`task_user_id`) REFERENCES `task_user` (`task_user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 735 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for departments
-- ----------------------------
DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '部门ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '部门名称',
  `region_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '区域ID',
  `parent_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '父部门ID',
  `is_leaf` tinyint(3) UNSIGNED NULL DEFAULT 1 COMMENT '是否叶子节点(1:叶子节点 0:非叶子节点)',
  `status` tinyint(3) UNSIGNED NULL DEFAULT 1 COMMENT '状态（1:有效 0:无效）',
  `type` tinyint(3) UNSIGNED NULL DEFAULT 1 COMMENT '部门类型',
  `level` tinyint(3) UNSIGNED NULL DEFAULT 1 COMMENT '部门级别',
  `created_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modified_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '修改人',
  `modified_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '部门' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for permissions
-- ----------------------------
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '权限ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '权限名称',
  `type` tinyint(3) UNSIGNED NULL DEFAULT 1 COMMENT '权限类型',
  `url` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '链接URL',
  `app_type` tinyint(3) UNSIGNED NULL DEFAULT 1 COMMENT '应用类型',
  `status` tinyint(3) UNSIGNED NULL DEFAULT 1 COMMENT '状态',
  `parent_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '父权限ID',
  `is_leaf` tinyint(3) UNSIGNED NULL DEFAULT 1 COMMENT '是否叶子节点(1:叶子节点 0:非叶子节点)',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '权限描述',
  `created_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modified_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '修改人',
  `modified_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '权限' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for qstnaire_bank
-- ----------------------------
DROP TABLE IF EXISTS `qstnaire_bank`;
CREATE TABLE `qstnaire_bank`  (
  `qstnaire_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '问卷标识(从序列取值seq_questionnaire_bank_id)',
  `qstnaire_title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '问卷标题',
  `qstnaire_leadin` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '欢迎参与本次问卷答题。' COMMENT '问卷欢迎语',
  `catalog_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '问卷分类',
  `belong_to` decimal(1, 0) NOT NULL DEFAULT 2 COMMENT '问卷归属(1 标准问卷/2 定制问卷),默认2定制问卷',
  `create_uid` bigint(12) NOT NULL COMMENT '创建人',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `status` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '状态(00 停用/01 启用/02 草稿/03 待审核/04 审核不通过)',
  `is_inst` decimal(1, 0) NOT NULL DEFAULT 0 COMMENT '是否问卷实例(1 是/0 否)',
  `update_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '最后修改时间',
  PRIMARY KEY (`qstnaire_id`) USING BTREE,
  INDEX `catalog_id`(`catalog_id`) USING BTREE,
  CONSTRAINT `catalog_id` FOREIGN KEY (`catalog_id`) REFERENCES `qstnaire_catalog` (`catalog_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '问卷库' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for qstnaire_catalog
-- ----------------------------
DROP TABLE IF EXISTS `qstnaire_catalog`;
CREATE TABLE `qstnaire_catalog`  (
  `catalog_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '目录标识',
  `catalog_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '目录名称',
  `catalog_level` smallint(2) NOT NULL COMMENT '目录级别(0 问卷大类/1 问卷分类/2 题目分类)',
  `parent_id` smallint(6) NOT NULL COMMENT '上级节点(根节点上级为0)',
  `status` varchar(3) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '00A' COMMENT '状态（00A 有效、00X 无效）',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `create_uid` bigint(12) NULL DEFAULT NULL COMMENT '创建人',
  PRIMARY KEY (`catalog_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '问卷目录' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for qstnaire_logic_setup
-- ----------------------------
DROP TABLE IF EXISTS `qstnaire_logic_setup`;
CREATE TABLE `qstnaire_logic_setup`  (
  `logic_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '逻辑标识',
  `logic_order` smallint(3) NOT NULL COMMENT '逻辑序号',
  `qstnaire_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '问卷标识',
  `setup_question_order` smallint(3) NOT NULL COMMENT '设置题目序号',
  `option_order` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '选项序号(0为任意选项)\r\n            关联逻辑：可存储多个序号，以英文逗号隔开,例如 1,2,3,4（选项之间都是或关系）',
  `skipto_question_order` smallint(3) NOT NULL COMMENT '跳转题目序号(结束作为特殊的题目（-1 提前结束（计入结果）/-2 提前结束（不计入结果））)',
  `logic_type` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '00关联逻辑/01跳转逻辑/02 其他',
  `act_type` decimal(1, 0) NOT NULL COMMENT '动作类型(0 选择/1 没有选择)\r\n            默认0，多选可以设置1',
  `and_or` decimal(1, 0) NULL DEFAULT NULL COMMENT 'and 0，or 1',
  PRIMARY KEY (`logic_id`) USING BTREE,
  INDEX `FK_Reference_40`(`qstnaire_id`) USING BTREE,
  CONSTRAINT `FK_Reference_40` FOREIGN KEY (`qstnaire_id`) REFERENCES `qstnaire_bank` (`qstnaire_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '问卷逻辑设置' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for qstnaire_question
-- ----------------------------
DROP TABLE IF EXISTS `qstnaire_question`;
CREATE TABLE `qstnaire_question`  (
  `qstnaire_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '问卷标识',
  `question_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '题目标识，如果该数据是分页，标识为-1',
  `question_order` smallint(3) NOT NULL COMMENT '题目序号',
  `is_blank` decimal(1, 0) NOT NULL DEFAULT 0 COMMENT '该题是否必答(0 是/1 否)\r\n            默认为是',
  `is_paging` decimal(1, 0) NOT NULL DEFAULT 0 COMMENT '后面是否分页(1 是/0 否)，如果是，该分页也作为一个题目数据。',
  `page_txt` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `is_nps` decimal(1, 0) NOT NULL DEFAULT 0 COMMENT 'NPS评分题(1 是/0 否)',
  `is_satisfied` decimal(1, 0) NOT NULL DEFAULT 0 COMMENT '满意度评分题(1 是/0 否)',
  INDEX `qstnaire_id`(`qstnaire_id`) USING BTREE,
  INDEX `FK_Reference_29`(`question_id`) USING BTREE,
  CONSTRAINT `qstnaire_question_ibfk_1` FOREIGN KEY (`qstnaire_id`) REFERENCES `qstnaire_bank` (`qstnaire_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `qstnaire_question_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `question_bank` (`question_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '问卷包含题目' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for question_bank
-- ----------------------------
DROP TABLE IF EXISTS `question_bank`;
CREATE TABLE `question_bank`  (
  `question_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '题目标识(从序列取值seq_question_bank_id)',
  `question_name` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '题目名称',
  `question_name2` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '题目名称',
  `question_type` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '题目类型(01 单选题/02 多选题/03 单行填空题/04 多行填空题/05 矩阵单选题/06 矩阵多选题)00就是分页题',
  `question_category` decimal(1, 0) NOT NULL COMMENT '题目分类(1 终端/2 套餐/3 流量/4 账单/0 其它)',
  `is_common` decimal(1, 0) NOT NULL DEFAULT 1 COMMENT '是否公共题目（1 是/0 否），问卷包含题目属于私有题目，题库管理创建的题目为公共题目。',
  `is_nps` decimal(1, 0) NOT NULL DEFAULT 0 COMMENT 'NPS评分题(1 是/0 否)',
  `is_satisfied` decimal(1, 0) NOT NULL DEFAULT 0 COMMENT '满意度评分题(1 是/0 否)',
  `option_layout` decimal(1, 0) NOT NULL DEFAULT 0 COMMENT '选项布局(0 不限/1 竖排/2 横排)',
  `content_check` decimal(1, 0) NOT NULL DEFAULT 0 COMMENT '内容校验(0 不限/1 数字/2 字符/3 中文/4 EMAIL/5 手机号码)',
  `lenth_check` bigint(12) NOT NULL DEFAULT 0 COMMENT '字数限制（0为不限制）',
  `create_uid` bigint(12) NOT NULL COMMENT '创建人',
  `create_time` datetime(0) NOT NULL COMMENT '创建时间',
  `status` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '01' COMMENT '状态(00 停用/01 启用)',
  `question_tags` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标签',
  PRIMARY KEY (`question_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '题库' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for question_option
-- ----------------------------
DROP TABLE IF EXISTS `question_option`;
CREATE TABLE `question_option`  (
  `option_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '选项序号',
  `question_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '题目标识(从序列取值seq_question_bank_id)',
  `option_order` smallint(3) NOT NULL COMMENT '选项序号',
  `option_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '选项内容',
  `is_other` decimal(1, 0) NOT NULL DEFAULT 0 COMMENT '是否其它注明(0 否/1 是)',
  PRIMARY KEY (`option_id`) USING BTREE,
  INDEX `FK_Reference_46`(`question_id`) USING BTREE,
  CONSTRAINT `FK_Reference_46` FOREIGN KEY (`question_id`) REFERENCES `question_bank` (`question_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 280 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '题目选项' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for question_result
-- ----------------------------
DROP TABLE IF EXISTS `question_result`;
CREATE TABLE `question_result`  (
  `survey_result_no` bigint(12) NOT NULL COMMENT '调研结果流水',
  `question_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '答题题目',
  `row_order` smallint(3) NOT NULL DEFAULT 0 COMMENT '矩阵行序号（非矩阵选择题为0）',
  `question_result` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '答题结果序号（选择题的答题结果为/分隔的选项串）\r\n            1/2/3/4',
  INDEX `FK_Reference_41`(`survey_result_no`) USING BTREE,
  CONSTRAINT `FK_Reference_41` FOREIGN KEY (`survey_result_no`) REFERENCES `survey_result` (`result_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '答题结果' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for regions
-- ----------------------------
DROP TABLE IF EXISTS `regions`;
CREATE TABLE `regions`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '区域ID',
  `area_id` bigint(20) UNSIGNED NOT NULL DEFAULT 1 COMMENT '区域标识',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '区域名称',
  `type` tinyint(3) UNSIGNED NULL DEFAULT 0 COMMENT '区域类型',
  `code` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '区域码',
  `sequence` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '序号',
  `parent_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '父区域ID',
  `is_leaf` tinyint(3) UNSIGNED NULL DEFAULT 1 COMMENT '是否叶子节点(1:叶子节点 0:非叶子节点)',
  `created_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modified_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '修改人',
  `modified_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `area_id`(`area_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '区域' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for role_permission
-- ----------------------------
DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE `role_permission`  (
  `role_id` bigint(20) UNSIGNED NOT NULL COMMENT '角色ID',
  `permission_id` bigint(20) UNSIGNED NOT NULL COMMENT '权限ID',
  `created_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modified_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '修改人',
  `modified_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`role_id`, `permission_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '角色权限' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '角色名称',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '角色描述',
  `parent_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '父角色ID',
  `is_leaf` tinyint(3) UNSIGNED NULL DEFAULT 1 COMMENT '是否叶子节点(1:叶子节点 0:非叶子节点)',
  `created_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modified_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '修改人',
  `modified_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '角色' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for survey_nps_info
-- ----------------------------
DROP TABLE IF EXISTS `survey_nps_info`;
CREATE TABLE `survey_nps_info`  (
  `task_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '调研任务标识',
  `area_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '所属区域',
  `task_name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '调研任务名称',
  `qstnaire_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '调研问卷标识',
  `nps_question_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'NPS题目',
  `nps_ratio` decimal(4, 2) UNSIGNED ZEROFILL NOT NULL COMMENT 'NPS净推荐值\r\n            净推荐值(NPS)=(推荐者数/总样本数)×100%-(贬损者数/总样本数)×100%',
  `nps_count1` bigint(12) UNSIGNED ZEROFILL NOT NULL COMMENT '推荐者数量',
  `nps_ratio1` decimal(4, 2) UNSIGNED ZEROFILL NOT NULL COMMENT '推荐者百分比',
  `nps_count2` bigint(12) UNSIGNED ZEROFILL NOT NULL COMMENT '被动者数量',
  `nps_ratio2` decimal(4, 2) UNSIGNED ZEROFILL NOT NULL COMMENT '被动者百分比',
  `nps_count3` bigint(12) UNSIGNED ZEROFILL NOT NULL COMMENT '贬损者数量',
  `nps_ratio3` decimal(4, 2) UNSIGNED ZEROFILL NOT NULL COMMENT '贬损者百分比',
  `task_type` decimal(1, 0) NOT NULL COMMENT '任务类型：0一般任务/1触发性任务',
  `create_date` date NOT NULL COMMENT '数据统计日期'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'NPS净推荐值及其构成' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for survey_result
-- ----------------------------
DROP TABLE IF EXISTS `survey_result`;
CREATE TABLE `survey_result`  (
  `result_id` bigint(12) NOT NULL AUTO_INCREMENT COMMENT '调研结果流水',
  `area_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '所属区域',
  `task_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '调研任务',
  `channel_type` smallint(2) NOT NULL COMMENT '\'0链接与二维码/1微信/2邮件/3短信\',',
  `user_account` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户账号',
  `status` decimal(1, 0) NOT NULL COMMENT '答题状态(0 开始/1 完成)',
  `start_time` datetime(0) NOT NULL COMMENT '开始时间',
  `finish_time` datetime(0) NULL DEFAULT NULL COMMENT '完成时间',
  PRIMARY KEY (`result_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '调研结果' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for survey_task
-- ----------------------------
DROP TABLE IF EXISTS `survey_task`;
CREATE TABLE `survey_task`  (
  `task_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '任务编码(按规则生成)',
  `task_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '任务名称',
  `task_type` decimal(1, 0) NOT NULL COMMENT '任务类型：0一般任务/1触发性任务',
  `qstnaire_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '调研问卷',
  `survey_sdate` date NOT NULL COMMENT '调研开始日期',
  `survey_edate` date NOT NULL COMMENT '调研结束日期',
  `create_uid` bigint(12) NOT NULL COMMENT '创建人',
  `create_time` datetime(0) NOT NULL COMMENT '创建时间',
  `update_time` datetime(0) NOT NULL COMMENT '修改时间',
  `status` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '任务状态(00 正常结束/01 执行中/02 草稿/03 审批中/04 审核退单/05 审核作废/06 发布中/10 人工终止)\r\n            ',
  `deal_tache` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '当前处理环节(详见审批环节表)',
  `deal_role` bigint(12) NULL DEFAULT 0 COMMENT '处理角色(关联角色表)',
  `deal_uid` bigint(12) NULL DEFAULT 0 COMMENT '处理人(关联用户表)',
  `deal_org` bigint(12) NULL DEFAULT 0 COMMENT '处理部门(关联部门表)',
  `deal_type` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '处理类型(01 审核/02 派单/03 执行)',
  PRIMARY KEY (`task_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '调研任务表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for survey_user_info
-- ----------------------------
DROP TABLE IF EXISTS `survey_user_info`;
CREATE TABLE `survey_user_info`  (
  `task_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '调研任务标识',
  `area_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '所属区域',
  `task_name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '调研任务名称',
  `qstnaire_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '调研问卷标识',
  `task_count` bigint(12) NOT NULL COMMENT '调研任务人数',
  `partake_count` bigint(12) UNSIGNED ZEROFILL NOT NULL COMMENT '参与人数',
  `finish_count` bigint(12) UNSIGNED ZEROFILL NOT NULL COMMENT '完成人数',
  `partake_ratio` decimal(4, 2) UNSIGNED ZEROFILL NOT NULL COMMENT '参与率%，参与人数/调研人数',
  `finish_ratio` decimal(4, 2) UNSIGNED ZEROFILL NOT NULL COMMENT '完成率%，完成人数/参与人数',
  `task_type` decimal(1, 0) NOT NULL COMMENT '任务类型：0一般任务/1触发性任务',
  `create_date` date NOT NULL COMMENT '数据统计日期'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '问卷完成情况' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for task_channel
-- ----------------------------
DROP TABLE IF EXISTS `task_channel`;
CREATE TABLE `task_channel`  (
  `channel_id` bigint(12) NOT NULL AUTO_INCREMENT COMMENT '数据标识，数据流水号',
  `task_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '任务标识',
  `channel_type` smallint(2) NOT NULL COMMENT '0链接与二维码/1微信/2邮件/3短信',
  `sample_type` smallint(2) NOT NULL COMMENT '1全量/2抽样',
  `sample_sum` bigint(12) NULL DEFAULT NULL COMMENT '样本数量',
  `user_type` smallint(2) NULL DEFAULT NULL COMMENT '用户类型0 用户/1用户标签',
  `user_sum` bigint(12) NOT NULL COMMENT '用户数量',
  `sms_way` smallint(2) NULL DEFAULT NULL COMMENT '1短信超链接/2短信纯文本',
  `sms_content` varchar(1024) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '信息内容',
  PRIMARY KEY (`channel_id`) USING BTREE,
  INDEX `FK_Reference_36`(`task_id`) USING BTREE,
  CONSTRAINT `FK_Reference_36` FOREIGN KEY (`task_id`) REFERENCES `survey_task` (`task_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 77 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '调研任务渠道' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for task_exe
-- ----------------------------
DROP TABLE IF EXISTS `task_exe`;
CREATE TABLE `task_exe`  (
  `serial_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '（由发送方保证唯一性）',
  `task_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '调研任务id',
  `channel_type` smallint(2) NOT NULL COMMENT '0链接与二维码/1微信/2邮件/3短信',
  `send_user` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '发送用户(10000,10086）',
  `target_user` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '目标用户(电话号码)',
  `area_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户所属区域',
  `is_test` decimal(1, 0) NOT NULL COMMENT '0测试/1正式数据',
  `sm_content` varchar(3000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '短信内容',
  `create_time` datetime(0) NOT NULL COMMENT '创建时间',
  `base_url` varchar(700) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '原始链接地址',
  `short_url` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '短链接地址',
  `is_exe` decimal(1, 0) UNSIGNED ZEROFILL NOT NULL DEFAULT 0 COMMENT '是否推送到执行渠道',
  `exe_time` datetime(0) NULL DEFAULT NULL COMMENT '推送到执行渠道时间',
  `test_uid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '测试人工号',
  `url_flag` decimal(1, 0) UNSIGNED ZEROFILL NOT NULL DEFAULT 0 COMMENT '0有效1失效',
  PRIMARY KEY (`serial_id`) USING BTREE,
  INDEX `FK_Reference_35`(`task_id`) USING BTREE,
  CONSTRAINT `FK_Reference_35` FOREIGN KEY (`task_id`) REFERENCES `survey_task` (`task_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for task_user
-- ----------------------------
DROP TABLE IF EXISTS `task_user`;
CREATE TABLE `task_user`  (
  `task_user_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键',
  `channel_type` smallint(2) NOT NULL COMMENT '发送渠道0链接与二维码/1微信/2邮件/3短信',
  `task_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '任务标识',
  `user_account` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户账号',
  `create_time` datetime(0) NOT NULL COMMENT '插入时间',
  `area_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '区域id',
  `is_test` decimal(1, 0) NOT NULL COMMENT '0测试/1正式数据',
  `is_flag` decimal(1, 0) NOT NULL DEFAULT 0 COMMENT '0有效/1无效',
  `res_sys` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '资源系统（本系统或者其他系统）',
  PRIMARY KEY (`task_user_id`) USING BTREE,
  INDEX `FK_Reference_38`(`task_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '调研任务用户' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for test
-- ----------------------------
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test`  (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `a` bigint(12) NULL DEFAULT NULL,
  `c` bigint(12) NULL DEFAULT NULL,
  `cl` decimal(12, 2) NULL DEFAULT NULL,
  `w` bigint(12) NULL DEFAULT NULL,
  `wl` decimal(12, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role`  (
  `user_id` bigint(20) UNSIGNED NOT NULL COMMENT '用户ID',
  `role_id` bigint(20) UNSIGNED NOT NULL COMMENT '角色ID',
  `created_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modified_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '修改人',
  `modified_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`user_id`, `role_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户角色' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `no` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户工号',
  `account` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户帐号',
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户姓名',
  `sex` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'F' COMMENT '性别',
  `cellphone` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '手机号',
  `email` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '邮箱',
  `identity_card` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '身份证',
  `status` tinyint(3) UNSIGNED NULL DEFAULT 1 COMMENT '状态',
  `password` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '帐号密码',
  `salt` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '密码盐值',
  `dept_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0 COMMENT '部门ID',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '备注',
  `created_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modified_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '修改人',
  `modified_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `no`(`no`) USING BTREE,
  UNIQUE INDEX `account`(`account`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户' ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `users` VALUES ('1', '10000', 'admin', '管理员', 'F', '189432435', 'admin@ztesoft.com', '5434324326432', '1', 'd5ba2f763ef411812252a1d093d597c4', '32', '0', '系统管理员', '', '2018-08-13 14:15:51', '', '2018-08-13 14:15:51');

INSERT INTO `nps`.`question_bank`(`question_id`, `question_name`, `question_name2`, `question_type`, `question_category`, `is_common`, `is_nps`, `is_satisfied`, `option_layout`, `content_check`, `lenth_check`, `create_uid`, `create_time`, `status`, `question_tags`) VALUES ('cf7a7a35dec14c4bab5fa6a9b8bf3009', '分页题目', '分页题目', '00', 1, 1, 0, 0, 0, 0, 0, 1, '2018-09-06 10:28:52', '1', NULL);

