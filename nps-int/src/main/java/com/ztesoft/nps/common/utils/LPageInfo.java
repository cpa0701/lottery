package com.ztesoft.nps.common.utils;

import com.github.pagehelper.PageInfo;
import com.github.pagehelper.PageSerializable;

import java.util.List;

/**
 * Created by 64671 on 2018/8/24.
 */
public class LPageInfo<T> extends PageSerializable<T> {

    /**
     * 页码，从1开始
     */
    private int pageNum;
    /**
     * 每页的数量
     */
    private int pageSize;
    /**
     * 当前页的数量
     */
    private int rowCount;
    /**
     * 总记录数
     */
    private int totalCount;
    /**
     * 总页数
     */
    private int pages;

    //结果集
    private List<T> rows;


}
