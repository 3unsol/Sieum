package sieum.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MusicAddRequestDto {
    private String musicUri;
    private String albumImageUrl;
    private String albumArtist;
    private String albumTitle;
}
