import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase-config';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();

            const result = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })
            })
            const data = await res.json();
            dispatch(signInSuccess(data))
            navigate("/")
            console.log(result)
        } catch (error) {
            console.log("Could not sign in with Google!", error)
        }
    }
    return (
        <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white p-2 rounded-xl hover:bg-red-800 hover:scale-105 hover:shadow-lg duration-500'>Continue with Google</button>
    )
}
