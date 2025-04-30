package com.test.backend.service.imp;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.backend.model.entity.DataLeakedByState;
import com.test.backend.service.DataLeakedByStateService;
import com.test.backend.mapper.DataLeakedByStateMapper;
import org.springframework.stereotype.Service;

/**
* @author xu
* @description 针对表【data_leaked_by_state】的数据库操作Service实现
* @createDate 2025-04-29 21:20:26
*/
@Service
public class DataLeakedByStateServiceImpl extends ServiceImpl<DataLeakedByStateMapper, DataLeakedByState>
    implements DataLeakedByStateService{

}




