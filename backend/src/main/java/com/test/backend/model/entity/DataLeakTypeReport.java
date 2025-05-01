package com.test.backend.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import lombok.Data;

/**
 * 
 * @TableName data_leak_type_report
 */
@TableName(value ="data_leak_type_report")
@Data
public class DataLeakTypeReport implements Serializable {
    /**
     * id
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * year
     */
    private Integer year;

    /**
     * 
     */
    private String type;

    /**
     * 
     */
    private Integer reportscount;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}