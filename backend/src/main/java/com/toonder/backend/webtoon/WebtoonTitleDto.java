package com.toonder.backend.webtoon;

import lombok.Data;

@Data
public class WebtoonTitleDto {
    private String mastrId;
    private String title;
    private String imageDownloadUrl;

    public WebtoonTitleDto(String mastrId, String title, String imageDownloadUrl) {
        this.mastrId = mastrId;
        this.title = title;
        this.imageDownloadUrl = imageDownloadUrl;
    }
}
