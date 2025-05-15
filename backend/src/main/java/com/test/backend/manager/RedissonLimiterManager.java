package com.test.backend.manager;

import com.test.backend.common.ErrorCode;
import com.test.backend.exception.BusinessException;
import org.redisson.api.RRateLimiter;
import org.redisson.api.RateIntervalUnit;
import org.redisson.api.RateType;
import org.redisson.api.RedissonClient;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class RedissonLimiterManager
{
    @Resource
    private RedissonClient redissonClient;

    public void limitation(String key)
    {
        RRateLimiter rateLimiter = redissonClient.getRateLimiter(key);
        rateLimiter.trySetRate(RateType.OVERALL, 2, 1, RateIntervalUnit.SECONDS);
        boolean isGetToken = rateLimiter.tryAcquire(1);
        if (!isGetToken)
        {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "Too many request");
        }
    }
}
