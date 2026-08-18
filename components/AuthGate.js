'use client';

import { useEffect, useState } from 'react';

import { auth, googleProvider, db } from '../lib/firebase';

import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

import { useRouter } from 'next/navigation';


export function AuthGate() {

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const router = useRouter();


  // =======================================
  // AUTHENTICATION
  // =======================================

  useEffect(() => {

    let mounted = true;

    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {

        if (!mounted) return;

        try {

          setError('');
          setUser(currentUser);

          // User is not logged in
          if (!currentUser) {

            setProfile(null);
            setLoading(false);

            return;
          }


          // Get student profile from Firestore
          const userRef = doc(
            db,
            'users',
            currentUser.uid
          );

          const snapshot = await getDoc(userRef);


          if (!mounted) return;


          if (snapshot.exists()) {

            setProfile(snapshot.data());

          } else {

            setProfile(null);

          }

        } catch (err) {

          console.error(
            'Firestore profile error:',
            err
          );

          if (mounted) {

            setError(
              err?.message ||
              'Unable to access your student profile.'
            );

            setProfile(null);
          }

        } finally {

          if (mounted) {
            setLoading(false);
          }

        }

      }
    );


    return () => {

      mounted = false;

      unsubscribe();

    };

  }, []);


  // =======================================
  // REDIRECT AFTER PROFILE IS LOADED
  // =======================================

  useEffect(() => {

    if (
      !loading &&
      user &&
      profile
    ) {

      router.replace('/learn');

    }

  }, [
    loading,
    user,
    profile,
    router
  ]);


  // =======================================
  // GOOGLE LOGIN
  // =======================================

  async function login() {

    try {

      setError('');
      setLoading(true);

      await signInWithPopup(
        auth,
        googleProvider
      );

    } catch (err) {

      console.error(
        'Google login error:',
        err
      );

      setError(
        err?.message ||
        'Google login failed. Please try again.'
      );

      setLoading(false);

    }

  }


  // =======================================
  // SAVE STUDENT PROFILE
  // =======================================

  async function save(e) {

    e.preventDefault();

    try {

      setError('');
      setLoading(true);

      const form = new FormData(
        e.currentTarget
      );

      const name = String(
        form.get('name') || ''
      ).trim();

      const rollNumber = String(
        form.get('rollNumber') || ''
      ).trim();


      if (!name || !rollNumber) {

        setError(
          'Please enter your name and roll number.'
        );

        setLoading(false);

        return;
      }


      // Save student information
      await setDoc(
        doc(db, 'users', user.uid),
        {
          uid: user.uid,

          email: user.email,

          name: name,

          rollNumber: rollNumber,

          photoURL: user.photoURL || '',

          createdAt: serverTimestamp(),

          updatedAt: serverTimestamp(),

        },
        {
          merge: true,
        }
      );


      // Update local state.
      // The redirect is handled by the useEffect above.
      setProfile({

        uid: user.uid,

        email: user.email,

        name: name,

        rollNumber: rollNumber,

        photoURL: user.photoURL || '',

      });


    } catch (err) {

      console.error(
        'Profile save error:',
        err
      );

      setError(
        err?.message ||
        'Unable to save your profile.'
      );

      setLoading(false);

    }

  }


  // =======================================
  // LOADING SCREEN
  // =======================================

  if (loading) {

    return (

      <main className="center">

        <div className="card auth">

          <h2>

            {user && profile
              ? 'Opening your classroom…'
              : 'Loading…'}

          </h2>

          <p className="muted">
            Please wait.
          </p>

        </div>

      </main>

    );

  }


  // =======================================
  // LOGIN SCREEN
  // =======================================

  if (!user) {

    return (

      <main className="center">

        <div className="card auth">

          <h1>
            🐍 Python Learning
          </h1>

          <p>
            Learn, practice and join live coding
            classes.
          </p>


          {error && (

            <div className="error">

              {error}

            </div>

          )}


          <button
            type="button"
            onClick={login}
          >

            Continue with Google

          </button>

        </div>

      </main>

    );

  }


  // =======================================
  // PROFILE FORM
  // =======================================

  if (!profile) {

    return (

      <main className="center">

        <form
          className="card auth"
          onSubmit={save}
        >

          <h2>
            Complete your profile
          </h2>


          {error && (

            <div className="error">

              {error}

            </div>

          )}


          <label>

            Name

            <input
              name="name"
              required
              autoComplete="name"
              placeholder="Enter your full name"
            />

          </label>


          <label>

            Roll Number

            <input
              name="rollNumber"
              required
              placeholder="Enter your roll number"
            />

          </label>


          <p className="muted">

            Google: {user.email}

          </p>


          <button
            type="submit"
          >

            Continue

          </button>

        </form>

      </main>

    );

  }


  // =======================================
  // REDIRECT SCREEN
  // =======================================

  return (

    <main className="center">

      <div className="card auth">

        <h2>
          Opening your classroom…
        </h2>

        <p className="muted">

          Welcome, {profile.name}

        </p>

      </div>

    </main>

  );

}


// =======================================
// LOGOUT
// =======================================

export async function logout() {

  await signOut(auth);

  window.location.href = '/';

}
