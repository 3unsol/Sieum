package sieum.community.communityservice.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

public class PostListDTO {
	@Getter
	@Setter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@ToString
	public static class Request{
		@JsonIgnore
		private UUID memberId;
		@Builder.Default
		private int page = 0;
		@Builder.Default
		private int size = 10;
		private String filter;
	}

	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	@ToString
	public static class Response{
		private boolean prev;
		private boolean next;
		private int page;
		@Builder.Default
		private List<Post> posts = new ArrayList<>();
	}

	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	@ToString
	public static class Post{
		@JsonProperty(value = "post_id")
		private Long postId;
		private String title;
		private String artist;
		@JsonProperty(value = "album_img")
		private String albumImg;
		private String content;
		private String nickname;
		@JsonProperty(value = "profile_img")
		private String profileImg;
		@JsonProperty(value = "is_like")
		private boolean isLike;
		@JsonProperty(value = "like_count")
		private Integer likeCount;
		@JsonProperty(value = "comment_count")
		private Integer commentCount;
	}
}

