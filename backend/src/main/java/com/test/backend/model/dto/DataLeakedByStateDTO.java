package com.test.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataLeakedByStateDTO
{
    /**
     *
     */
    private String state;

    /**
     *
     */
    private String leakType;
}
