package com.ztesoft.nps.analysisProgram.SmsResultAnalsis;

import com.ztesoft.nps.analysisProgram.SmsAccessAnalysis.SmsAccess;
import com.ztesoft.nps.analysisProgram.SmsAccessAnalysis.SmsAccessQuequ;
import com.ztesoft.utils.sys.util.ThreadUtil;

import java.util.concurrent.ExecutorService;

/**
 * Created by 64671 on 2018/8/31.
 */
public class SmsResultStarter {
    public static final int initQueueCapacity = 10;
    private static final ExecutorService service = ThreadUtil.newFixedThreadPool(1);

    public static void start(){
        SmsResultQuequ.initCapacity(initQueueCapacity);
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
                    SmsResult smsResult = SmsResultQuequ.takeInfo();
                    if(smsResult!=null){
                        String result = smsResult.invokeAnalysis();
                        if("NO".equals(result)){
                            System.out.println("{ 当前queue容量（"+SmsResultQuequ.getSize()+"） 消费数据 : " +smsResult.getResultId()+" }执行失败！重新加入到队列中。。");
                            SmsResultQuequ.putInfo(smsResult);
                        }else {
                            System.out.println("{ 当前queue容量（"+SmsResultQuequ.getSize()+"） 消费数据 : " +smsResult.getResultId()+" }执行完成！");
                        }
                    }
                }
            }
        });
    }
}
