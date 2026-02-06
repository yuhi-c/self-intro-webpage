import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const ProtectedRoute = ({ children }) => {
  const [status, setStatus] = useState('checking'); // checking | authenticated | unauthenticated

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json().catch(() => ({}));
        if (!isMounted) return;

        setStatus(data.authenticated ? 'authenticated' : 'unauthenticated');
      } catch (e) {
        if (!isMounted) return;
        setStatus('unauthenticated');
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === 'checking') return null;
  return status === 'authenticated' ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
