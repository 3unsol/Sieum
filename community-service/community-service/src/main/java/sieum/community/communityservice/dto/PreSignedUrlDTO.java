package sieum.community.communityservice.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonCreator;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class PreSignedUrlDTO {
	@NoArgsConstructor
	@Getter
	public static class Request{

		@NotNull(message="파일 타입을 입력해주세요")
		private FileType fileType;
		@NotBlank(message = "파일 이름을 입력해주세요")
		private String fileName;

	}

	@NoArgsConstructor
	@Getter
	public static class Response{
		private String preSignUrl;
		private String fileName;

		@Builder
		public Response(String preSignUrl, String fileName) {
			this.preSignUrl = preSignUrl;
			this.fileName = fileName;
		}
	}



	@Getter
	public enum FileType{
		PROFILE("profile");

		private String name;
		private FileType(String name){
			this.name = name;
		}

		@JsonCreator
		public static FileType from(String value) {
			for (FileType type : FileType.values()) {
				if (type.getName().equals(value)) {
					return type;
				}
			}
			return null;
		}
	}
}
