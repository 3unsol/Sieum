package sieum.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sieum.member.entity.Member;
import sieum.member.entity.Music;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberProfileResponseDto {
    private String spotifyId;
    private String profileMusicUri;
    private String nickname;
    private String profileImageUrl;
    private String albumImageUrl;
    private String albumArtist;
    private String albumTitle;
    private Map<String, String> hashtags;
    private List<MusicAddResponseDto> myLikedMusicList;

    public MemberProfileResponseDto toMemberProfileResponseDto(Member member){
        List<MusicAddResponseDto> list = new ArrayList<>();
        for(Music music : member.getMyLikedMusicList()){
            MusicAddResponseDto musicAddResponseDto = MusicAddResponseDto.builder()
                    .id(music.getId())
                    .musicUri(music.getMusicUri())
                    .albumArtist(music.getAlbumArtist())
                    .albumImageUrl(music.getAlbumImageUrl())
                    .albumTitle(music.getAlbumTitle())
                    .createdTime(music.getCreatedTime())
                    .build();
            list.add(musicAddResponseDto);
        }
        return MemberProfileResponseDto.builder()
                .spotifyId(member.getSpotifyUserId())
                .profileMusicUri(member.getProfileMusicUri())
                .nickname(member.getNickname())
                .profileImageUrl(member.getProfileImageUrl())
                .albumImageUrl(member.getAlbumImageUrl())
                .albumArtist(member.getAlbumArtist())
                .albumTitle(member.getAlbumTitle())
                .hashtags(member.getHashtags())
                .myLikedMusicList(list)
                .build();
    }
}
