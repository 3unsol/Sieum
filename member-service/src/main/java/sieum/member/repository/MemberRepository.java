package sieum.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sieum.member.entity.Member;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MemberRepository extends JpaRepository<Member, UUID> {
    Optional<Member> findByIdAndIsDeletedFalse(UUID uuid);

    Optional<Member> findBySpotifyUserIdAndIsDeletedFalse(String spotifyId);

}
