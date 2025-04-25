package com.test.backend.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 
 * @TableName question_body
 */
@TableName(value ="question_body")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionBody implements Serializable {
    /**
     * id
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * question details
     */
    private String questionDetails;

    /**
     * question type
     */
    private Integer questionType;

    /**
     * question category
     */
    private String questionCategory;

    /**
     * is delete
     */
    private Integer isDelete;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}