package sieum.community.communityservice.exception;

public class AccessDeniedException extends CustomException{
    public AccessDeniedException(ErrorCode errorCode){
        super(errorCode);
    }
}
