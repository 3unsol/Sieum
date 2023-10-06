package sieum.community.communityservice.entity;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Getter
@Entity
@Table(name = "member")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@TypeDef(name = "json", typeClass = JsonType.class)
public class Member {
	@Id
	@Column(name = "member_id", columnDefinition = "BINARY(16)")
	@Builder.Default
	private UUID id = UUID.randomUUID();

	@Column(name = "member_spotify_user_id", nullable = false)
	private String spotifyUserId;

	@Column(name = "member_nickname", nullable = false)
	private String nickname;

	@Column(name = "member_profile_image_url")
	private String profileImageUrl;

	@Column(name = "member_profile_music_uri")
	private String profileMusicUri;

	@Column(name = "member_album_image_url")
	private String albumImageUrl;

	@Column(name = "member_album_artist")
	private String albumArtist;

	@Column(name = "member_album_title")
	private String albumTitle;

	@Column(name = "member_region_code")
	private Long regionCode;

	@Column(name = "member_refresh_token")
	private Long refreshToken;

	@Type(type = "json")
	@Column(name = "member_hashtags", columnDefinition = "json")
	private Map<String, String> hashtags;

	@Column(name = "member_created_date")
	private LocalDateTime createdDate;

	@Column(name = "member_modified_date")
	@LastModifiedDate
	private LocalDateTime modifiedDate;

	@Column(name = "member_is_deleted", columnDefinition = "boolean default false")
	private Boolean isDeleted = false;

}
