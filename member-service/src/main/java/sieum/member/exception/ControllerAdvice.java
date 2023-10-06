package sieum.member.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;
import sieum.member.exception.customexception.FollowerException;

@RestControllerAdvice
@Slf4j
public class ControllerAdvice {

	@ExceptionHandler
	public ResponseEntity<ErrorResponse> handleException(Exception e) {
		log.debug("error message : {}",e.getMessage());
		ErrorResponse errorResponse= ErrorResponse.builder().
			errorCode(HttpStatus.INTERNAL_SERVER_ERROR.value()).
			errorMessage("서버와 연결이 원활하지 않습니다.").build();
		return new ResponseEntity<>(errorResponse,HttpStatus.INTERNAL_SERVER_ERROR);
	}

	/**
	 * @Valid로 인한 유효성 검증 예외 처리
	 * @param methodArgumentNotValidException
	 * @return 커스텀 메시지 + 400 error code
	 */
	@ExceptionHandler
	public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(
		MethodArgumentNotValidException methodArgumentNotValidException) {
		ErrorResponse response = ErrorResponse.builder().
			errorCode(HttpStatus.BAD_REQUEST.value()).
			errorMessage(methodArgumentNotValidException.getBindingResult().getAllErrors().get(0).getDefaultMessage()).build();
		return new ResponseEntity<ErrorResponse>(response, HttpStatus.BAD_REQUEST);
	}


	@ExceptionHandler
	public ResponseEntity<ErrorResponse> handleFollowerException(FollowerException followerException) {
		log.debug("follwer error message : {}",followerException.getMessage());
		ErrorResponse errorResponse= ErrorResponse.builder().
			errorCode(followerException.getHttpStatus().value()).
			errorMessage(followerException.getMessage()).build();
		return new ResponseEntity<>(errorResponse,followerException.getHttpStatus());

	}
}
