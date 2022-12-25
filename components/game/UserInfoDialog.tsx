import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
interface Props {
  index?: number;
  open: boolean;
  setOpen?: any;
  items?: any;
  ice?: number;
  xp?: number;
  dg?: number;
}

interface ItemFieldProps {
  type?: number;
}

const ItemField = styled(Box)<ItemFieldProps>(() => ({
  background: 'rgba(0, 0, 0, 0.5)',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: '800',
  flexDirection: 'column',
  fontSize: '11px',
  fontStyle: 'italic',
  lineHeight: '15px',
  color: 'white',
  width: '62px',
  height: '55px',
}));

interface CloseProps {
  open?: boolean;
}

const Close = styled(Box)<CloseProps>(({ open }) => ({
  cursor: 'pointer',
  background: '#1F1F1F',
  position: 'absolute',
  border: '1px solid #2A2A2A',
  boxSizing: 'border-box',
  boxShadow: '0px 10.6667px 21.3333px rgba(0, 0, 0, 0.24)',
  borderRadius: '50%',
  display: open ? 'flex' : 'none',
  justifyContent: 'center',
  alignItems: 'center',
  width: '32px',
  height: '32px',
  zIndex: '15',
  top: '-195px',
  left: '135px',
  transition: 'background 0.3s',
  [':hover']: {
    background: '#333333',
  },
}));

interface DialogProps {
  open?: boolean;
}

const Dialog = styled(Box)<DialogProps>(({ open }) => ({
  top: '-180px',
  position: 'absolute',
  left: '-90px',
  background: '#1F1F1F',
  borderRadius: '24px',
  padding: '16px',
  zIndex: open ? 10 : 0,
  overflow: 'hidden',
  width: '249px',
  height: '230px',
  opacity: open ? 1 : 0,
  transition: 'opacity 0.3s',

  ['* > span']: {
    fontSize: '9px',
    color: 'rgb(255, 255, 255, 0.75)',
    marginTop: '4px',
  },
}));

const NoneItem = styled(Box)`
  background: radial-gradient(50% 50% at 50% 50%, #979797 0%, #6f6f6f 100%);
  border-radius: 8px;
  width: 37px;
  height: 37px;
`;

const UserInfoDialog: React.FC<Props> = ({
  open,
  setOpen,
  items,
  ice,
  xp,
  dg,
}) => {
  const dialog = useRef<any>();
  const [useritems, setUserItems] = useState<string[]>([]);

  useEffect(() => {
    document.addEventListener('mouseup', function (event) {
      if (dialog.current && !dialog.current.contains(event.target)) {
        setOpen(false);
      }
    });
  }, [setOpen]);

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < 5; i++) temp.push('');
    for (let i = 0; i < items.length; i++) {
      temp[i] = items[i];
    }
    setUserItems(temp);
  }, [items]);
  return (
    <>
      <Close open={open}>
        <AiOutlineClose color="white" />
      </Close>
      <Dialog open={open} ref={dialog}>
        <Box fontSize="20px" fontWeight="800" color="white">
          Your Player Stats
        </Box>
        <Box display="flex" justifyContent="space-between" my="8px">
          <Box display="flex" alignItems="center" flexDirection="column">
            <span>ICE BALANCE</span>
            <ItemField mt="8px">
              <Box mb="4px">{ice}</Box>
              <Image
                src="/images/diamond.svg"
                width={20}
                height={20}
                alt="diamond"
              />
            </ItemField>
          </Box>
          <Box display="flex" alignItems="center" flexDirection="column">
            <span>XP BALANCE</span>
            <ItemField mt="8px">
              <Box mb="4px">{xp}</Box>
              <Image src="/images/xp.svg" width={20} height={20} alt="xp" />
            </ItemField>
          </Box>
          <Box display="flex" alignItems="center" flexDirection="column">
            <span>DG BALANCE</span>
            <ItemField mt="8px">
              <Box mb="4px">{dg}</Box>
              <Image src="/images/dg.png" width={20} height={20} alt="dg" />
            </ItemField>
          </Box>
        </Box>
        <Box>
          <span>EQUIPPED ICE WEARABLES (+100% BONUS)</span>
        </Box>
        <Box display="flex" mt="8px">
          {useritems.map((data: string, i: number) => {
            return (
              <Box
                mr="8px"
                fontSize="9px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                key={1000 + i}
              >
                {data !== '' && (
                  <>
                    <Image
                      src={`${data}`}
                      key={i}
                      width="100%"
                      height="100%"
                      alt="line"
                    />
                    <span>+31%</span>
                  </>
                )}
                {data === '' && (
                  <>
                    <NoneItem />
                    <span style={{ opacity: 0.25 }}>+0%</span>
                  </>
                )}
              </Box>
            );
          })}
        </Box>
      </Dialog>
    </>
  );
};
export default UserInfoDialog;
