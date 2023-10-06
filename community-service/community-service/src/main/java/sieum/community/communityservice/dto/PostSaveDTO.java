package sieum.community.communityservice.dto;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class PostSaveDTO {

	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	public static class Request{
		@JsonIgnore
		@JsonAlias(value = "member_id")
		private UUID memberId;
		@JsonAlias(value = "post_content")
		private String content;
		@JsonAlias(value = "post_album_img")
		private String albumImg;
		@JsonAlias(value = "post_title")
		private String title;
		@JsonAlias(value = "post_artist")
		private String artist;
		@JsonAlias(value = "post_music_uri")
		private String musicUri;
	}

	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	public static class Response{
		private boolean success;
	}


}
