package sieum.community.communityservice.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import io.hypersistence.utils.hibernate.util.StringUtils;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import sieum.community.communityservice.entity.Member;
import sieum.community.communityservice.entity.Post;
import sieum.community.communityservice.entity.PostLike;
import sieum.community.communityservice.entity.PostLikeKey;
import sieum.community.communityservice.dto.PostDeleteDTO;
import sieum.community.communityservice.dto.PostDetailDTO;
import sieum.community.communityservice.dto.PostLikeDTO;
import sieum.community.communityservice.dto.PostListDTO;
import sieum.community.communityservice.dto.PostSaveDTO;
import sieum.community.communityservice.dto.PostUpdateDTO;
import sieum.community.communityservice.exception.AccessDeniedException;
import sieum.community.communityservice.exception.ErrorCode;
import sieum.community.communityservice.exception.NotFoundException;
import sieum.community.communityservice.exception.ValidationException;
import sieum.community.communityservice.repository.MemberRepository;
import sieum.community.communityservice.repository.PostLikeRepository;
import sieum.community.communityservice.repository.PostRepository;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService{

	private final PostRepository postRepository;
	private final MemberRepository memberRepository;
	private final PostLikeRepository postLikeRepository;

	@Override
	@Transactional
	public PostListDTO.Response getAllPosts(PostListDTO.Request dto) {
		int page = dto.getPage();
		int size = dto.getSize();
		String filter = dto.getFilter();
		UUID memberId = dto.getMemberId();

		Pageable pageable = PageRequest.of(page, size);
		Page<Object[]> result = postRepository.findPosts(pageable);

		List<PostListDTO.Post> posts = result.getContent().stream()
			.map(e -> {
				Post obj = (Post) e[0];
				PostLikeKey likeKey = PostLikeKey.builder()
					.post(obj.getPostId())
					.member(memberId)
					.build();
				Optional<PostLike> postLike = postLikeRepository.findById(likeKey);
				boolean isLike = false;
				if(postLike.isPresent()){
					isLike = true;
				}
				return PostListDTO.Post.builder()
					.postId(obj.getPostId())
					.content(obj.getPostContent())
					.likeCount(obj.getLikeCount())
					.albumImg(obj.getPostAlbumImage())
					.artist(obj.getPostArtist())
					.title(obj.getPostTitle())
					.commentCount(obj.getCommentCount())
					.profileImg(obj.getMember().getProfileImageUrl())
					.nickname(obj.getMember().getNickname())
					.isLike(isLike)
					.build();
			}).collect(Collectors.toList());
		return PostListDTO.Response.builder()
			.posts(posts)
			.prev(result.hasPrevious())
			.next(result.hasNext())
			.page(result.getNumber())
			.build();
	}

	@Override
	@Transactional
	public PostDetailDTO.Response getPost(PostDetailDTO.Request dto) {
		Long postId = dto.getPostId();
		UUID memberId = dto.getMemberId();

		Post post = postRepository.findById(postId)
			.orElseThrow(() -> new NotFoundException(ErrorCode.POST_NOT_FOUND));

		Member member = memberRepository.findById(memberId)
				.orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));

		PostLikeKey likeKey = PostLikeKey.builder()
			.post(postId)
			.member(memberId)
			.build();
		Optional<PostLike> postLike = postLikeRepository.findById(likeKey);
		boolean isLike = false;
		if(postLike.isPresent()){
			isLike = true;
		}

		boolean isMyPost = false;
		if(memberId == post.getMember().getId()){
			isMyPost = true;
		}

		PostDetailDTO.Post postDetail = PostDetailDTO.Post.builder()
			.albumImg(post.getPostAlbumImage())
			.content(post.getPostContent())
			.artist(post.getPostArtist())
			.title(post.getPostTitle())
			.nickname(member.getNickname())
			.likeCount(post.getLikeCount())
			.commentCount(post.getCommentCount())
			.isLike(isLike)
			.profileImg(member.getProfileImageUrl())
			.createdDate(post.getCreatedDate())
			.modifiedDate(post.getModifiedDate())
				.postId(postId)
				.build();

		return PostDetailDTO.Response.builder()
			.post(postDetail)
			.build();
	}

	@Override
	@Transactional
	public PostSaveDTO.Response savePost(PostSaveDTO.Request dto) {
		UUID memberId = dto.getMemberId();
		String title = dto.getTitle();
		String content = dto.getContent();
		String artist = dto.getArtist();
		String albumImg = dto.getAlbumImg();
		String musicUri = dto.getMusicUri();

		// 입력값 확인
		if(memberId == null || StringUtils.isBlank(title) || StringUtils.isBlank(artist) || StringUtils.isBlank(albumImg)){
			throw new ValidationException(ErrorCode.MISSING_INPUT_VALUE);
		}

		// member 확인
		Member member = memberRepository.findById(memberId)
				.orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));

		// 등록 날짜
		LocalDateTime createdDate = LocalDateTime.now();

		// post 등록
		Post post = Post.builder()
				.member(member)
				.postTitle(title)
				.postContent(content)
				.postArtist(artist)
				.postAlbumImage(albumImg)
				.postMusicUri(musicUri)
				.createdDate(createdDate)
				.modifiedDate(createdDate)
				.build();
		postRepository.save(post);

		return PostSaveDTO.Response.builder()
				.success(true)
				.build();
	}

	@Override
	@Transactional
	public PostUpdateDTO.Response updatePost(PostUpdateDTO.Request dto) {
		Long postId = dto.getPostId();
		UUID memberId = dto.getMemberId();
		String content = dto.getContent();

		if(memberId == null || postId == null || StringUtils.isBlank(content)){
			throw new ValidationException(ErrorCode.MISSING_INPUT_VALUE);
		}

		Member member = memberRepository.findById(memberId)
				.orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));

		Post post = postRepository.findById(postId)
				.orElseThrow(() -> new NotFoundException(ErrorCode.POST_NOT_FOUND));

		if(!post.getMember().getId().equals(memberId)){
			throw new AccessDeniedException(ErrorCode.HANDLE_ACCESS_DENIED);
		}

		post.updateContent(content);
		post.updatedDate(LocalDateTime.now());

		return PostUpdateDTO.Response.builder()
				.success(true)
				.build();
	}

	@Override
	@Transactional
	public PostDeleteDTO.Response deletePost(PostDeleteDTO.Request dto) {
		Long postId = dto.getPostId();
		UUID memberId = dto.getMemberId();

		if(postId == null || memberId == null){
			throw new ValidationException(ErrorCode.MISSING_INPUT_VALUE);
		}

		Member member = memberRepository.findById(memberId)
				.orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));

		Post post = postRepository.findById(postId)
				.orElseThrow(() -> new NotFoundException(ErrorCode.POST_NOT_FOUND));

		if(!memberId.equals(post.getMember().getId())){
			throw new AccessDeniedException(ErrorCode.HANDLE_ACCESS_DENIED);
		}

		postRepository.delete(post);

//		post.deletePost(true);

		return PostDeleteDTO.Response.builder()
				.success(true)
				.build();
	}

	@Override
	@Transactional
	public PostLikeDTO.Response likePost(PostLikeDTO.Request dto) {
		Long postId = dto.getPostId();
		UUID memberId = dto.getMemberId();

		if(postId == null || memberId == null){
			throw new ValidationException(ErrorCode.MISSING_INPUT_VALUE);
		}

		Member member = memberRepository.findById(memberId)
				.orElseThrow(() -> new NotFoundException(ErrorCode.MEMBER_NOT_FOUND));

		Post post = postRepository.findById(postId)
				.orElseThrow(() -> new NotFoundException(ErrorCode.POST_NOT_FOUND));

		PostLikeKey key = PostLikeKey.builder()
				.post(postId)
				.member(memberId)
				.build();

		Optional<PostLike> postLike = postLikeRepository.findById(key);
		boolean like = false;
		if(postLike.isPresent()){
			postLikeRepository.delete(postLike.get());
			like = false;
		} else {
			postLikeRepository.save(PostLike.builder()
					.post(post)
					.member(member)
					.build());
			like = true;
		}

		return PostLikeDTO.Response.builder()
				.like(like)
				.build();
	}
}
