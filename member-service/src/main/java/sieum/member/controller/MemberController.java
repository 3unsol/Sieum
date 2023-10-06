package sieum.member.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sieum.member.dto.response.MemberProfileResponseDto;
import sieum.member.dto.request.MemberProfileUpdateRequestDto;
import sieum.member.dto.MessageOnly;
import sieum.member.dto.MessageWithData;
import sieum.member.service.MemberService;

import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @GetMapping
    public ResponseEntity<MessageWithData<MemberProfileResponseDto>> getMyProfile(@RequestHeader Map<String, String> headers) throws JsonProcessingException {
        String uuid = headers.get("uuid");
        MemberProfileResponseDto data = memberService.getMyProfile(UUID.fromString(uuid));
        return new ResponseEntity<>(new MessageWithData<>("test", data), HttpStatus.ACCEPTED);
    }

    @GetMapping("/{spotifyId}")
    public ResponseEntity<MessageWithData<MemberProfileResponseDto>> getOtherProfile(@PathVariable String spotifyId){
        MemberProfileResponseDto data = memberService.getOtherProfile(spotifyId);
        return new ResponseEntity<>(new MessageWithData<>(data.getNickname()+"님의 프로필을 조회했습니다.", data), HttpStatus.ACCEPTED);
    }

    @PutMapping
    public ResponseEntity<MessageWithData<MemberProfileResponseDto>> updateMemberProfile(@RequestHeader Map<String, String> headers,
                                                               @RequestBody MemberProfileUpdateRequestDto memberProfileUpdateRequestDto){
        String uuid = headers.get("uuid");
        MemberProfileResponseDto data = memberService.updateMemberProfile(UUID.fromString(uuid), memberProfileUpdateRequestDto);
        return new ResponseEntity<>(new MessageWithData<>("프로필을 변경했습니다.", data), HttpStatus.ACCEPTED);
    }

    @DeleteMapping
    public ResponseEntity<MessageOnly> deleteMember(@RequestHeader Map<String, String> headers){
        String uuid = headers.get("uuid");
        memberService.deleteUser(UUID.fromString(uuid));
        return new ResponseEntity<>(new MessageOnly("탈퇴하였습니다."), HttpStatus.ACCEPTED);
    }

}
