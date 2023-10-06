package sieum.community.communityservice.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "post_like")
@IdClass(value = PostLikeKey.class)
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostLike {

	@Id
	@JoinColumn(name = "post_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private Post post;

	@Id
	@JoinColumn(name = "member_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private Member member;
}
