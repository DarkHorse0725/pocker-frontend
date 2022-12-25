import { useEffect, useContext } from 'react';
import { GlobalContext } from './index';

function UserStatus() {
  // dispatch user's status value to the Context API store
  const [state, dispatch]: any = useContext(GlobalContext);

  useEffect(() => {
    // fetch user status
    const response = getUserStatus();

    dispatch({
      type: 'update_status',
      data: response,
    });
  }, [dispatch]);

  function getUserStatus() {
    console.log('Get user status: UserStatus');

    return 4;
  }

  return null;
}

export default UserStatus;
