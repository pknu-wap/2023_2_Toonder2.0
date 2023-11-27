package com.toonder.backend.webtoon;

import lombok.Data;

@Data
public class WebtoonTitleDto {
    private String mastrId;
    private String title;

    public WebtoonTitleDto(String mastrId, String title) {
        this.mastrId = mastrId;
        this.title = title;
    }
}
