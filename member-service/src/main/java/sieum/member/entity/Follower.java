package sieum.member.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "follower",  uniqueConstraints = {
	@UniqueConstraint(columnNames = {"follower_followee_id", "follower_follow_id"})
})
public class Follower {

	@Id
	@GeneratedValue(generator = "uuid2")
	@GenericGenerator(name = "uuid2", strategy = "uuid2")
	@Column( name="follower_id",columnDefinition = "BINARY(16)")
	private UUID id;

	@Column(name="follower_followee_id",columnDefinition = "BINARY(16)", nullable=false)
	private UUID followee;

	@Column(name="follower_follow_id",columnDefinition = "BINARY(16)", nullable=false)
	private UUID follower;

	@CreatedDate
	@Column(name="follow_created_date", nullable = false)
	private LocalDateTime createdDate;

	@Builder
	private Follower(UUID followee, UUID follower) {
		this.followee = followee;
		this.follower = follower;
	}

}
