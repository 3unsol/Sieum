package sieum.community.communityservice.service;

import sieum.community.communityservice.dto.CommentDeleteDTO;
import sieum.community.communityservice.dto.CommentListDTO;
import sieum.community.communityservice.dto.CommentSaveDTO;
import sieum.community.communityservice.dto.CommentUpdateDTO;

public interface CommentService {
	CommentListDTO.Response getList(CommentListDTO.Request dto);
	CommentSaveDTO.Response save(CommentSaveDTO.Request dto);
	CommentUpdateDTO.Response update(CommentUpdateDTO.Request dto);
	CommentDeleteDTO.Response delete(CommentDeleteDTO.Request dto);
}
