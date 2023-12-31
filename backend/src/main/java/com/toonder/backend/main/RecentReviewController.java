package com.toonder.backend.main;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.toonder.backend.review.Review;
import com.toonder.backend.review.ReviewRepository;

@RestController
@RequestMapping("/toonder")
public class RecentReviewController {

    @Autowired
    private ReviewRepository reviewRepository;
    
    @RequestMapping(value = "/recentReviews", method = {RequestMethod.GET, RequestMethod.POST})
    public List<Review> getMemberReview() {
        List<Review> reviewList = reviewRepository.findAll();
        List<Review> result = reviewList.subList(reviewList.size()-5, reviewList.size());
        Collections.reverse(result);
        
        return result;
        
    }
}
