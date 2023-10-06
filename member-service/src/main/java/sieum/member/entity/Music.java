package sieum.member.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "music_like")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Music {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "liked_music_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(nullable = false)
    private String musicUri;

    private String albumImageUrl;

    @Column(nullable = false)
    private String albumArtist;

    @Column(nullable = false)
    private String albumTitle;

    @Column(name = "music_created_date", nullable = false)
    @CreatedDate
    private LocalDateTime createdTime;

    @Column(name = "music_is_deleted", columnDefinition = "boolean default false")
    private boolean isDeleted = false;

    public void deleted() {
        this.isDeleted = true;
    }
}
