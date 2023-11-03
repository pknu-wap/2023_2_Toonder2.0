package com.toonder.backend.webtoon;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class WebtoonDataImportScheduler {

    @Autowired
    private OpenApiController openApiController;

    @Scheduled(cron = "0 0 0 * * *") 
    public void importWebtoonDataDaily() {
        try {
            System.out.println("@Scheduled annotation : 매일 00시에 1번씩 업데이트");
            openApiController.callApi();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

