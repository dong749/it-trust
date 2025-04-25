package com.test.backend.service.imp;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.backend.model.entity.QuestionBody;
import com.test.backend.service.QuestionBodyService;
import com.test.backend.mapper.QuestionBodyMapper;
import org.springframework.stereotype.Service;

/**
* @author xu
* @description 针对表【question_body】的数据库操作Service实现
* @createDate 2025-04-25 21:49:15
*/
@Service
public class QuestionBodyServiceImpl extends ServiceImpl<QuestionBodyMapper, QuestionBody>
    implements QuestionBodyService{

}




