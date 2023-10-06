package sieum.member.dto.response;

import java.util.List;
import java.util.UUID;

import javax.persistence.Column;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sieum.member.entity.Follower;
import sieum.member.entity.Member;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class FollowListResponseDto {
	private List<FollowResponseDto> followResponseDtoList;
	private boolean isLast;


}
