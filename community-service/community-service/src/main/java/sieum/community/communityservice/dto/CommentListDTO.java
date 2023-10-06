package sieum.community.communityservice.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
import lombok.ToString;

public class CommentListDTO {
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@Getter
	@Setter
	@ToString
	public static class Request{
		private UUID memberId;
		private Long postId;
		@Builder.Default
		private int page = 0;
		@Builder.Default
		private int size = 5;
	}
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@Getter
	@Setter
	public static class Response{
		private boolean prev;
		private boolean next;
		private int page;
		@Builder.Default
		private List<Comment> comments = new ArrayList<>();
	}

	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public static class Comment{
		@JsonAlias(value = "comment_id")
		private Long commentId;
		@JsonAlias(value = "member_id")
		private UUID memberId;
		@JsonAlias(value = "profile_img")
		private String profileImg;
		private String nickname;
		@JsonAlias(value = "comment_created_date")
		@JsonFormat(pattern = "yyyy.MM.dd HH:mm:ss", timezone = "Asia/Seoul")
		private LocalDateTime createdDate;
		@JsonAlias(value = "comment_modified_date")
		@JsonFormat(pattern = "yyyy.MM.dd HH:mm:ss", timezone = "Asia/Seoul")
		private LocalDateTime modifiedDate;
		private String content;
	}
}
