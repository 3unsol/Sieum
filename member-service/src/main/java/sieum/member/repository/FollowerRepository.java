package sieum.member.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import sieum.member.entity.Follower;
import sieum.member.entity.Member;

public interface FollowerRepository extends JpaRepository<Follower, UUID>, FollowerRepositoryCustom {
	public Optional<Follower> findByFollowerAndFollowee(UUID follower,UUID followee);
}
