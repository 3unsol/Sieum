package sieum.member.exception.customexception;

import org.springframework.http.HttpStatus;

import sieum.member.exception.BaseException;
import sieum.member.exception.message.FollowerExceptionMessage;

public class FollowerException extends BaseException {
	public FollowerException(FollowerExceptionMessage followerExceptionMessage) {
		super(followerExceptionMessage.getErrorCode(), followerExceptionMessage.getErrorMessage());
	}
}
