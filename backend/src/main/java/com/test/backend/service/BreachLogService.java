package com.test.backend.service;

import com.test.backend.model.entity.BreachLog;
import com.baomidou.mybatisplus.extension.service.IService;
import com.test.backend.model.vo.BreachLogVO;

import java.util.List;

/**
* @author xu
* @description 针对表【BreachLog】的数据库操作Service
* @createDate 2025-04-08 14:52:42
*/
public interface BreachLogService extends IService<BreachLog> {

    public List<BreachLogVO> calculateByIsBreached();
}
