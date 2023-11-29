package com.toonder.backend.webtoon;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.data.domain.Sort;

@RestController
@RequestMapping("/toonder")
public class WebtoonController {
    
    @Autowired
    private WebtoonService webtoonService;
    
    // 웹툰 목록 리턴 (페이징 처리) +19금 필터
    @GetMapping("/webtoon")
    public ResponseEntity<List<WebtoonResponseDto>> getAllWebtoons(
        @RequestParam(value ="type", required = false) String type,
        @RequestParam(value = "page", required = false) Integer page,
        @RequestParam(value = "19filter", required = false, defaultValue = "false") boolean adultFilter,
        @PageableDefault(size = 64, direction = Sort.Direction.DESC) Pageable pageable) {

        if (page == null) {
            page = 1;
        }

        Pageable modifiedPageable;
        if (StringUtils.hasText(type)) {
            modifiedPageable = PageRequest.of(page - 1, pageable.getPageSize(), Sort.by(type));
        } else {
            modifiedPageable = PageRequest.of(page - 1, pageable.getPageSize(), Sort.by("mastrId").descending());
        }

        ResponseEntity<Map<String, Object>> response = webtoonService.getPagingWebtoon(type, modifiedPageable, adultFilter);
        if (response == null || response.getBody() == null) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        List<WebtoonResponseDto> webtoonResponseDtoList = (List<WebtoonResponseDto>) response.getBody().get("list");

        return ResponseEntity.ok(webtoonResponseDtoList);
    }

    // 웹툰 상세보기
    @GetMapping("/webtoon/{mastrId}")
    public ResponseEntity<WebtoonResponseDto> getWebtoon(@PathVariable String mastrId,  HttpSession session) {

        //최근 본 웹툰
        UserSession userSession = (UserSession) session.getAttribute("userSession");

        if (userSession == null) {
            userSession = new UserSession();
            session.setAttribute("userSession", userSession);
        }

        userSession.setRecentlyViewedMastrId(mastrId);

        //웹툰 상세보기
        WebtoonResponseDto webtoonResponseDto = webtoonService.getWebtoon(mastrId);

        return ResponseEntity.ok(webtoonResponseDto);
    } 

    //웹툰 제목/작가명으로 검색 +19금 필터
    @GetMapping("/webtoon/search")
    public ResponseEntity<List<WebtoonResponseDto>> search(
        @RequestParam("type") String type,
        @RequestParam("keyword") String keyword,
        @RequestParam(value = "page", required = false) Integer page,
        @RequestParam(value = "19filter", required = false, defaultValue = "false") boolean adultFilter,
        @PageableDefault(size = 64, sort = "mastrId", direction = Sort.Direction.DESC) Pageable pageable) {

        if (page == null) {
            page = 1;
        }

        Pageable modifiedPageable = PageRequest.of(page - 1, pageable.getPageSize(), pageable.getSort());

        ResponseEntity<Map<String, Object>> response = webtoonService.search(type, keyword, modifiedPageable, adultFilter);
        if (response == null || response.getBody() == null) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        List<WebtoonResponseDto> webtoonResponseDtoList = (List<WebtoonResponseDto>) response.getBody().get("list");

        return ResponseEntity.ok(webtoonResponseDtoList);
    }

    //메인페이지 - outline recommendation +19금 필터
    @GetMapping("/webtoon/recommend/outline")
    public ResponseEntity<List<WebtoonResponseDto>> getRecommendedWebtoons(
            HttpSession session,
            @RequestParam(value = "19filter", required = false, defaultValue = "false") boolean adultFilter) {
    
        UserSession userSession = (UserSession) session.getAttribute("userSession");
    
        if (userSession == null || userSession.getRecentlyViewedMastrId() == null) {
            return ResponseEntity.notFound().build();
        }
    
        String recentlyViewedMastrId = userSession.getRecentlyViewedMastrId();
    
        List<WebtoonResponseDto> recommendedWebtoons = webtoonService.getRecommendedWebtoons(recentlyViewedMastrId, adultFilter);
    
        return ResponseEntity.ok(recommendedWebtoons);
    }

}
