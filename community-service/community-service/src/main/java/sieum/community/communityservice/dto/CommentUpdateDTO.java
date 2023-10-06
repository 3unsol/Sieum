package sieum.community.communityservice.dto;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class CommentUpdateDTO {
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@Getter
	@Setter
	public static class Request{
		@JsonIgnore
		private UUID memberId;
		@JsonIgnore
		private Long postId;
		@JsonIgnore
		private Long commentId;
		private String content;
	}
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@Getter
	@Setter
	public static class Response{
		private boolean success;
	}
}
