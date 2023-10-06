package sieum.community.communityservice.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class PostDetailDTO {

	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	public static class Request{

		@JsonIgnore
		@JsonAlias(value = "member_id")
		private UUID memberId;

		@JsonIgnore
		@JsonAlias(value = "post_id")
		private Long postId;
	}

	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	public static class Response{
		private Post post;
	}

	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	public static class Post{
		@JsonAlias(value = "post_id")
		private Long postId;
		private String title;
		private String artist;
		@JsonAlias(value = "album_img")
		private String albumImg;
		private String content;
		private String nickname;
		@JsonAlias(value = "profile_img")
		private String profileImg;
		@JsonAlias(value = "is_like")
		private boolean isLike;
		@JsonAlias(value = "like_count")
		private Integer likeCount;
		@JsonAlias(value = "comment_count")
		private Integer commentCount;
		@JsonAlias(value = "post_created_date")
		@JsonFormat(pattern = "yyyy.MM.dd HH:mm:ss", timezone = "Asia/Seoul")
		private LocalDateTime createdDate;
		@JsonAlias(value = "post_modified_date")
		@JsonFormat(pattern = "yyyy.MM.dd HH:mm:ss", timezone = "Asia/Seoul")
		private LocalDateTime modifiedDate;
	}
}
