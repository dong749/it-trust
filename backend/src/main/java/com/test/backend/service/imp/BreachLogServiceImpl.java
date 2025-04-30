package com.test.backend.service.imp;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.backend.constant.RedisKeysConstant;
import com.test.backend.mapper.BreachLogMapper;
import com.test.backend.model.entity.BreachLog;
import com.test.backend.model.vo.BreachLogVO;
import com.test.backend.service.BreachLogService;

import com.test.backend.utils.RedisUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
* @author xu
* @description 针对表【BreachLog】的数据库操作Service实现
* @createDate 2025-04-08 14:52:42
*/
@Service
public class BreachLogServiceImpl extends ServiceImpl<BreachLogMapper, BreachLog>
    implements BreachLogService
{
    @Resource
    private RedisUtils redisUtils;


    @Override
    public List<BreachLogVO> calculateByIsBreached()
    {
        List<BreachLogVO> logVOList = (List<BreachLogVO>) redisUtils.get(RedisKeysConstant.EMAIL_BREACHED);
        if (logVOList != null && !logVOList.isEmpty())
        {
            return logVOList;
        }
        logVOList = new ArrayList<>();
        long breachedCount = baseMapper.selectCount(new QueryWrapper<BreachLog>().eq("is_breached", 1));
        long noBreachedCount = baseMapper.selectCount(new QueryWrapper<BreachLog>().eq("is_breached", 0));

        BreachLogVO breachedVO = new BreachLogVO();
        breachedVO.setIsBreach(1L);
        breachedVO.setCount(breachedCount);

        BreachLogVO noBreachVO = new BreachLogVO();
        noBreachVO.setIsBreach(0L);
        noBreachVO.setCount(noBreachedCount);

        logVOList.add(breachedVO);
        logVOList.add(noBreachVO);

        redisUtils.set(RedisKeysConstant.EMAIL_BREACHED, logVOList, 36000);

        return logVOList;
    }

}




