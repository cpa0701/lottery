package com.ztesoft.nps.analysisProgram.SmsAccessAnalysis;

import com.ztesoft.utils.sys.util.ThreadUtil;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by 64671 on 2018/8/29.
 */
public class SmsAccessStarter {

    private static final int initQueueCapacity = 40;
    private static final ExecutorService service = ThreadUtil.newFixedThreadPool(2);
    private static final AtomicInteger atomic = new AtomicInteger(initQueueCapacity+1);

    public static void start(){
        SmsAccessQuequ.initCapacity(initQueueCapacity);
        //消费数据
        service.execute(new Runnable() {
            @Override
            public void run() {
                invokeBussi();
            }
        });

    }

    private static void invokeBussi(){
        ThreadUtil.QueueExecutorService queue = ThreadUtil.newQueueThreadPool(1);

        queue.execute(new ThreadUtil.QueueExecutorHandler() {
            @Override
            public void run(Object o) {
                while (true){
                    try {
                        Thread.sleep(200);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    SmsAccess smsAccess = SmsAccessQuequ.takeInfo();
                    if(smsAccess!=null){
                        String result = smsAccess.invokeAnalysis();
                        if("NO".equals(result)){
                            System.out.println("{ 当前queue容量（"+SmsAccessQuequ.getSize()+"） 消费数据 : " +smsAccess.getAccessId()+" }执行失败！重新加入到队列中。。");
                            SmsAccessQuequ.putInfo(smsAccess);
                        }else {
                            System.out.println("{ 当前queue容量（"+SmsAccessQuequ.getSize()+"） 消费数据 : " +smsAccess.getAccessId()+" }执行完成！");
                        }
                    }
                }
            }
        });
    }

}
