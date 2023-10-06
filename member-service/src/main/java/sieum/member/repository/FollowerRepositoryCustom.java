package sieum.member.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import sieum.member.entity.Member;

public interface FollowerRepositoryCustom {
	public Slice<Member> findFolloweeList(UUID followerId, Pageable pageable);

	public Slice<Member> findFollowerList(UUID followeeId, Pageable pageable);

}
