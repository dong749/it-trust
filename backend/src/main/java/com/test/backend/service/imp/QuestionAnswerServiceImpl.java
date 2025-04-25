package com.test.backend.service.imp;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.backend.model.entity.QuestionAnswer;
import com.test.backend.service.QuestionAnswerService;
import com.test.backend.mapper.QuestionAnswerMapper;
import org.springframework.stereotype.Service;

/**
* @author xu
* @description 针对表【question_answer】的数据库操作Service实现
* @createDate 2025-04-25 21:45:00
*/
@Service
public class QuestionAnswerServiceImpl extends ServiceImpl<QuestionAnswerMapper, QuestionAnswer>
    implements QuestionAnswerService{

}




