'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { db } from '../components/firebase';

const ProfilePage = () => {
    const [imageUrls, setImageUrls] = useState([
        "https://firebasestorage.googleapis.com/v0/b/creat1vecapital.appspot.com/o/public%2Fbzz%2Faang-flying.png?alt=media&token=9b57751c-07fb-4979-9901-d38336ef2f0e",
        "https://firebasestorage.googleapis.com/v0/b/creat1vecapital.appspot.com/o/public%2Fbzz%2Fappa.png?alt=media&token=5e17f8f8-4d9a-4ea6-bbb1-9c7ff047948a",
        "https://firebasestorage.googleapis.com/v0/b/creat1vecapital.appspot.com/o/public%2Fbzz%2Fjake-the-dog.png?alt=media&token=682fa35b-3f8d-4f7d-96dd-cbc2253b3f3d"
      ]);
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    if (slug) {
      const fetchProfile = async () => {
        const docRef = doc(db, 'profiles', slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const profileData = docSnap.data();
          setImageUrls(profileData.imageUrls || []);
        } else {
          console.error("No such document!");
        }
      };
      fetchProfile();
    }
  }, [slug]);

  if (imageUrls.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="snap-y snap-mandatory h-screen overflow-scroll">
      {imageUrls.map((url, index) => (
        <section key={index} className="snap-start h-screen relative">
          <img src={url} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
        </section>
      ))}
    </div>
  );
};

export default ProfilePage;