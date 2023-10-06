package sieum.community.communityservice.service;

import sieum.community.communityservice.dto.PostDeleteDTO;
import sieum.community.communityservice.dto.PostDetailDTO;
import sieum.community.communityservice.dto.PostLikeDTO;
import sieum.community.communityservice.dto.PostListDTO;
import sieum.community.communityservice.dto.PostSaveDTO;
import sieum.community.communityservice.dto.PostUpdateDTO;

public interface PostService {
	//전체 게시글 조회
	PostListDTO.Response getAllPosts(PostListDTO.Request dto);
	// 게시글 상세 조회
	PostDetailDTO.Response getPost(PostDetailDTO.Request dto);
	// 게시글 등록
	PostSaveDTO.Response savePost(PostSaveDTO.Request dto);
	// 게시글 수정
	PostUpdateDTO.Response updatePost(PostUpdateDTO.Request dto);
	// 게시글 삭제
	PostDeleteDTO.Response deletePost(PostDeleteDTO.Request dto);
	// 게시글 좋아요
	PostLikeDTO.Response likePost(PostLikeDTO.Request dto);
}
