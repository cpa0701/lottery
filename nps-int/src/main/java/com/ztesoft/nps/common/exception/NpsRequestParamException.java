package com.ztesoft.nps.common.exception;

/**
 * Created by 64671 on 2018/9/5.
 */
public class NpsRequestParamException extends NpsBusinessException  {
    public NpsRequestParamException(String msg) {
        super(msg);
    }

    public NpsRequestParamException(String msg, Throwable e) {
        super(msg, e);
    }
}
