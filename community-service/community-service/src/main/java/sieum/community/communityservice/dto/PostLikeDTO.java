package sieum.community.communityservice.dto;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class PostLikeDTO {
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	public static class Request{
		@JsonIgnore
		@JsonProperty(value = "member_id")
		private UUID memberId;
		@JsonIgnore
		@JsonProperty(value = "post_id")
		private Long postId;
		@JsonProperty(value = "is_like")
		private boolean isLike;
	}

	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	public static class Response{
		private boolean like;
	}
}
