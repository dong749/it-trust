package com.test.backend.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import lombok.Data;

/**
 * 
 * @TableName data_leaked_by_state
 */
@TableName(value ="data_leaked_by_state")
@Data
public class DataLeakedByState implements Serializable {
    /**
     * id
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 
     */
    private String state;

    /**
     * 
     */
    @TableField("leakType")
    private String leaktype;

    /**
     * 
     */
    private String year;

    /**
     * 
     */
    private Integer reports;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}