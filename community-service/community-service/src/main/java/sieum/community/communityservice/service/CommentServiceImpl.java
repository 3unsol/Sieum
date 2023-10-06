package sieum.community.communityservice.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.hibernate.annotations.NotFound;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.hypersistence.utils.hibernate.util.StringUtils;
import lombok.RequiredArgsConstructor;
import sieum.community.communityservice.dto.CommentDeleteDTO;
import sieum.community.communityservice.dto.CommentListDTO;
import sieum.community.communityservice.dto.CommentSaveDTO;
import sieum.community.communityservice.dto.CommentUpdateDTO;
import sieum.community.communityservice.entity.Comment;
import sieum.community.communityservice.entity.Member;
import sieum.community.communityservice.entity.Post;
import sieum.community.communityservice.exception.AccessDeniedException;
import sieum.community.communityservice.exception.ErrorCode;
import sieum.community.communityservice.exception.NotFoundException;
import sieum.community.communityservice.exception.ValidationException;
import sieum.community.communityservice.repository.CommentRepository;
import sieum.community.communityservice.repository.MemberRepository;
import sieum.community.communityservice.repository.PostRepository;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

	private final CommentRepository commentRepository;
	private final MemberRepository memberRepository;
	private final PostRepository postRepository;

	@Override
	@Transactional(readOnly = true)
	public CommentListDTO.Response getList(CommentListDTO.Request dto) {
		int page = dto.getPage();
		int size = dto.getSize();
		UUID memberId = dto.getMemberId();
		Long postId = dto.getPostId();

		Post post = postRepository.findById(postId)
			.orElseThrow(() -> new NotFoundException(ErrorCode.POST_NOT_FOUND));

		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));

		Pageable pageable = PageRequest.of(page, size);

		Page<Object[]> result = commentRepository.findCommentsOrderByDate(pageable);

		List<CommentListDTO.Comment> comments = result.getContent().stream()
			.map(obj -> {
				Comment entity = (Comment)obj[0];
				return CommentListDTO.Comment.builder()
					.commentId(entity.getCommentId())
					.nickname(entity.getMember().getNickname())
					.profileImg(entity.getMember().getProfileImageUrl())
					.modifiedDate(entity.getModifiedDate())
					.createdDate(entity.getCreatedDate())
					.content(entity.getCommentContent())
					.memberId(entity.getMember().getId())
					.build();
			}).collect(Collectors.toList());

		return CommentListDTO.Response.builder()
			.prev(result.hasPrevious())
			.next(result.hasNext())
			.comments(comments)
			.page(result.getNumber())
			.build();
	}

	@Override
	@Transactional
	public CommentSaveDTO.Response save(CommentSaveDTO.Request dto) {
		UUID memberId = dto.getMemberId();
		Long postId = dto.getPostId();
		String content = dto.getContent();

		if (memberId == null || StringUtils.isBlank(content) || postId == null) {
			throw new ValidationException(ErrorCode.MISSING_INPUT_VALUE);
		}

		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));

		Post post = postRepository.findById(postId)
			.orElseThrow(() -> new NotFoundException(ErrorCode.POST_NOT_FOUND));

		LocalDateTime createdDate = LocalDateTime.now();

		Comment comment = Comment.builder()
			.commentContent(content)
			.post(post)
			.member(member)
			.createdDate(createdDate)
			.modifiedDate(createdDate)
			.build();

		commentRepository.save(comment);

		return CommentSaveDTO.Response.builder()
			.success(true)
			.build();
	}

	@Override
	@Transactional
	public CommentUpdateDTO.Response update(CommentUpdateDTO.Request dto) {
		UUID memberId = dto.getMemberId();
		Long postId = dto.getPostId();
		Long commentId = dto.getCommentId();
		String content = dto.getContent();

		if(memberId == null || StringUtils.isBlank(content) || postId == null || commentId == null){
			throw new ValidationException(ErrorCode.MISSING_INPUT_VALUE);
		}

		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));

		Post post = postRepository.findById(postId)
			.orElseThrow(() -> new NotFoundException(ErrorCode.POST_NOT_FOUND));

		Comment comment = commentRepository.findById(commentId)
			.orElseThrow(()-> new NotFoundException(ErrorCode.COMMENT_NOT_FOUND));

		if(comment.getMember().getId() != memberId){
			throw new AccessDeniedException(ErrorCode.HANDLE_ACCESS_DENIED);
		}

		comment.updateContent(content);
		comment.updatedDate(LocalDateTime.now());

		return CommentUpdateDTO.Response.builder()
			.success(true)
			.build();
	}

	@Override
	@Transactional
	public CommentDeleteDTO.Response delete(CommentDeleteDTO.Request dto) {
		UUID memberId = dto.getMemberId();
		Long postId = dto.getPostId();
		Long commentId = dto.getCommentId();

		if(memberId == null || postId == null || commentId == null){
			throw new ValidationException(ErrorCode.MISSING_INPUT_VALUE);
		}

		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));

		Post post = postRepository.findById(postId)
			.orElseThrow(() -> new NotFoundException(ErrorCode.POST_NOT_FOUND));

		Comment comment = commentRepository.findById(commentId)
			.orElseThrow(()-> new NotFoundException(ErrorCode.COMMENT_NOT_FOUND));

		if(comment.getMember().getId() != memberId){
			throw new AccessDeniedException(ErrorCode.HANDLE_ACCESS_DENIED);
		}

		commentRepository.delete(comment);
		// comment.deleteComment(true);

		return CommentDeleteDTO.Response.builder()
			.success(true)
			.build();
	}
}
