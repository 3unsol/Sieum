package sieum.member.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class BaseException extends RuntimeException{
	private final HttpStatus HttpStatus;
	public BaseException(HttpStatus httpStatus, String message) {
		super(message);
		this.HttpStatus = httpStatus;
	}

}
