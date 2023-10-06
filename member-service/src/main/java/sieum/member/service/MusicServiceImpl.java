package sieum.member.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import sieum.member.dto.request.MusicAddRequestDto;
import sieum.member.entity.Member;
import sieum.member.entity.Music;
import sieum.member.repository.MemberRepository;
import sieum.member.repository.MusicRepository;

import javax.transaction.Transactional;
import java.util.UUID;

@Service
@Transactional
@AllArgsConstructor
public class MusicServiceImpl implements MusicService{

    private final MemberRepository memberRepository;
    private final MusicRepository musicRepository;

    @Override
    public void addLikedMusic(UUID userId, MusicAddRequestDto musicAddRequestDto) {
        Member member = findMemberById(userId);
        Music music = Music.builder()
                .member(member)
                .musicUri(musicAddRequestDto.getMusicUri())
                .albumArtist(musicAddRequestDto.getAlbumArtist())
                .albumTitle(musicAddRequestDto.getAlbumTitle())
                .albumImageUrl(musicAddRequestDto.getAlbumImageUrl())
                .build();
        musicRepository.save(music);
    }

    public Member findMemberById(UUID userId){
        return memberRepository.findByIdAndIsDeletedFalse(userId)
                .orElseThrow(() -> new RuntimeException("해당하는 유저를 찾을 수 없습니다."));
    }
}
