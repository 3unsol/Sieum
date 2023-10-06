package sieum.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sieum.member.entity.Music;

@Repository
public interface MusicRepository extends JpaRepository<Music, Long> {

}
