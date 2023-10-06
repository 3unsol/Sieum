package sieum.community.communityservice.controller;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import sieum.community.communityservice.dto.*;
import sieum.community.communityservice.service.PostService;

@RestController
@RequestMapping("api/posts")
@RequiredArgsConstructor
public class PostController {

	private final PostService postService;

	@GetMapping(value = "/{page}/{size}")
	public ResponseEntity<PostListDTO.Response> getAllPosts(
		@RequestHeader(name = "uuid") String memberId,
		@PathVariable int page,
		@PathVariable int size){
		System.out.println("들어오옹아ㅣㅣ니니ㅣ니니ㅣㄴ");
		PostListDTO.Request dto = PostListDTO.Request.builder()
			.memberId(UUID.fromString(memberId))
			.page(page)
			.size(size)
			.build();
		PostListDTO.Response list = postService.getAllPosts(dto);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@GetMapping(value = "/{postId}")
	public ResponseEntity<PostDetailDTO.Response> getPost(
		@RequestHeader(name="uuid") String memberId,
		@PathVariable Long postId){
		PostDetailDTO.Request dto = PostDetailDTO.Request.builder()
			.memberId(UUID.fromString(memberId))
			.postId(postId)
			.build();
		PostDetailDTO.Response post = postService.getPost(dto);
		return new ResponseEntity<>(post, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<PostSaveDTO.Response> savePost(
			@RequestHeader(name="uuid") String memberId,
			@RequestBody PostSaveDTO.Request dto){
		System.out.println(memberId);
		System.out.println(dto.getTitle());
		System.out.println(dto.getContent());
		System.out.println(dto.getAlbumImg());
		System.out.println(dto.getArtist());
		System.out.println(dto.getMusicUri());
		dto.setMemberId(UUID.fromString(memberId));
		PostSaveDTO.Response res = postService.savePost(dto);
		return new ResponseEntity<>(res, HttpStatus.CREATED);
	}

	@PutMapping(value = "/{postId}")
	public ResponseEntity<PostUpdateDTO.Response> updatePost(
			@RequestHeader(name = "uuid") String memberId,
			@PathVariable Long postId,
			@RequestBody PostUpdateDTO.Request dto){
		dto.setMemberId(UUID.fromString(memberId));
		dto.setPostId(postId);
		PostUpdateDTO.Response success = postService.updatePost(dto);
		return new ResponseEntity<>(success,HttpStatus.OK);
	}

	@DeleteMapping(value = "/{postId}")
	public ResponseEntity<PostDeleteDTO.Response> deleltePost(
			@RequestHeader(name = "uuid") String memberId,
			@PathVariable Long postId){
		PostDeleteDTO.Request dto = PostDeleteDTO.Request.builder()
				.postId(postId)
				.memberId(UUID.fromString(memberId))
				.build();
		PostDeleteDTO.Response success = postService.deletePost(dto);
		return new ResponseEntity<>(success, HttpStatus.OK);
	}

	@PostMapping(value = "/{postId}/like")
	public ResponseEntity<PostLikeDTO.Response> likePost(
			@RequestHeader(name = "uuid") String memberId,
			@PathVariable Long postId,
			@RequestBody PostLikeDTO.Request dto){
		dto.setPostId(postId);
		dto.setMemberId(UUID.fromString(memberId));
		PostLikeDTO.Response success = postService.likePost(dto);
		return new ResponseEntity<>(success, HttpStatus.OK);
	}
}
