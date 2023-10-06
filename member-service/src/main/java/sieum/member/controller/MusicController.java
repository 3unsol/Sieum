package sieum.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sieum.member.dto.MessageOnly;
import sieum.member.dto.request.MusicAddRequestDto;
import sieum.member.service.MusicService;

import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/music")
@RequiredArgsConstructor
public class MusicController {
    private final MusicService musicService;

    @PostMapping
    public ResponseEntity<MessageOnly> addLikedMusic(@RequestHeader Map<String, String> headers, @RequestBody MusicAddRequestDto musicAddRequestDto){
        String userId = headers.get("uuid");
        log.info("userId: {} ", userId);
        musicService.addLikedMusic(UUID.fromString(userId), musicAddRequestDto);
        return new ResponseEntity<>(new MessageOnly("음악을 추가했습니다."), HttpStatus.ACCEPTED);
    }
}
