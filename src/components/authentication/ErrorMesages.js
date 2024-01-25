
export const signUpErrorMessages = (error) => {
    switch (error) {
        case 'auth/email-already-in-use':
        return 'Email already in use';
        case 'auth/invalid-email':
        return 'Invalid email';
        case 'auth/weak-password':
        return 'Password should be at least 6 characters';
        default:
        return 'Something went wrong';
    }

}

export const loginErrorMessages = (error) => {
    console.log(error)
    switch (error) {
        case 'auth/invalid-email':
        return 'Invalid email';
        case 'auth/user-disabled':
        return 'User disabled';
        case 'auth/user-not-found':
        return 'User not found';
        case 'auth/wrong-password':
        return 'Wrong password';
        default:
        return 'Something went wrong';
    }

}