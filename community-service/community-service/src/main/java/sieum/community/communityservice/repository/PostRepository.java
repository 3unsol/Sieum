package sieum.community.communityservice.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import sieum.community.communityservice.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
	@Query("SELECT p,count(distinct pl) as lcnt FROM Post p " +
		"LEFT JOIN PostLike pl on pl.post = p " +
		"WHERE p.isDeleted = false " +
		"GROUP BY p ORDER BY p.createdDate ASC ")
	Page<Object[]> findPosts(Pageable pageable);
}
