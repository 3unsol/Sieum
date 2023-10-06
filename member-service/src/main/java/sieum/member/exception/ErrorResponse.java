package sieum.member.exception;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ErrorResponse {
	private final String errorMessage;
	private final int errorCode;

	@Builder
	public ErrorResponse(String errorMessage, int errorCode) {
		this.errorMessage = errorMessage;
		this.errorCode = errorCode;
	}
}
