CREATE TABLE `plan`
(
    `id`          int(11) NOT NULL,
    `planName`    varchar(50)  DEFAULT NULL COMMENT '计划名称',
    `status`      varchar(10)  DEFAULT NULL COMMENT '计划状态',
    `total_part`  int(11)      DEFAULT NULL COMMENT '计划总任务数',
    `source`      varchar(50)  DEFAULT NULL COMMENT '计划来源',
    `target`      varchar(120) DEFAULT NULL COMMENT '目标',
    `link`        varchar(500) DEFAULT NULL COMMENT '链接',
    `creator`     varchar(50)  DEFAULT NULL COMMENT '创建人',
    `updator`     varchar(50)  DEFAULT NULL COMMENT '修改人',
    `createdTime` datetime     DEFAULT NULL COMMENT '创建时间',
    `updatedTime` datetime     DEFAULT NULL COMMENT '修改时间',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;