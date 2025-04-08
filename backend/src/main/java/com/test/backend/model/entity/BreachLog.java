package com.test.backend.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import lombok.Data;

/**
 * 
 * @TableName BreachLog
 */
@TableName(value ="BreachLog")
@Data
public class BreachLog implements Serializable {
    /**
     * 
     */
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;

    /**
     * 
     */
    @TableField("is_breached")
    private Integer isBreached;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}