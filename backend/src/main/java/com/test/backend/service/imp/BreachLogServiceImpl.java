package com.test.backend.service.imp;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.backend.mapper.BreachLogMapper;
import com.test.backend.model.entity.BreachLog;
import com.test.backend.model.vo.BreachLogVO;
import com.test.backend.service.BreachLogService;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
* @author xu
* @description 针对表【BreachLog】的数据库操作Service实现
* @createDate 2025-04-08 14:52:42
*/
@Service
public class BreachLogServiceImpl extends ServiceImpl<BreachLogMapper, BreachLog>
    implements BreachLogService{

    @Override
    public List<BreachLogVO> calculateByIsBreached()
    {
        List<BreachLogVO> result = new ArrayList<>();

        for (int val : new int[]{1, 0})
        {
            QueryWrapper<BreachLog> wrapper = new QueryWrapper<>();
            wrapper.eq("is_breached", val);
            Long count = baseMapper.selectCount(wrapper);

            BreachLogVO vo = new BreachLogVO();
            vo.setIsBreach((long) val);
            vo.setCount(count);
            result.add(vo);
        }

        return result;
    }
}




