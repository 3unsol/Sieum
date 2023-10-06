import {collection, doc} from 'firebase/firestore';
import {database} from '~components/FireBase';

export function CurrentMusicColRef(regionCode: string) {
  const currentMusicColRef = collection(database, 'currentMusic');
  const currentMusicDocRef = doc(currentMusicColRef, regionCode);
  return collection(currentMusicDocRef, 'userList');
}

export function CurrentMusicDocRef(regionCode: string, uid: string) {
  const currentMusicColRef = collection(database, 'currentMusic');
  console.log('GetRef currentMusicColRef : ', currentMusicColRef);
  const currentMusicDocRef = doc(currentMusicColRef, regionCode);
  console.log('GetRef currentMusicDocRef : ', currentMusicDocRef);
  const currentMusicColRef2 = collection(currentMusicDocRef, 'userList');
  return doc(currentMusicColRef2, uid);
}
