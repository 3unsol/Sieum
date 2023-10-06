package sieum.community.communityservice.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import io.hypersistence.utils.hibernate.util.StringUtils;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sieum.community.communityservice.exception.ErrorCode;
import sieum.community.communityservice.exception.ValidationException;

@Entity
@Table(name = "comment")
@SQLDelete(sql = "UPDATE comment SET comment_is_deleted = TRUE WHERE comment_id = ?")
@EntityListeners(value = AuditingEntityListener.class)
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "comment_id")
	private Long commentId;

	@Column(name = "comment_content", length = 50, unique = false, nullable = false)
	private String commentContent;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "post_id", nullable = false)
	private Post post;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	@CreatedDate
	@Column(name = "comment_created_date")
	private LocalDateTime createdDate;

	@LastModifiedDate
	@Column(name = "comment_modified_date")
	private LocalDateTime modifiedDate;

	@Column(name = "comment_is_deleted")
	private boolean isDeleted;

	public void updateContent(String content){
		if(StringUtils.isBlank(content)) throw new ValidationException(ErrorCode.INVALID_INPUT_VALUE);
		this.commentContent = content;
	}
	public void updatedDate(LocalDateTime updatedDate){
		this.modifiedDate = updatedDate;
	}

	public void deleteComment(boolean flag){
		this.isDeleted = flag;
	}
}
