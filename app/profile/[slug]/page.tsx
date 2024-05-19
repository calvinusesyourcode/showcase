'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams} from 'next/navigation';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../components/firebase';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [responses, setResponses] = useState({});
  const [ratings, setRatings] = useState({});
  const params = useParams();
const { slug } = params;

  useEffect(() => {
    if (slug) {
      const fetchProfile = async () => {
        const docRef = doc(db, 'profiles', slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          console.error("No such document!");
        }
      };
      fetchProfile();
    }
  }, [slug]);

  const handleResponseChange = (questionIndex, choiceIndex) => {
    setResponses(prev => ({ ...prev, [questionIndex]: choiceIndex }));
  };

  const handleRatingChange = (ideaIndex, rating) => {
    setRatings(prev => ({ ...prev, [ideaIndex]: rating }));
  };

  const handleSubmit = async () => {
    const docRef = doc(db, 'profiles', slug);
    await updateDoc(docRef, { responses, ratings });
    alert('Responses and ratings submitted!');
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="snap-y snap-mandatory h-screen overflow-scroll">
      <section className="snap-start h-screen relative">
        <img src={profile.displayNameImageUrl} alt="Display Name" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div>
            <h1>{profile.displayName}</h1>
            <p>{profile.phoneNumber}</p>
            <p>{profile.age}</p>
            <p>{profile.height}</p>
          </div>
        </div>
      </section>

      {profile.interests.map((interest, index) => (
        <section key={index} className="snap-start h-screen relative">
          <img src={interest.imageUrl} alt="Interest" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <h2>{interest.text}</h2>
          </div>
        </section>
      ))}

      <section className="snap-start h-screen relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          {profile.dateIdeas.map((idea, index) => (
            <div key={index} className="mb-4">
              <img src={idea.imageUrl} alt="Date Idea" className="w-full h-64 object-cover" />
              <h2>{idea.text}</h2>
              <div>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => handleRatingChange(index, star)}
                    style={{ color: ratings[index] >= star ? 'gold' : 'gray' }}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {profile.questions.map((question, index) => (
        <section key={index} className="snap-start h-screen relative">
          <img src={question.imageUrl} alt="Question" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div>
              <h2>{question.title}</h2>
              <p>{question.subtitle}</p>
              {question.choices.map((choice, choiceIndex) => (
                <div key={choiceIndex}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    checked={responses[index] === choiceIndex}
                    onChange={() => handleResponseChange(index, choiceIndex)}
                  />
                  <span>{choice.emoji}</span> {choice.text}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <button onClick={handleSubmit} className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </div>
  );
};

export default ProfilePage;