package com.test.backend.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 
 * @TableName ai_analysis_result
 */
@TableName(value ="ai_analysis_result")
@Data
public class AiAnalysisResult implements Serializable {
    /**
     * id
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * cookie id
     */
    private String cookieId;

    /**
     * 
     */
    private String aiAnalysisResult;

    /**
     * question type
     */
    private String questionCategory;

    /**
     * 
     */
    private Integer isDelete;

    /**
     * create time
     */
    private Date createTime;

    /**
     * update time
     */
    private Date updateTime;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}