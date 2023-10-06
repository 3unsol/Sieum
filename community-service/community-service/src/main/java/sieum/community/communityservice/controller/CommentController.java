package sieum.community.communityservice.controller;

import java.nio.file.Path;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import sieum.community.communityservice.dto.CommentDeleteDTO;
import sieum.community.communityservice.dto.CommentListDTO;
import sieum.community.communityservice.dto.CommentSaveDTO;
import sieum.community.communityservice.dto.CommentUpdateDTO;
import sieum.community.communityservice.service.CommentService;

@RestController
@RequestMapping("api/posts")
@RequiredArgsConstructor
public class CommentController {
	private final CommentService commentService;

	@GetMapping(value = "/{postId}/comments/{page}/{size}")
	public ResponseEntity<CommentListDTO.Response> getCommentList(
		@RequestHeader(name = "uuid") String memberId,
		@PathVariable Long postId,
		@PathVariable int page,
		@PathVariable int size){
		CommentListDTO.Request dto = CommentListDTO.Request.builder()
			.memberId(UUID.fromString(memberId))
			.postId(postId)
			.page(page)
			.size(size)
			.build();
		return new ResponseEntity<>(commentService.getList(dto), HttpStatus.OK);
	}

	@PostMapping(value = "/{postId}/comments")
	public ResponseEntity<CommentSaveDTO.Response> saveComment(
		@RequestHeader(name = "uuid") String memberId,
		@PathVariable Long postId,
		@Validated @RequestBody CommentSaveDTO.Request dto){
		dto.setMemberId(UUID.fromString(memberId));
		dto.setPostId(postId);
		return new ResponseEntity<>(commentService.save(dto), HttpStatus.CREATED);
	}

	@PutMapping(value = "/{postId}/comments/{commentId}")
	public ResponseEntity<CommentUpdateDTO.Response> updateComment(
		@RequestHeader(name = "uuid") String memberId,
		@PathVariable Long postId,
		@PathVariable Long commentId,
		@Validated @RequestBody CommentUpdateDTO.Request dto){
		dto.setCommentId(commentId);
		dto.setPostId(postId);
		dto.setMemberId(UUID.fromString(memberId));
		return new ResponseEntity<>(commentService.update(dto), HttpStatus.OK);
	}

	@DeleteMapping(value = "/{postId}/comments/{commentId}")
	public ResponseEntity<CommentDeleteDTO.Response> deleteComment(
		@RequestHeader(name = "uuid") String memberId,
		@PathVariable Long postId,
		@PathVariable Long commentId){
		CommentDeleteDTO.Request dto = CommentDeleteDTO.Request.builder()
			.commentId(commentId)
			.postId(postId)
			.memberId(UUID.fromString(memberId))
			.build();
		return new ResponseEntity<>(commentService.delete(dto),HttpStatus.OK);
	}

}
