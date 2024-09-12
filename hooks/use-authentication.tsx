import { SignInDto, useSignInMutation } from '../graphql/generated';
import { useNavigate } from 'react-router-dom';
import {
  clearLocalStorage,
  setRefreshToken,
  setToken,
  setUserId,
} from '../lib/token';
import { ROLE } from '../lib/type';
import toast from 'react-hot-toast';

export const showError = (error: unknown | string) => {
	const message = (() => {
		if (typeof error === 'string') return error;
		return (
			(error as Error)?.message ?? 'Server Internal Error. Please try later.'
		);
	})();

	return toast.error(message);
};

export const useAuthentication = () => {
  const navigate = useNavigate();
  const [signInMutation, { loading: signInLoading }] = useSignInMutation({
    onCompleted(res) {
      setToken(res.signIn.token);
      localStorage.setItem('role', res.signIn.role?.name || '');
      setRefreshToken(res.signIn.refreshToken);
      setUserId(res.signIn.id);
      if (res.signIn.role?.name === ROLE.ADMIN) {
        navigate('/admin/statistic');
        window.location.reload();
      } else {
        navigate('/');
        window.location.reload();
      }
    },
    onError: showError,
  });

  const handleSignIn = (input: SignInDto) => {
    signInMutation({
      variables: {
        input,
      },
    });
  };

  const handleLogout = () => {
    navigate('/sign-in');
    clearLocalStorage();
  };

  return {
    handleSignIn,
    signInLoading,
    handleLogout,
  };
};
