package sieum.member.message;

import lombok.Getter;

@Getter
public enum FollowMessage {
	SUCCESS_FOLLOW("팔로우가 성공적으로 이루어졌습니다."),
	SUCCESS_UNFOLLOW("언팔로우가 성공적으로 이루어졌습니다.");
	private final String message;

	private FollowMessage(String message) {
		this.message = message;
	}
}
