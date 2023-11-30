package com.toonder.backend.webtoon;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.CascadeType;
import javax.persistence.Table;

import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;

import com.fasterxml.jackson.annotation.JsonBackReference;

import com.toonder.backend.review.Review;
import lombok.Data;


@Data
@Entity
@Table(name = "wbtninfo")
public class Webtoon {

    @Id
    @Column(name = "mastrId", nullable = false)
    private String mastrId; //자료고유ID

    private String title; //작품명

    private String pictrWritrNm; //그림작가
    private String mainGenreCdNm; //대표장르코드명

    //@Column(length = 3000)
    private String outline; //줄거리

    private String pltfomCdNm; //플랫폼코드명

    private String imageDownloadUrl; //이미지다운로드URL(표지)
    private String adult;
    private String drawId;
    private String outline_recommendations;


    @OneToMany(mappedBy = "webtoon", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	@JsonBackReference
    @OrderBy("revNo asc") // 리뷰 정렬
	private List<Review> review;
}
