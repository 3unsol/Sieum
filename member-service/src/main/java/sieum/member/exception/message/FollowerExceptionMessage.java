package sieum.member.exception.message;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public enum FollowerExceptionMessage {
	ALREADY_FOLLOW("이미 팔로우하셨습니다.", HttpStatus.BAD_REQUEST),
	NOT_FOUND_FOLLOW("팔로우 정보가 존재하지 않습니다", HttpStatus.NOT_FOUND),
	NOT_FOUND_MEMBER("존재하지 않는 유저입니다.", HttpStatus.NOT_FOUND);

	private final String errorMessage;
	private final HttpStatus errorCode;


	private FollowerExceptionMessage(String errorMessage, HttpStatus errorCode) {
		this.errorMessage = errorMessage;
		this.errorCode = errorCode;
	}
}
