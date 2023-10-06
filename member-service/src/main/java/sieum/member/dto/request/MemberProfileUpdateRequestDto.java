package sieum.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberProfileUpdateRequestDto {
    private String nickname;
    private String profileImageUrl;
    private String profileMusicUri;
    private String albumImageUrl;
    private String albumArtist;
    private String albumTitle;
    private Map<String, String> hashtags;
}
