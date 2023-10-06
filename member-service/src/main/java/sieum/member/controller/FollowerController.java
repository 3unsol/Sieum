package sieum.member.controller;

import java.util.List;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import sieum.member.dto.MessageOnly;
import sieum.member.dto.MessageWithData;
import sieum.member.dto.response.FollowListResponseDto;
import sieum.member.message.FollowMessage;
import sieum.member.dto.request.FollowRequestDto;
import sieum.member.service.FollowerService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/follow")
public class FollowerController {

	private final FollowerService followerService;

	/**
	 * Follow API
	 * @param uuid  Follow를 요청한 대상의 UUID
	 * @param followRequestDto Follow를 받은 대상의 UUID
	 * @return
	 */
	@PostMapping("")
	public ResponseEntity<MessageOnly> follow(@RequestHeader(name = "uuid") String uuid, @RequestBody @Valid FollowRequestDto followRequestDto){
		followerService.follow(UUID.fromString(uuid), UUID.fromString(followRequestDto.getFollowerId()));
		return new ResponseEntity<>(new MessageOnly(FollowMessage.SUCCESS_FOLLOW.getMessage()), HttpStatus.OK);
	}

	/**
	 * Unfollow API
	 * @param uuid Unfollow를 요청한 대상의 UUID
	 * @param followeeId Unfollow를 받은 대상의 UUID
	 * @return
	 */
	@DeleteMapping("/{followeeId}")
	public ResponseEntity<MessageOnly> unfollow(@RequestHeader(name = "uuid") String uuid, @PathVariable String followeeId){
		followerService.unfollow(UUID.fromString(uuid), UUID.fromString(followeeId));
		return new ResponseEntity<>(new MessageOnly(FollowMessage.SUCCESS_UNFOLLOW.getMessage()), HttpStatus.OK);
	}

	/**
	 * 내가 팔로우하고 있는 멤버들의 목록 조회 기능
	 * @param uuid  팔로우하고 있는 멤버를 보고자 하는 대상의 UUID
	 * @param pageable page번호
	 * @return
	 */
	@GetMapping("/list/followee")
	public ResponseEntity<MessageWithData<FollowListResponseDto>> getFolloweeList(@RequestHeader(name = "uuid") String uuid, @PageableDefault Pageable pageable){
		MessageWithData <FollowListResponseDto> messageWithData = MessageWithData.<FollowListResponseDto>builder()
			.data(followerService.getFolloweeList(UUID.fromString(uuid),pageable))
			.message(null)
			.build();

		return new ResponseEntity<>(messageWithData, HttpStatus.OK);
	}

	/**
	 * 나를 팔로워하고 있는 목록 조회 기능
	 * @param uuid 자신을 팔로우하고 있는 멤버를 보고자 하는 대상의 UUID
	 * @param pageable page번호
	 * @return
	 */
	@GetMapping("/list/follower")
	public ResponseEntity<MessageWithData<FollowListResponseDto>> getFollowerList(@RequestHeader(name = "uuid") String uuid, @PageableDefault Pageable pageable){
		MessageWithData <FollowListResponseDto> messageWithData = MessageWithData.<FollowListResponseDto>builder()
			.data(followerService.getFollowerList(UUID.fromString(uuid),pageable))
			.message(null)
			.build();

		return new ResponseEntity<>(messageWithData, HttpStatus.OK);
	}




}
