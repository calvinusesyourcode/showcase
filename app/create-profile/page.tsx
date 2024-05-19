'use client';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { auth, db, storage} from '../../components/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/router';

const CreateProfilePage = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    displayName: '',
    phoneNumber: '',
    age: '',
    height: '',
    interests: [{ text: '', imageUrl: '' }],
    dateIdeas: [{ text: '', imageUrl: 'auto_generate' }],
    questions: [{ title: '', subtitle: '', imageUrl: '', choices: [{ emoji: '', text: '' }] }]
  });

//   const router = useRouter();
const handleFileUpload = async (section, index, file) => {
    const storageRef = ref(storage, `public/bzz/${file.name}`)
    await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)
    handleInputChange(section, index, 'imageUrl', downloadURL)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).catch(error => {
          console.error("Error during sign-in:", error);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (section, index, field, value) => {
    const updatedProfile = { ...profile };
    updatedProfile[section][index][field] = value;
    setProfile(updatedProfile);
  };

  const addNewField = (section) => {
    const updatedProfile = { ...profile };
    updatedProfile[section].push(section === 'questions' ? { title: '', subtitle: '', imageUrl: '', choices: [{ emoji: '', text: '' }] } : { text: '', imageUrl: section === 'dateIdeas' ? 'auto_generate' : '' });
    setProfile(updatedProfile);
  };

  const saveProfile = async () => {
    try {
      await addDoc(collection(db, 'profiles'), { ...profile, userId: user.uid });
    //   router.push('/profile');
    console.log("Profile saved!")
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  if (!user) {
    return (
      <div>
        <h1>Create Your Profile</h1>
        <button onClick={() => {
          const provider = new GoogleAuthProvider();
          signInWithPopup(auth, provider).catch(error => {
            console.error("Error during sign-in:", error);
          });
        }}>Sign in with Google</button>
      </div>
    );
  }

  return (
    <div className='text-black bg-blue-500'>
      <h1>Create Your Profile</h1>
      <div>
        <h2>Basic</h2>
        <input type="text" placeholder="Display Name" value={profile.displayName} onChange={e => setProfile({ ...profile, displayName: e.target.value })} />
        <input type="text" placeholder="Phone Number" value={profile.phoneNumber} onChange={e => setProfile({ ...profile, phoneNumber: e.target.value })} />
        <input type="number" placeholder="Age" value={profile.age} onChange={e => setProfile({ ...profile, age: e.target.value })} />
        <input type="text" placeholder="Height" value={profile.height} onChange={e => setProfile({ ...profile, height: e.target.value })} />
      </div>
      <div>
        <h2>Interests</h2>
        {profile.interests.map((interest, index) => (
          <div key={index}>
            <input type="text" placeholder="Interest" value={interest.text} onChange={e => handleInputChange('interests', index, 'text', e.target.value)} />
            <input type="file" onChange={e => handleFileUpload('interests', index, e.target.files[0])} />
          </div>
        ))}
        <button onClick={() => addNewField('interests')}>Add Interest</button>
      </div>
      <div>
        <h2>Date Ideas</h2>
        {profile.dateIdeas.map((idea, index) => (
          <div key={index}>
            <input type="text" placeholder="Date Idea" value={idea.text} onChange={e => handleInputChange('dateIdeas', index, 'text', e.target.value)} />
            <input type="file" onChange={e => handleFileUpload('dateIdeas', index, e.target.files[0])} />
          </div>
        ))}
        <button onClick={() => addNewField('dateIdeas')}>Add Date Idea</button>
      </div>
      <div>
        <h2>Multiple Choice Questions</h2>
 


        {profile.questions.map((question, index) => (
          <div key={index}>
            <input type="text" placeholder="Question Title" value={question.title} onChange={e => handleInputChange('questions', index, 'title', e.target.value)} />
            <input type="text" placeholder="Question Subtitle" value={question.subtitle} onChange={e => handleInputChange('questions', index, 'subtitle', e.target.value)} />
            <input type="file" onChange={e => handleFileUpload('questions', index, e.target.files[0])} />
            {question.choices.map((choice, choiceIndex) => (
              <div key={choiceIndex}>
                <input type="text" placeholder="Emoji" value={choice.emoji} onChange={e => {
                  const updatedChoices = [...question.choices];
                  updatedChoices[choiceIndex].emoji = e.target.value;
                  handleInputChange('questions', index, 'choices', updatedChoices);
                }} />
                <input type="text" placeholder="Choice Text" value={choice.text} onChange={e => {
                  const updatedChoices = [...question.choices];
                  updatedChoices[choiceIndex].text = e.target.value;
                  handleInputChange('questions', index, 'choices', updatedChoices);
                }} />
              </div>
            ))}
            <button onClick={() => {
              const updatedChoices = [...question.choices, { emoji: '', text: '' }];
              handleInputChange('questions', index, 'choices', updatedChoices);
            }}>Add Choice</button>
          </div>
        ))}
        <button onClick={() => addNewField('questions')}>Add Question</button>
      </div>
      <button onClick={saveProfile}>Save Profile</button>
    </div>
  );
};

export default CreateProfilePage;