package com.toonder.backend.webtoon;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Id;

import com.toonder.backend.review.ReviewResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
    
@Getter
@AllArgsConstructor
public class WebtoonResponseDto {

    private String mastrId;
    private String title;
    private String pictrWritrNm;
    private String mainGenreCdNm;
    private String outline;
    private String pltfomCdNm;
    private String imageDownloadUrl;

    private String adult;
    private String outline_recommendations;

    private List<ReviewResponseDto> review;

    /* Entity -> Dto*/
    public WebtoonResponseDto(Webtoon webtoon) {
        this.mastrId = webtoon.getMastrId();
        this.title = webtoon.getTitle();
        this.pictrWritrNm = webtoon.getPictrWritrNm();
        this.mainGenreCdNm = webtoon.getMainGenreCdNm();
        this.outline = webtoon.getOutline();
        this.pltfomCdNm = webtoon.getPltfomCdNm();
        this.imageDownloadUrl = webtoon.getImageDownloadUrl();
        this.adult = webtoon.getAdult();
        this.outline_recommendations = webtoon.getOutline_recommendations();

        if(webtoon.getReview() != null){
            this.review = webtoon.getReview().stream().map(ReviewResponseDto::new).collect(Collectors.toList());
        }
    }
}