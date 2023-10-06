package sieum.community.communityservice.util;

import java.net.URL;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.Headers;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;

import lombok.RequiredArgsConstructor;
import sieum.community.communityservice.dto.PreSignedUrlDTO;

@Component
@RequiredArgsConstructor
public class S3Util {

	private final AmazonS3 amazonS3;
	@Value("${cloud.aws.s3.bucket}")
	private String BUCKET_NAME;

	public PreSignedUrlDTO.Response getPreSignedUrl(String prefix, String fileName){
		String oneFileName = onlyOneFileName(fileName);
		fileName = "upload/"+ prefix + "/" + oneFileName;
		GeneratePresignedUrlRequest generatePresignedUrlRequest = getGeneratePreSignedUrlRequest(BUCKET_NAME, fileName);
		URL url = amazonS3.generatePresignedUrl(generatePresignedUrlRequest);
		return new PreSignedUrlDTO.Response(url.toString(), oneFileName);
	}

	private GeneratePresignedUrlRequest getGeneratePreSignedUrlRequest(String bucket, String fileName) {
		GeneratePresignedUrlRequest generatePresignedUrlRequest =
			new GeneratePresignedUrlRequest(bucket, fileName)
				.withMethod(HttpMethod.PUT)
				.withExpiration(getPreSignedUrlExpiration());
		generatePresignedUrlRequest.addRequestParameter(
			Headers.S3_CANNED_ACL,
			CannedAccessControlList.Private.toString());
		generatePresignedUrlRequest.addRequestParameter(
			Headers.CONTENT_TYPE, "image/png");
		return generatePresignedUrlRequest;
	}
	private Date getPreSignedUrlExpiration() {
		Date expiration = new Date();
		long expTimeMillis = expiration.getTime();
		expTimeMillis += 1000 * 60;
		expiration.setTime(expTimeMillis);
		return expiration;
	}
	private String onlyOneFileName(String fileName){
		return UUID.randomUUID().toString() + "." + fileName.substring(fileName.lastIndexOf(".")+1);
	}
}
