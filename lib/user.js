import {db} from './firebase';
import {doc,getDoc} from 'firebase/firestore';
export async function getProfile(uid){const s=await getDoc(doc(db,'users',uid));return s.exists()?s.data():null}
export async function isAdmin(authUser){if(!authUser)return false;const token=await authUser.getIdTokenResult(true);return token.claims.admin===true;}
