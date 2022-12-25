import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';
interface Props {
  index?: number;
  open: boolean;
  setOpen?: any;
  items?: any;
}

interface CloseProps {
  index?: number;
  open?: boolean;
  items?: any;
}

const Close = styled(Box)<CloseProps>(({ open, index, items }) => ({
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
  top: '-15px',
  right: (index === 1 || index === 2 ? '-15px' : index === 3)
    ? `-${(items * 32 + 8 * items - 8) / 2}px`
    : '50px',
  transition: 'background 0.3s',
  [':hover']: {
    background: '#333333',
  },
}));

interface DialogProps {
  index?: number;
  open?: boolean;
  left?: number;
  items?: any;
}

const Dialog = styled(Box)<DialogProps>(({ index, open, items }) => ({
  display: 'flex',
  position: 'absolute',
  background: '#1F1F1F',
  borderRadius: '24px',
  padding: '16px 0px 8px 0px',
  zIndex: 10,
  overflow: 'hidden',
  right: (index === 1 || index === 2 ? '0px' : index === 3)
    ? `-${(items * 32 + 8 * items - 32) / 2}px`
    : 'unset',
  width: 'fit-content',
  maxWidth: open ? '300px' : '0px',
  transition: 'max-width 0.3s',

  ['>div']: {
    marginLeft: '8px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },

  ['>div>span']: {
    fontSize: '9px',
    color: 'rgb(255,255,255,0.75)',
    fontWeight: 'bold',
    marginTop: '4px',
  },
}));

const InfoDialog: React.FC<Props> = ({ index, open, setOpen, items }) => {
  const dialog = useRef<any>();

  useEffect(() => {
    document.addEventListener('mouseup', function (event) {
      if (dialog.current && !dialog.current.contains(event.target)) {
        setOpen(false);
      }
    });
  }, [setOpen]);

  return (
    <>
      <Close index={index} open={open} items={items.length}>
        <AiOutlineClose color="white" />
      </Close>
      <Dialog index={index} open={open} ref={dialog} items={items.length}>
        {items.map((data: string, i: number) => {
          return (
            <Box
              key={2000 + i}
              marginLeft={i === 0 ? '16px!important' : ''}
              marginRight={i === items.length - 1 ? '16px!important' : ''}
            >
              <Image src={data} key={i} alt="line" layout="fill" />
              <span>+31%</span>
            </Box>
          );
        })}
      </Dialog>
    </>
  );
};
export default InfoDialog;
