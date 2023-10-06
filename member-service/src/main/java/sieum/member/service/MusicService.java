package sieum.member.service;

import sieum.member.dto.request.MusicAddRequestDto;

import java.util.UUID;

public interface MusicService {
    public void addLikedMusic(UUID uuid, MusicAddRequestDto musicAddRequestDto);
}
