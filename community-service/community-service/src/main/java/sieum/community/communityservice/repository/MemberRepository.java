package sieum.community.communityservice.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import sieum.community.communityservice.entity.Member;

public interface MemberRepository extends JpaRepository<Member, UUID> {
}
