package com.test.backend.intercetor;

import com.test.backend.common.ErrorCode;
import com.test.backend.exception.BusinessException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class CookieLimitInterceptor implements HandlerInterceptor
{
    private static final int MAX_COOKIE_COUNT = 50;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null && cookies.length > MAX_COOKIE_COUNT) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "Too many cookies in request (limit: " + MAX_COOKIE_COUNT + ")");
        }
        return true;
    }
}
