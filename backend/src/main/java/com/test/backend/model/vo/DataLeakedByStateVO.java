package com.test.backend.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataLeakedByStateVO
{
    /**
     *
     */
    private String state;

    /**
     *
     */
    private String leaktype;

    /**
     *
     */
    private String year;

    /**
     *
     */
    private Integer reports;


}
