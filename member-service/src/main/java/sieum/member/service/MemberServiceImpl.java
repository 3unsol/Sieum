package sieum.member.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import sieum.member.dto.request.MemberProfileUpdateRequestDto;
import sieum.member.entity.Member;
import sieum.member.repository.MemberRepository;
import sieum.member.dto.response.MemberProfileResponseDto;

import javax.transaction.Transactional;
import java.util.UUID;

@Service
@Transactional
@AllArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;

    @Override
    public MemberProfileResponseDto getMyProfile(UUID userId) {
        Member member = findMemberById(userId);
        return new MemberProfileResponseDto().toMemberProfileResponseDto(member);
    }

    @Override
    public MemberProfileResponseDto getOtherProfile(String spotifyId) {
        Member member = findMemberBySpotifyId(spotifyId);
        return new MemberProfileResponseDto().toMemberProfileResponseDto(member);
    }

    @Override
    @Transactional
    public MemberProfileResponseDto updateMemberProfile(UUID userId, MemberProfileUpdateRequestDto memberProfileUpdateRequestDto) {
        Member member = findMemberById(userId);
        member.updateMember(memberProfileUpdateRequestDto);
        return new MemberProfileResponseDto().toMemberProfileResponseDto(member);
    }

    @Override
    @Transactional
    public void deleteUser(UUID userId) {
        Member member = findMemberById(userId);
        member.deleted();
    }

    public Member findMemberById(UUID userId){
        return memberRepository.findByIdAndIsDeletedFalse(userId)
                .orElseThrow(() -> new RuntimeException("해당하는 유저를 찾을 수 없습니다."));
    }

    public Member findMemberBySpotifyId(String spotifyId){
        return memberRepository.findBySpotifyUserIdAndIsDeletedFalse(spotifyId)
                .orElseThrow(() -> new RuntimeException("해당하는 유저를 찾을 수 없습니다."));
    }
}
