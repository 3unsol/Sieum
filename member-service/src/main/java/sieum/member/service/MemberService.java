package sieum.member.service;

import sieum.member.dto.response.MemberProfileResponseDto;
import sieum.member.dto.request.MemberProfileUpdateRequestDto;

import java.util.UUID;

public interface MemberService {
    public MemberProfileResponseDto getMyProfile(UUID uuid);
    public MemberProfileResponseDto getOtherProfile(String spotifyId);

    public MemberProfileResponseDto updateMemberProfile(UUID uuid, MemberProfileUpdateRequestDto memberProfileUpdateRequestDto);

    public void deleteUser(UUID uuid);

}
