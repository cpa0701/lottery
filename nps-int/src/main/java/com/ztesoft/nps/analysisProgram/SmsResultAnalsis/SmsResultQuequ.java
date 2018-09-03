package com.ztesoft.nps.analysisProgram.SmsResultAnalsis;

import java.util.concurrent.ArrayBlockingQueue;

/**
 * Created by 64671 on 2018/9/1.
 */
public class SmsResultQuequ extends ArrayBlockingQueue<SmsResult> {

    public SmsResultQuequ(int capacity) {
        super(capacity);
    }

    private static SmsResultQuequ quequ = null;

    public static void initCapacity(int capacity){
        quequ = new SmsResultQuequ(capacity);
    }

    public static void putInfo(SmsResult smsResult){
        if(null == quequ) return;
        try {
            quequ.put(smsResult);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static SmsResult takeInfo(){
        try{
            if(isNull()){
                return null;
            }
            return quequ.take();
        }catch (InterruptedException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static boolean isNull()
    {
        return quequ.size() == 0;
    }

    public static int getSize(){
        return quequ.size();
    }

}
