package sieum.member.repository;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.function.Function;

import javax.persistence.EntityManager;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;

import sieum.member.entity.Member;
import sieum.member.entity.QFollower;
import sieum.member.entity.QMember;

@Repository
public class FollowerRepositoryImpl implements FollowerRepositoryCustom{
	private final JPAQueryFactory queryFactory;

	public FollowerRepositoryImpl(EntityManager entityManager) {
		this.queryFactory = new JPAQueryFactory(entityManager);
	}

	@Override
	public Slice<Member> findFolloweeList(UUID followerId, Pageable pageable) {
		QMember member= QMember.member;
		QFollower follower=QFollower.follower1;
		List<Member> memberList= queryFactory.select(member)
			.from(member).join(follower).on(member.id.eq(follower.followee))
			.where(follower.follower.eq(followerId))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize()+1)
			.fetch();

		List<Member> followerList=new ArrayList<>();


		for(Member m:memberList) {
			followerList.add(m);
		}
		boolean hasNext=false;
		if (followerList.size() > pageable.getPageSize()) {
			followerList.remove(pageable.getPageSize());
			hasNext = true;
		}
		return new SliceImpl<>(followerList, pageable, hasNext);

	}

	@Override
	public Slice<Member> findFollowerList(UUID followeeId, Pageable pageable) {
		QMember member= QMember.member;
		QFollower follower=QFollower.follower1;
		List<Member> memberList= queryFactory.select(member)
			.from(member).join(follower).on(member.id.eq(follower.follower))
			.where(follower.followee.eq(followeeId))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize()+1)
			.fetch();

		List<Member> followerList=new ArrayList<>();
		for(Member m:memberList) {
			followerList.add(m);
		}
		boolean hasNext=false;
		if (followerList.size() > pageable.getPageSize()) {
			followerList.remove(pageable.getPageSize());
			hasNext = true;
		}

		return new SliceImpl<>(followerList, pageable, hasNext);
	}
}
