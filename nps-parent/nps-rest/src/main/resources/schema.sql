CREATE TABLE `regions`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '区域ID',
  `area_id` bigint UNSIGNED NOT NULL COMMENT '区域标识',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '区域名称',
  `type` tinyint UNSIGNED DEFAULT 0 COMMENT '区域类型',
  `code` varchar(64) NOT NULL DEFAULT '' COMMENT '区域码',
  `sequence` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '序号',
  `parent_id` bigint UNSIGNED NOT NULL DEFAULT 0 COMMENT '父区域ID',
  `created_by` varchar(64) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modified_by` varchar(64) NOT NULL DEFAULT '' COMMENT '修改人',
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY (`area_id`)
) engine=innodb charset=utf8mb4 comment '区域';
