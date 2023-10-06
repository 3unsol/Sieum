package sieum.community.communityservice.exception;

public class NotFoundException extends CustomException {
	public NotFoundException(ErrorCode errorCode){
		super(errorCode);
	}
}
