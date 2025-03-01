import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function ProfileContainer() {
  const [cookies] = useCookies(['FLOW', 'TOKEN']);
  const navigate = useNavigate();
  useEffect(() => {
    if (!cookies.TOKEN) {
      navigate('/');
    }
  }, [cookies.TOKEN]);
  return <div>Container</div>;
}

export default ProfileContainer;
