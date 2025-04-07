package com.test.backend.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HIBPBreach implements Serializable
{
    @TableId(type = IdType.ASSIGN_ID)
    private Long id;
    private String Name;
    private String Title;
    private String Domain;
    private String BreachDate;
    private String AddedDate;
    private String ModifiedDate;
    private int PwnCount;
    private String Description;
    private List<String> DataClasses;
    private boolean IsVerified;
    private boolean IsFabricated;
    private boolean IsSensitive;
    private boolean IsRetired;
    private boolean IsSpamList;
    private String LogoPath;
}
