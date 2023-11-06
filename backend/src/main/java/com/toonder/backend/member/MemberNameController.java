package com.toonder.backend.member;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

@RequestMapping("/toonder")
@RestController
public class MemberNameController {
    @Autowired
    private MemberRepository memberRepository;
    
    @RequestMapping(value = "/name", method = {RequestMethod.GET, RequestMethod.POST})
    public Map<String, String> selectById(@RequestBody Map<String,String> memberEmail){

        Member member = memberRepository.findById(memberEmail.get("email")).orElse(null);
        if (member == null) {
            return null;
        }
        Map<String, String> result = new HashMap<>();
        result.put("mem_name", member.getMem_name());
        return result;
    }
}