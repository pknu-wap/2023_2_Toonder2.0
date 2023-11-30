package com.toonder.backend.webtoon;

import java.util.*;
import java.util.*;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface WebtoonRepository extends JpaRepository<Webtoon, String> {

	Optional<Webtoon> findByMastrId(String mastrId);

    List<Webtoon> findByMastrIdIn(List<String> mastrIds);

	//nativeQuery = true 이면 기본 SQL 쿼리
	//nativeQuery = false 이면 JPQL 쿼리로 처리
	@Query(value = 
		"SELECT * FROM wbtnInfo ORDER BY "
		+ "CASE WHEN SUBSTRING(title, 1, 1) BETWEEN '가' AND '힣' THEN 1 " // 한글 1순위
		+ "WHEN SUBSTRING(title, 1, 1) BETWEEN 'A' AND 'Z' THEN 2 " // 영어 대문자 2순위
		+ "WHEN SUBSTRING(title, 1, 1) BETWEEN 'a' AND 'z' THEN 3 " // 영어 소문자 3순위
		+ "WHEN SUBSTRING(title, 1, 1) BETWEEN '0' AND '9' THEN 4 " // 숫자 4순위
		+ "ELSE 5 END, title COLLATE utf8mb4_unicode_ci"
		, nativeQuery = true)
	List<Webtoon> findAllByOrderByTitleAsc(Pageable pageable);

	@Query(value = "SELECT mastrId FROM wbtnInfo ORDER BY RAND() LIMIT :count", nativeQuery = true)
    List<String> findRandomMastrIds(@Param("count") int count);

	List<Webtoon> findAllByOrderByMastrIdDesc(Pageable pageable);

    List<Webtoon> findByMainGenreCdNm(String mainGenreCdNm);

	Optional<Webtoon> findByMastrIdAndAdult(String mastrId, String adult);
	
	List<Webtoon> findByMastrIdInAndAdult(List<String> mastrIds, String adult);

	List<Webtoon> findByAdultNotContaining(String adult, Pageable pageable);

    List<Webtoon> findByTitleContaining(String keyword, Pageable pageable); 

	List<Webtoon> findByPictrWritrNmContaining(String keyword, Pageable pageable);

	List<Webtoon> findByDrawId(String drawId);
	
	List<Webtoon> findByDrawIdIn(List<String> drawIds);

	List<Webtoon> findAll();

	public final static String SELECT_WEBTOON_LIST_PAGED = ""
			+ "SELECT " 
			+ "mastrId,"
			+ "title,"
            + "pictrWritrNm,"
            + "sntncWritrNm,"
            + "mainGenreCdNm,"
            + "outline,"
            + "pltfomCdNm,"
            + "fnshYn,"
            + "webtoonPusryYn,"
			+ "imageDownloadUrl"
			+ " FROM wbtnInfo WHERE 0 < mastrId "
			+ "ORDER BY mastrId DESC LIMIT ?1, ?2";

	@Query(value = SELECT_WEBTOON_LIST_PAGED, nativeQuery = true)
	List<Webtoon> findFromTo(
			final Integer objectStartNum,
			final Integer objectEndNum);


}
