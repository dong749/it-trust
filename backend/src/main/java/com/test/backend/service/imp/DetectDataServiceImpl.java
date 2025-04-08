package com.test.backend.service.imp;

import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.backend.common.ErrorCode;
import com.test.backend.config.HIBPConfig;
import com.test.backend.config.MailBoxConfig;
import com.test.backend.exception.BusinessException;
import com.test.backend.exception.ThrowUtils;
import com.test.backend.mapper.HIBPBreachMapper;
import com.test.backend.model.dto.HIBPBreachDTO;
import com.test.backend.model.entity.BreachLog;
import com.test.backend.model.entity.HIBPBreach;
import com.test.backend.service.BreachLogService;
import com.test.backend.service.DetectDataService;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class DetectDataServiceImpl extends ServiceImpl<HIBPBreachMapper, HIBPBreach> implements DetectDataService
{
    @Resource
    private HIBPConfig hibpConfig;

    @Resource
    private BreachLogService breachLogService;

    @Resource
    private MailBoxConfig mailBoxConfig;

    @Override
    public List<HIBPBreachDTO> detect(String email)
    {
        ThrowUtils.throwIf(email.isEmpty(), ErrorCode.SYSTEM_ERROR);
        if (!isEmailValid(email))
        {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR, "Email is not valid");
        }

        String apiKey = hibpConfig.getApiKey();
        String userAgent = hibpConfig.getUserAgent();
        String apiUrl = hibpConfig.getApiUrl();

        CloseableHttpClient httpClient = HttpClients.createDefault();
        CloseableHttpResponse response = null;

        try {
            HttpGet httpGet = new HttpGet(apiUrl + email + "?truncateResponse=false");
            httpGet.setHeader("User-Agent", userAgent);
            httpGet.setHeader("Accept", "application/json");
            httpGet.setHeader("hibp-api-key", apiKey);

            response = httpClient.execute(httpGet);
            int statusCode = response.getStatusLine().getStatusCode();
            if (statusCode == 404)
            {
                BreachLog breachlog = new BreachLog();
                breachlog.setIsBreached(0);
                breachLogService.save(breachlog);
                return new ArrayList<>();
            }
            else if (statusCode == 200)
            {
                HttpEntity entity = response.getEntity();
                String json = EntityUtils.toString(entity);
                JSONArray jsonArray = JSONUtil.parseArray(json);

                List<HIBPBreachDTO> dtoList = new ArrayList<>();

                BreachLog breachlog = new BreachLog();
                breachlog.setIsBreached(1);
                breachLogService.save(breachlog);

                for (Object obj : jsonArray)
                {
                    JSONObject jsonObject = (JSONObject) obj;
                    System.out.println(jsonObject.toString());
                    HIBPBreachDTO dto = new HIBPBreachDTO();
                    dto.setTitle(jsonObject.getStr("Title"));
                    dto.setDomain(jsonObject.getStr("Domain"));
                    dto.setBreachDate(jsonObject.getStr("BreachDate"));
                    dto.setDescription(jsonObject.getStr("Description"));
                    dto.setDataTypes(jsonObject.getJSONArray("DataClasses").toList(String.class));
                    dto.setLogoUrl(jsonObject.getStr("LogoPath"));
                    dtoList.add(dto);
                }
                return dtoList;
            }
            else
            {
                throw new RuntimeException("Request Failed: " + statusCode);
            }
        } catch (IOException e) {
            throw new RuntimeException("System Error: " + e.getMessage(), e);
        }
    }

    private boolean isEmailValid(String email)
    {
        String apiKey = mailBoxConfig.getAccessKey();
        String baseUrl = mailBoxConfig.getApiUrl();

        CloseableHttpClient httpClient = HttpClients.createDefault();
        CloseableHttpResponse response = null;

        try{
            String url = baseUrl + "?access_key=" + apiKey + "&email=" + email + "&smtp=1&format=1";
            HttpGet httpGet = new HttpGet(url);
            response = httpClient.execute(httpGet);
            int statusCode = response.getStatusLine().getStatusCode();
            if (statusCode == 200)
            {
                HttpEntity entity = response.getEntity();
                String json = EntityUtils.toString(entity);
                JSONObject jsonObject = JSONUtil.parseObj(json);
                boolean formatValid = jsonObject.getBool("format_valid", false);
                boolean smtpCheck = jsonObject.getBool("smtp_check", false);
                return formatValid && smtpCheck;
            }
        } catch (IOException e) {
            throw new RuntimeException("System Error: " + e.getMessage(), e);
        }
        return false;
    }
}
