package sieum.community.communityservice.exception;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;

@Getter
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode {
	POST_NOT_FOUND(HttpStatus.NOT_FOUND,"P001","존재하지 않는 게시글입니다."),
	MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "M001", "존재하지 않는 회원입니다."),
	COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "P002", "존재하지 않는 댓글입니다."),
	MISSING_INPUT_VALUE(HttpStatus.BAD_REQUEST, "C001", "입력값이 부족합니다"),
	HANDLE_ACCESS_DENIED(HttpStatus.FORBIDDEN, "C002", "접근권한이 없습니다."),
	INVALID_INPUT_VALUE(HttpStatus.BAD_REQUEST, "C003", "잘못된 입력 값입니다.")
	;


	private final HttpStatus status;
	private final String code;
	private final String message;
	ErrorCode(HttpStatus status, String code, String message) {
		this.status = status;
		this.code = code;
		this.message = message;
	}
}
