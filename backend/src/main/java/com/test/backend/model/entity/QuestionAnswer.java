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
 * @TableName question_answer
 */
@TableName(value ="question_answer")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionAnswer implements Serializable {
    /**
     * id
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * option A
     */
    private String optionA;

    /**
     * option B
     */
    private String optionB;

    /**
     * option C
     */
    private String optionC;

    /**
     * option D
     */
    private String optionD;

    /**
     * question id
     */
    private Long questionId;

    /**
     * correct answer
     */
    private String correctAnswer;

    /**
     * answer explanation
     */
    private String explanation;

    /**
     * is Delete
     */
    private Integer isDelete;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}