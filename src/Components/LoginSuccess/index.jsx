// LoginSuccess.jsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    if (token) {
      localStorage.setItem('access-token', token); // Or use context/redux
      navigate('/'); // or home page
    } else {
      navigate('/signin'); // fallback
    }
  }, [location, navigate]);

  return <p>Redirecting...</p>;
};

export default LoginSuccess;
