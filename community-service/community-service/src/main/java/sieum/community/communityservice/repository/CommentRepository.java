package sieum.community.communityservice.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import sieum.community.communityservice.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	@Query("SELECT c, p FROM Comment c " +
		"LEFT JOIN c.post p " +
		"WHERE c.isDeleted = false " +
		"ORDER BY c.createdDate ASC ")
	Page<Object[]> findCommentsOrderByDate(Pageable pageable);

}
