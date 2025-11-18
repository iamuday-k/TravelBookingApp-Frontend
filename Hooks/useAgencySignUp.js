// GoVyral/hooks/useAgencySignUp.js
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpAgency } from '../store/slices/agencyAuthSlice';

export default function useAgencySignUp() {
  const dispatch = useDispatch();
  const status = useSelector((s) => s.agencyAuth?.status);
  const error = useSelector((s) => s.agencyAuth?.error);

  const submit = useCallback(
    async (formData) => {
      // returns the dispatched action so the caller can inspect result if needed
      const action = await dispatch(signUpAgency(formData));
      return action;
    },
    [dispatch]
  );

  return { submit, status, error };
}
