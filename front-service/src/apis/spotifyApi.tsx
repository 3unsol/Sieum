import {SpotifyApiInstance} from './SpotifyApiInstance';

const api = SpotifyApiInstance();

// 기준곡으로 스포티파이 추천 조회
export async function getRecommend(seedTracks: string) {
  try {
    const response = await api.get(`recommendations?seed_tracks=${seedTracks}`);
    return response.data;
  } catch (error) {
    // console.error('추천 리스트를 가져오지 못했습니다 :', error);
    throw error;
  }
}

// 플레이리스트 상세 조회
export async function getPlaylistDetail(playlistId: string) {
  try {
    const response = await api.get(`/playlists/${playlistId}/tracks`);
    return response.data;
  } catch (error) {
    // console.error('플레이리스트 상세를 가져오지 못했습니다 :', error);
    throw error;
  }
}

// 유저가 만든 플레이리스트 가져오기
export async function getMyPlaylists(userId: string) {
  try {
    const response = await api.get(`/users/${userId}/playlists`);
    return response.data;
  } catch (error) {
    // console.error('나의 플레이리스트를 가져오지 못했습니다 :', error);
    throw error;
  }
}

// 유저의 플레이리스트 가져오기
export async function getAllPlaylists() {
  try {
    const response = await api.get(`/me/playlists`);
    return response.data;
  } catch (error) {
    // console.error('나의 전체 플레이리스트를 가져오지 못했습니다 :', error);
    throw error;
  }
}

// 플레이리스트ID로 플레이리스트 가져오기
export async function getPlaylists(playlistId: string) {
  try {
    const response = await api.get(`/playlists/${playlistId}`);
    return response.data;
  } catch (error) {
    // console.error('플레이리스트를 가져오지 못했습니다 :', error);
    throw error;
  }
}

// 가수명으로 조회
export async function searchItemByArtist(quary: string) {
  try {
    const response = await api.get(`/search?q=${quary}&type=artist`);
    return response.data;
  } catch (error) {
    // console.error('가수명 조회를 하지 못했습니다 :', error);
    throw error;
  }
}

// 곡명으로 조회
async function searchItemByTrack(quary: string) {
  try {
    const response = await api.get(`/search?q=${quary}&type=track`);
    return response.data;
  } catch (error) {
    // console.error('곡명 조회를 하지 못했습니다 :', error);
    throw error;
  }
}

// 유저의 프로필이미지 가져오기
export async function getProfiileImage(userId: string) {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    // console.error('프로필 이미지를 가져오지 못했습니다 :', error);
    throw error;
  }
}

export {searchItemByTrack};
