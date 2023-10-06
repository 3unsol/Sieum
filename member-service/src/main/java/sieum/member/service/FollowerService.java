package sieum.member.service;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Pageable;

import sieum.member.dto.response.FollowListResponseDto;
import sieum.member.entity.Member;

public interface FollowerService {
	public void follow(UUID followerId, UUID followeeId);

	public void unfollow(UUID followerId, UUID followeeId);

	public FollowListResponseDto getFolloweeList(UUID followerId, Pageable pageable);

	public FollowListResponseDto getFollowerList(UUID followeeId, Pageable pageable);
	public boolean isFollower(UUID followerId,UUID followeeId);
}
