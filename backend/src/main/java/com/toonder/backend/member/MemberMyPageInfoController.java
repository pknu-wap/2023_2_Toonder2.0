package com.toonder.backend.member;

import java.util.*;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.toonder.backend.board.Board;
import com.toonder.backend.board.BoardRepository;
import com.toonder.backend.review.Review;
import com.toonder.backend.review.ReviewRepository;
import com.toonder.backend.webtoon.UserSession;
import com.toonder.backend.webtoon.Webtoon;
import com.toonder.backend.webtoon.WebtoonRepository;
import com.toonder.backend.webtoon.WebtoonTitleDto;

@RestController
@RequestMapping("/toonder")
public class MemberMyPageInfoController{
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private WebtoonRepository webtoonRepository;

    @RequestMapping(value = "/mypage/board", method = {RequestMethod.GET, RequestMethod.POST})
    public List<Board> getMemberBoards(@RequestBody Map<String, String> memberEmail) {    
        System.out.println(memberEmail.get("email"));  
        List<Board> allBoards =  boardRepository.findAll();
        List<Board> result = new ArrayList<Board>();
        for (int i=0; i<allBoards.size(); i++){
            
            if (allBoards.get(i).getMember().getMem_email().equals(memberEmail.get("email")) ){
                System.out.println(allBoards.get(i).getMember().getMem_email());    
                result.add(allBoards.get(i));
            }
            
        }   
        return result;
        
    }

    @RequestMapping(value = "/mypage/review", method = {RequestMethod.GET, RequestMethod.POST})
    public List<Review> getMemberReview(@RequestBody Map<String, String> memberEmail) {    
        System.out.println(memberEmail.get("email"));  
        List<Review> allReviews=  reviewRepository.findAll();
        List<Review> result = new ArrayList<Review>();
        for (int i=0; i<allReviews.size(); i++){
            
            if (allReviews.get(i).getMember().getMem_email().equals(memberEmail.get("email")) ){
                System.out.println(allReviews.get(i).getMember().getMem_email());    
                result.add(allReviews.get(i));
            }
            
        }   
        return result;
        
    }
    

    @RequestMapping(value = "/mypage", method = {RequestMethod.GET, RequestMethod.POST})
    public MemberMyPageInfoDto selectById(@RequestBody Map<String,String> memberEmail){

        Member member = memberRepository.findById(memberEmail.get("email")).orElse(null);
        if (member == null) {
            return null;
        }
        return new MemberMyPageInfoDto(member.getMem_name(), member.getMem_hashtag());
    }

    @GetMapping("/mypage/recentlyViewed")
    public ResponseEntity<WebtoonTitleDto> getMyPage(HttpSession session) {
        UserSession userSession = (UserSession) session.getAttribute("userSession");

        if (userSession == null) {
            return ResponseEntity.notFound().build();
        }

        String recentlyViewedMastrId = userSession.getRecentlyViewedMastrId();

        if (recentlyViewedMastrId == null) {
            return ResponseEntity.notFound().build();
        }

        Optional<Webtoon> recentlyViewedWebtoonOptional = webtoonRepository.findByMastrId(recentlyViewedMastrId);

        if (recentlyViewedWebtoonOptional.isPresent()) {
            Webtoon recentlyViewedWebtoon = recentlyViewedWebtoonOptional.get();
            WebtoonTitleDto titleDto = new WebtoonTitleDto(recentlyViewedWebtoon.getMastrId(), recentlyViewedWebtoon.getTitle());
            return ResponseEntity.ok(titleDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}