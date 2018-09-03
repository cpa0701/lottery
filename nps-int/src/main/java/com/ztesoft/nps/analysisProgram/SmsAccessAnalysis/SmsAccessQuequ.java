package com.ztesoft.nps.analysisProgram.SmsAccessAnalysis;

import java.util.concurrent.ArrayBlockingQueue;

/**
 * Created by 64671 on 2018/8/29.
 */
public class SmsAccessQuequ extends ArrayBlockingQueue<SmsAccess>{

    public SmsAccessQuequ(int capacity) {
        super(capacity);
    }

    private static SmsAccessQuequ queue = null;

    public static void initCapacity(int capacity){
        queue = new SmsAccessQuequ(capacity);
    }

    public static void putInfo(SmsAccess smsAccess){
        if(null == queue) return;
        try {
            queue.put(smsAccess);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static SmsAccess takeInfo(){
        try{
            if(isNull()){
                return null;
            }
            return queue.take();
        }catch (InterruptedException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static boolean isNull()
    {
        return queue.size() == 0;
    }

    public static int getSize(){
        return queue.size();
    }

}
