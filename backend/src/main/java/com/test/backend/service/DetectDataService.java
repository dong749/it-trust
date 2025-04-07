package com.test.backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.test.backend.common.BaseResponse;
import com.test.backend.model.dto.HIBPBreachDTO;
import com.test.backend.model.entity.HIBPBreach;

import java.util.List;

public interface DetectDataService extends IService<HIBPBreach>
{
    public List<HIBPBreachDTO> detect(String email);
}
