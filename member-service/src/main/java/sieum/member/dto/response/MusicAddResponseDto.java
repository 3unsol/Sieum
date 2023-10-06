package sieum.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sieum.member.entity.Member;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MusicAddResponseDto {
    private Long id;
    private String musicUri;
    private String albumImageUrl;
    private String albumArtist;
    private String albumTitle;
    private LocalDateTime createdTime;
}
