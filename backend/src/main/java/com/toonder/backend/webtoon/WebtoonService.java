package com.toonder.backend.webtoon;

import java.nio.file.AccessDeniedException;
import java.sql.Timestamp;

import java.util.*;

import java.util.stream.Collectors;

import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.toonder.backend.ResourceNotFoundException;
import com.toonder.backend.review.Review;
import com.toonder.backend.review.ReviewRepository;
import com.toonder.backend.review.ReviewRequestDto;
import com.toonder.backend.review.ReviewResponseDto;

@Service
public class WebtoonService { 

    @Autowired
    private WebtoonRepository webtoonRepository;

	@Autowired
    private ReviewRepository reviewRepository;

    // 페이징 처리된 웹툰목록 데이터를 리턴 + 19금 필터
    public ResponseEntity<Map<String, Object>> getPagingWebtoon(String type, Pageable pageable, boolean filterAdult) {
        Map<String, Object> result = new HashMap<>();
        List<Webtoon> webtoonList;
    
        if ("title".equals(type)) {
            webtoonList = webtoonRepository.findAllByOrderByTitleAsc(pageable);
        } else {
            webtoonList = webtoonRepository.findAllByOrderByMastrIdDesc(pageable);
        }
    
        // 19금 필터 true = adult 컬럼이 0인 데이터만 가져오도록 필터링
        if (filterAdult) {
            webtoonList = webtoonList.stream()
                    .filter(webtoon -> "0".equals(webtoon.getAdult()))
                    .collect(Collectors.toList());
        }
        List<WebtoonResponseDto> dtoList = new ArrayList<>();
        for (Webtoon webtoon : webtoonList) {
            WebtoonResponseDto dto = new WebtoonResponseDto(webtoon);
            dtoList.add(dto);
        }
        result.put("list", dtoList);
        return ResponseEntity.ok(result);
    }

    // id값에 해당하는 웹툰 불러오기
    public WebtoonResponseDto getWebtoon(String mastrId) {
        Webtoon webtoon = webtoonRepository.findById(mastrId)
                .orElseThrow(() -> new ResourceNotFoundException(mastrId + "번에 해당하는 웹툰이 존재하지 않습니다"));
        return new WebtoonResponseDto(webtoon);
    }

    //웹툰 제목/작가명으로 검색 (페이징 처리)
    @Transactional
    public ResponseEntity<Map<String, Object>> search(String type, String keyword, Pageable pageable, boolean adultFilter) {
        Map<String, Object> result = new HashMap<>();

        if (keyword == null || keyword.isEmpty()) {
            Map<String, Object> emptyResponse = new HashMap<>();
            emptyResponse.put("message", "키워드를 입력하세요");
            return ResponseEntity.ok(emptyResponse);
        }

        List<Webtoon> webtoonList;
        if ("title".equals(type)) {
            webtoonList = webtoonRepository.findByTitleContaining(keyword, pageable);
        } else if ("author".equals(type)) {
            webtoonList = webtoonRepository.findByPictrWritrNmContaining(keyword, pageable);
        } else {
            Map<String, Object> invalidTypeResponse = new HashMap<>();
            invalidTypeResponse.put("message", "유효하지 않은 검색 타입입니다");
            return ResponseEntity.ok(invalidTypeResponse);
        }

        if (adultFilter) {
            webtoonList = webtoonList.stream()
                    .filter(webtoon -> "0".equals(webtoon.getAdult()))
                    .collect(Collectors.toList());
        }

        if (webtoonList == null || webtoonList.isEmpty()) {
            Map<String, Object> emptyResponse = new HashMap<>();
            emptyResponse.put("message", "검색 결과가 없습니다");
            return ResponseEntity.ok(emptyResponse);
        }

        List<WebtoonResponseDto> dtoList = new ArrayList<>();
        for (Webtoon webtoon : webtoonList) {
            WebtoonResponseDto dto = new WebtoonResponseDto(webtoon);
            dtoList.add(dto);
        }

        result.put("list", dtoList);
        return ResponseEntity.ok(result);
    }

    //메인페이지 - outline recommendation 
    public List<WebtoonResponseDto> getRandomWebtoons(int count, boolean adultFilter) {
        List<String> randomMastrIds;
    
        if (adultFilter) {
            randomMastrIds = webtoonRepository.findNonAdultRandomMastrIds(count);
        } else {
            randomMastrIds = webtoonRepository.findRandomMastrIds(count);
        }
    
        List<Webtoon> randomWebtoons = webtoonRepository.findByMastrIdIn(randomMastrIds);
    
        List<WebtoonResponseDto> randomWebtoonDtos = randomWebtoons.stream()
                .map(WebtoonResponseDto::new)
                .collect(Collectors.toList());
    
        return randomWebtoonDtos;
    }
    
    public List<WebtoonResponseDto> getRecommendedWebtoons(String mastrId, boolean adultFilter) {
        if (mastrId == null) {
            return getRandomWebtoons(3, adultFilter);
        }
    
        Optional<Webtoon> optionalWebtoon = webtoonRepository.findByMastrId(mastrId);
    
        if (optionalWebtoon.isPresent()) {
            Webtoon webtoon = optionalWebtoon.get();
    
            List<String> recommendations = processRecommendations(webtoon.getOutline_recommendations());
    
            List<String> selectedRecommendations = selectRandomRecommendations(recommendations, 3);
    
            List<Webtoon> recommendedWebtoons = webtoonRepository.findByMastrIdIn(selectedRecommendations);
    
            if (adultFilter) {
                recommendedWebtoons = filterAdultWebtoons(recommendedWebtoons);
            }
    
            List<WebtoonResponseDto> recommendedWebtoonDtos = recommendedWebtoons.stream()
                    .map(WebtoonResponseDto::new)
                    .collect(Collectors.toList());
    
            return recommendedWebtoonDtos;
        }
    
        return Collections.emptyList();
    }

    private List<Webtoon> filterAdultWebtoons(List<Webtoon> webtoons) {
        return webtoons.stream()
                .filter(webtoon -> !"1".equals(webtoon.getAdult()))
                .collect(Collectors.toList());
    }

    private List<String> processRecommendations(String outlineRecommendations) {
        String[] recommendationArray = outlineRecommendations.replaceAll("\\[|\\]", "").split("\\s*,\\s*");
        return Arrays.asList(recommendationArray);
    }

    private List<String> selectRandomRecommendations(List<String> recommendations, int count) {
        Collections.shuffle(recommendations);

        List<String> validRecommendations = recommendations.stream()
                .filter(mastrId -> {
                    boolean hasCorrespondingTuple = webtoonRepository.findByMastrId(mastrId).isPresent();
                    return hasCorrespondingTuple;
                })
                .collect(Collectors.toList());

        return validRecommendations.subList(0, Math.min(count, validRecommendations.size()));
    }

    //메인페이지 - draw recommendation
    public List<WebtoonResponseDto> getDrawRecommendedWebtoons(String mastrId, boolean adultFilter) {

        if (mastrId == null) {
            return getRandomWebtoons(3, adultFilter);
        }

        Optional<Webtoon> optionalWebtoon = webtoonRepository.findByMastrId(mastrId);
    
        if (optionalWebtoon.isPresent()) {
            Webtoon webtoon = optionalWebtoon.get();
            String drawId = webtoon.getDrawId();
    
            List<Webtoon> webtoonsWithSameDrawId = webtoonRepository.findByDrawId(drawId);

            webtoonsWithSameDrawId.removeIf(w -> w.getMastrId().equals(mastrId));

            if (adultFilter) {
                webtoonsWithSameDrawId.removeIf(w -> "1".equals(w.getAdult()));
            }
    
            List<Webtoon> recommendedWebtoons = selectRandomWebtoons(webtoonsWithSameDrawId, 3);
    
            return recommendedWebtoons.stream()
                    .map(WebtoonResponseDto::new)
                    .collect(Collectors.toList());
        }
    
        return Collections.emptyList();
    }
    
    private List<Webtoon> selectRandomWebtoons(List<Webtoon> webtoons, int count) {
        Collections.shuffle(webtoons);
    
        int size = Math.min(count, webtoons.size());
    
        return webtoons.subList(0, size);
    }

	// --- 리뷰 ---



    // 웹툰에 리뷰 작성 (create)
    public ReviewResponseDto createReview(String mastrId, ReviewRequestDto reviewDto) {
        Webtoon webtoon = webtoonRepository.findById(mastrId)
                .orElseThrow(() -> new ResourceNotFoundException(mastrId + "번 웹툰이 존재하지 않습니다"));

        double revRating = reviewDto.getRevRating();

        if (revRating < 0 || revRating > 5 || revRating % 0.5 != 0) {
            throw new IllegalArgumentException("별점은 0부터 5까지 0.5단위로 가능합니다.");
        }

        Review review = reviewDto.toEntity();
        review.setWebtoon(webtoon);

        Review savedReview = reviewRepository.save(review);
        ReviewResponseDto responseDto = new ReviewResponseDto(savedReview);
        return responseDto;
    }

    // 리뷰 조회
    public List<ReviewResponseDto> getAllReviewsForWebtoon(String mastrId) {
        Webtoon webtoon = webtoonRepository.findById(mastrId)
                .orElseThrow(() -> new ResourceNotFoundException(mastrId + "번 웹툰이 존재하지 않습니다"));

        List<ReviewResponseDto> responseDtoList = new ArrayList<>();
        for (Review review : webtoon.getReview()) {
            ReviewResponseDto responseDto = new ReviewResponseDto(review);
            responseDtoList.add(responseDto);
        }

        return responseDtoList;
    }

    // 리뷰 수정
	public ReviewResponseDto updateReview(String mastrId, Integer revNo, ReviewRequestDto reviewDto) {
		try {
            Webtoon webtoon = webtoonRepository.findById(mastrId)
                    .orElseThrow(() -> new ResourceNotFoundException(mastrId + "번 웹툰이 존재하지 않습니다"));
			Review review = webtoon.getReview().stream()
					.filter(c -> c.getRevNo().equals(revNo))
					.findFirst()
					.orElseThrow(() -> new ResourceNotFoundException(revNo + "번 댓글이 존재하지 않습니다"));

			if (!review.getMember().getMem_email().equals(reviewDto.getMem_email())) {
				throw new AccessDeniedException("댓글 수정 권한이 없습니다");
			}

            double revRating = reviewDto.getRevRating();
            if (revRating < 0 || revRating > 5 || revRating % 0.5 != 0) {
                throw new IllegalArgumentException("별점은 0부터 5까지 0.5단위로 가능합니다.");
            }

			review.update(reviewDto.getRevContent());
            review.setRevRating(reviewDto.getRevRating());
			review.setRevUpdateDate(new Timestamp(System.currentTimeMillis()));

			Review updatedReview = reviewRepository.save(review);
			ReviewResponseDto responseDto = new ReviewResponseDto(updatedReview);
			return responseDto;
		} catch (AccessDeniedException e) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "댓글 수정 권한이 없습니다");
		}
	}

	//댓글 삭제
    public ResponseEntity<Map<String, Boolean>> deleteReview(String mastrId, Integer revNo, ReviewRequestDto reviewDto) {
		try {
			Webtoon webtoon = webtoonRepository.findById(mastrId)
                .orElseThrow(() -> new ResourceNotFoundException(mastrId + "번 웹툰이 존재하지 않습니다"));
	
            Review review = webtoon.getReview().stream()
					.filter(c -> c.getRevNo().equals(revNo))
					.findFirst()
					.orElseThrow(() -> new ResourceNotFoundException(revNo + "번 댓글이 존재하지 않습니다"));
	
			if (!review.getMember().getMem_email().equals(reviewDto.getMem_email())) {
				throw new AccessDeniedException("댓글 삭제 권한이 없습니다");
			}
	
			reviewRepository.delete(review);
	
			Map<String, Boolean> response = new HashMap<>();
			response.put(revNo + "번 댓글이 삭제되었습니다", Boolean.TRUE);
			return ResponseEntity.ok(response);
		} catch (AccessDeniedException e) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "댓글 삭제 권한이 없습니다");
		}
	}

	// 댓글 좋아요 기능
    public ReviewResponseDto likeReview(String mastrId, Integer revNo,String mem_email) {
        Review review = reviewRepository.findById(revNo)
                .orElseThrow(() -> new RuntimeException("댓글을 찾을 수 없습니다."));

		if (review.isLikedByMember(mem_email)) {
			review.decreaseLike(mem_email); // 좋아요 취소
		} else {
			review.increaseLike(mem_email); // 좋아요 추가
		}
	
		Review likedReview = reviewRepository.save(review);
		return new ReviewResponseDto(likedReview);
	}

    /* 
    //--- 웹툰 정보 저장 ---
    @Transactional(rollbackFor = Exception.class)
    public void init(String jsonData) {
        try {
            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(jsonData);
            JSONArray jsonArray = (JSONArray) jsonObject.get("itemList");

            if (jsonArray != null) {
                for (int i = 0; i < jsonArray.size(); i++) {
                    JSONObject jObj = (JSONObject) jsonArray.get(i);

                    String ageGradCdNm = jObj.get("ageGradCdNm").toString();

                    if (!ageGradCdNm.equals("19세 이상") ) {
                        String mastrId = jObj.get("mastrId").toString();

                        // mastrId로 이미 저장된 웹툰 정보가 있는지 확인
                        Webtoon existingWebtoon = webtoonRepository.findById(mastrId).orElse(null);

                        if (existingWebtoon == null) {
                            Webtoon webtoon = new Webtoon();
                            webtoon.setMastrId(mastrId);
                            webtoon.setTitle(jObj.get("title").toString());
                            //webtoon.setPictrWritrNm(jObj.get("pictrWritrNm").toString());
                            //webtoon.setSntncWritrNm(jObj.get("sntncWritrNm").toString());
                            
                            String[] properties = {"pictrWritrNm", "sntncWritrNm", "mainGenreCdNm", "imageDownloadUrl", "outline", "pltfomCdNm", "fnshYn", "webtoonPusryYn"};
                            for (String property : properties) {
                                String value = jObj.get(property) != null ? jObj.get(property).toString() : "";
                                switch (property) {
                                    case "pictrWritrNm":
                                        webtoon.setPictrWritrNm(value);
                                        break;
                                    case "mainGenreCdNm":
                                        webtoon.setMainGenreCdNm(value);
                                        break;
                                    case "imageDownloadUrl":
                                        webtoon.setImageDownloadUrl(value);
                                        break;
                                    case "outline":
                                        webtoon.setOutline(value);
                                        break;
                                    case "pltfomCdNm":
                                        webtoon.setPltfomCdNm(value);
                                        break;
                                }
                            }

                            webtoonRepository.save(webtoon);
                        }
                    }
                }
            }

            webtoonRepository.flush(); // 변경 사항을 즉시 데이터베이스에 반영

        } catch (Exception e) {
            e.printStackTrace();
            //예외 처리
        }
    }*/



}


