package com.test.backend.service.imp;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.test.backend.model.entity.DataLeakTypeReport;
import com.test.backend.service.DataLeakTypeReportService;
import com.test.backend.mapper.DataLeakTypeReportMapper;
import org.springframework.stereotype.Service;

/**
* @author xu
* @description 针对表【data_leak_type_report】的数据库操作Service实现
* @createDate 2025-05-01 13:25:27
*/
@Service
public class DataLeakTypeReportServiceImpl extends ServiceImpl<DataLeakTypeReportMapper, DataLeakTypeReport>
    implements DataLeakTypeReportService{

}




