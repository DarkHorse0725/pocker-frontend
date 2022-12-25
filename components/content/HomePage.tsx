import { useEffect, useContext, useState } from 'react';
import Web3 from 'web3';
import { Box } from '@mui/material';
// import { useMediaQuery } from '../../hooks';
import { GlobalContext } from '../../store';
import { API_BASE_URL } from '../../common/Fetch';
import call from '../../common/API';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';

declare const window: any;

const assignToken = async (accountSwitch = false) => {
  const userAddress = window.ethereum?.selectedAddress;
  if (userAddress && document.visibilityState === 'visible') {
    const timestamp = Date.now();

    const msg = window.web3.utils.utf8ToHex(
      `Decentral Games Login\nTimestamp: ${timestamp}`
    );
    const signature = await window.web3.eth.personal.sign(
      msg,
      window.ethereum?.selectedAddress,
      null
    );

    const token = await call(
      `${API_BASE_URL}/authentication/getWebAuthToken?address=${userAddress}&signature=${signature}&timestamp=${timestamp}`,
      'GET',
      false
    );

    localStorage.setItem('token', token);
    localStorage.setItem(
      'expiretime',
      Number(timestamp / 1000 + 12 * 3600).toString()
    );

    if (accountSwitch) {
      window.location.reload();
    }
  }
};

const HomePage = () => {
  // get user's status from the Context API store
  const [state, dispatch]: any = useContext(GlobalContext);

  // define local variables
  const [metamaskEnabled, setMetamaskEnabled] = useState(false);
  // const tablet = useMediaQuery('(max-width: 992px)');

  // get network ID
  useEffect(() => {
    if (window.ethereum) {
      setMetamaskEnabled(true);
      window.web3 = new Web3(window.ethereum); // pass MetaMask provider to Web3 constructor

      (async () => {
        const networkID = await window.web3.eth.net.getId();

        dispatch({
          type: 'network_id',
          data: networkID,
        });
      })();

      window.addEventListener('load', function () {
        if (window.ethereum?.selectedAddress) {
          dispatch({
            type: 'user_address',
            data: window.ethereum?.selectedAddress,
          });
        }
        window.ethereum.on('accountsChanged', () => {
          if (window.ethereum?.selectedAddress) {
            dispatch({
              type: 'user_address',
              data: window.ethereum?.selectedAddress,
            });
            assignToken(true);
          }
        });
        window.ethereum.on('close', () => {
          window.location.reload();
        });
      });
    } else {
      setMetamaskEnabled(false);
    }
  }, [dispatch]);

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    console.log('User status: ' + state.userStatus);
  }, [state.userStatus]);

  let userAddress = '';

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////

  async function updateStatus(value: any, post: boolean) {
    if (post) {
      console.log('Posting user status to db: ' + value);

      // update user status in database
      // await Fetch.REGISTER(state.affiliateAddress);

      // update global state user status after fetch is complete
      dispatch({
        type: 'update_status',
        data: value,
      });
    } else {
      // update global state user status immediately
      dispatch({
        type: 'update_status',
        data: value,
      });
    }
  }

  async function getUserStatus() {
    console.log('Get user status: ModalLogin');

    // try {
    //   const responseStatus = await Fetch.USER_STATUS(userAddress, '');
    //   const jsonStatus = await responseStatus.json();

    //   if (!jsonStatus.status) return false;

    //   return jsonStatus.status;
    // } catch {
    //   console.log('Unregistered wallet: ModalLogin');

    //   return false;
    // }
    return 4;
  }

  async function openMetaMask() {
    if (metamaskEnabled) {
      // open MetaMask for login then get the user's wallet address

      await window?.ethereum.enable();

      userAddress = window.ethereum?.selectedAddress;

      // track MetaMask connect event
      // analytics.track('Connected MetaMask', {
      //   userAddress: userAddress,
      // });
      console.log(userAddress);
      assignToken();

      // dispatch user address to the Context API store
      dispatch({
        type: 'user_address',
        data: userAddress,
      });

      // set global user status based on value stored in database
      // if new wallet update user status to 4 both locally and in the database
      // (/websiteLogin API call will return error with new wallet address)
      const response = await getUserStatus();

      if (response) {
        updateStatus(response, false);
      } else {
        updateStatus(4, true);
      }
    }
  }

  const disconnect = () => {
    dispatch({
      type: 'user_address',
      data: '',
    });
  }

  const ellipsis = state.userAddress ? (state.userAddress.substring(0, 4) + '....' +
    state.userAddress.substring(state.userAddress.length - 4)) : '';
  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  return (
    <main className={styles.main}>
      <div className={styles.back}>
        <div className={styles.gradient} />
        <Box className={styles.playtitle}>
          Free To Play.<br />
          Play To Earn.<br />
          Poker.
        </Box>
        <Box display="flex" justifyContent="center" position="relative" mt="32px">
          <Box display="flex" justifyContent="space-between" width="70%">
            <Box width={64} display="flex" flexDirection="column" alignItems="center">
              <Image src="/images/home/cloth.png" alt="cloth" width={34} height={31} />
              <Box textAlign="center" fontWeight="bold" fontSize="14px" mt="12px">Get a Wearable</Box>
            </Box>

            <Box width={64} display="flex" flexDirection="column" alignItems="center">
              <Image src="/images/home/freepoker.png" alt="cloth" width={28} height={36} />
              <Box textAlign="center" fontWeight="bold" fontSize="14px" mt="12px">Play Free Poker</Box>
            </Box>

            <Box width={58} display="flex" flexDirection="column" alignItems="center">
              <Image src="/images/home/earnice.png" alt="cloth" width={38} height={35} />
              <Box textAlign="center" fontWeight="bold" fontSize="14px" mt="12px">Earn ICE</Box>
            </Box>
          </Box>
        </Box>
        <Box style={{cursor : 'pointer'}} 
          className={styles.connectWallet} 
          onClick={() => state.userAddress ? disconnect() : openMetaMask()} 
        >
          <Image src="/images/home/metamask.png" alt="metamask" width={35} height={35} />
          <Box>{!state.userAddress ? 'Connect Your Wallet' : ellipsis}</Box>
        </Box>
      </div>
    </main >
  );
};

export default HomePage;
