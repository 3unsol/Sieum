package sieum.member.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class FollowRequestDto {

	@Size(min=36, max=36, message = "값의 길이가 너무 일치하지 않습니다.")
	@NotBlank(message="팔로우 값이 존재하지 않습니다.")
	private String followerId;
}
