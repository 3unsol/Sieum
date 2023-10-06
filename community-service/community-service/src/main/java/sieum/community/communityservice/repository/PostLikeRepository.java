package sieum.community.communityservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import sieum.community.communityservice.entity.PostLike;
import sieum.community.communityservice.entity.PostLikeKey;

public interface PostLikeRepository extends JpaRepository<PostLike, PostLikeKey> {
}
