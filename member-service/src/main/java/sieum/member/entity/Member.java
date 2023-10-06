package sieum.member.entity;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.springframework.data.annotation.LastModifiedDate;
import sieum.member.dto.request.MemberProfileUpdateRequestDto;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Getter
@Entity
@Table(name = "members")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@TypeDef(name = "json", typeClass = JsonType.class)
public class Member {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "member_id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name = "member_spotify_user_id", nullable = false)
    private String spotifyUserId;

    @Column(name = "member_nickname", nullable = false)
    private String nickname;

    @Column(name = "member_profile_image_url")
    private String profileImageUrl;

    @Column(name = "member_profile_music_url")
    private String profileMusicUri;

    @Column(name = "member_album_image_url")
    private String albumImageUrl;

    @Column(name = "member_album_artist")
    private String albumArtist;

    @Column(name = "member_album_title")
    private String albumTitle;

    @Column(name = "member_region_code")
    private Long regionCode;

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

    @OneToMany(mappedBy = "member")
    private List<Music> myLikedMusicList = new ArrayList<>();

    public void updateMember(MemberProfileUpdateRequestDto memberProfileUpdateRequestDto){
        if(memberProfileUpdateRequestDto.getNickname() != null)
            this.nickname = memberProfileUpdateRequestDto.getNickname();

        if(memberProfileUpdateRequestDto.getProfileImageUrl() != null)
            this.profileImageUrl = memberProfileUpdateRequestDto.getProfileImageUrl();

        if(memberProfileUpdateRequestDto.getProfileMusicUri() != null)
            this.profileMusicUri = memberProfileUpdateRequestDto.getProfileMusicUri();

        if(memberProfileUpdateRequestDto.getAlbumTitle() != null)
            this.albumTitle = memberProfileUpdateRequestDto.getAlbumTitle();

        if(memberProfileUpdateRequestDto.getAlbumArtist() != null)
            this.albumArtist = memberProfileUpdateRequestDto.getAlbumArtist();

        if(memberProfileUpdateRequestDto.getAlbumImageUrl() != null)
            this.albumImageUrl = memberProfileUpdateRequestDto.getAlbumImageUrl();

        if(memberProfileUpdateRequestDto.getHashtags() != null)
            this.hashtags = memberProfileUpdateRequestDto.getHashtags();
    }

    public void deleted() {
        this.isDeleted = true;
    }

}
