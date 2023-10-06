package sieum.community.communityservice.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import sieum.community.communityservice.dto.PreSignedUrlDTO;
import sieum.community.communityservice.util.S3Util;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/s3")
public class AmazonController {
	private final S3Util s3Util;

	@PostMapping("/presigned")
	public ResponseEntity<?> getPreSignedUrl(@Valid @RequestBody PreSignedUrlDTO.Request presignedRequestDto, BindingResult bindingResult) {
		if(bindingResult.hasErrors()){
			return new ResponseEntity<String>(bindingResult.getAllErrors().get(0).getDefaultMessage(),HttpStatus.BAD_REQUEST);
		}
		String prefix = presignedRequestDto.getFileType().getName();
		String fileName = presignedRequestDto.getFileName();

		PreSignedUrlDTO.Response preSignedResponseDto = s3Util.getPreSignedUrl(prefix, fileName);
		return new ResponseEntity<PreSignedUrlDTO.Response>(preSignedResponseDto, HttpStatus.OK);
	}
}
