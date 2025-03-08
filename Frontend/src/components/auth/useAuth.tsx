import { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

const useAuth = () => {
    const [user, setUser] = useState<User | null>(auth.currentUser);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { user, isLoading };
};

export default useAuth;