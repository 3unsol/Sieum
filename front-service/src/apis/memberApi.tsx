import {RestApiInstance} from './RestApiInstance';

const api = RestApiInstance();

export async function getMyProfile() {
  try {
    const response = await api.get('/member');
    return response.data;
  } catch (error) {
    console.log('프로필 정보를 가져오지 못했습니다. : ', error);
  }
}
