import { Box, TextField } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image'


const RaiseField = styled(Box) <{ open: boolean }>`
    display : flex;
  justify-content : center;
  position : absolute;
  bottom : 0;
  z-index : 20;
  max-height : ${({ open }) => open ? '400px' : '0px'};
    overflow : hidden;
    transition : max-height 0.5s;

`
const RaisePanel = styled(Box)`
  padding: 0px 16px;
  margin-top: 20px;
  background: #1f1f1f;
  box-shadow: 0px -4px 16px rgba(0, 0, 0, 0.25);
  border-radius: 16px 16px 0px 0px;
  width: 374px;
  height: 156px;
`;

const RaiseInput = styled(Box)`
  margin-top: 16px;
  padding: 6px 6px 6px 18px;
  display: flex;
  align-items: center;
  border: 1px solid #2a2a2a;
  box-sizing: border-box;
  border-radius: 16px;
  height: 58px;
`;

const RaiseButton = styled(Box)`
  background: #3da65a;
  color: white;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 46px;
  cursor: pointer;
`;

const RaiseAction = styled(Box)`
  > div {
    background: #2a2a2a;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 80px;
    height: 48px;
  }
  margin-top: 12px;
  color: white;
  fontweight: bold;
  display: flex;
  justify-content: space-between;
`;

interface Props {
    open: boolean;
    setOpen: any;
    setRaiseAmount: any;
    raiseamount: number;
    onRaise: any;
}

const RaiseSetting: React.FC<Props> = ({ open, setOpen, raiseamount, setRaiseAmount, onRaise }) => {
  return (
    <RaiseField open={open}>
      <RaisePanel>
        <RaiseInput>
          <Box color="#FFFFFF80" width="85px" fontWeight="bold" mr="5px">
                        Your Bet:
          </Box>
          <TextField
            className="raise"
            inputProps={{
              style: {
                textAlign: 'center',
                color: 'white',
                fontSize: '30px',
                width: '100px',
              },
            }}
            variant="standard"
            type="number"
            value={raiseamount}
            onChange={(event) => setRaiseAmount(Number(event.target.value))}
          />
          <Image src="/images/freecoin.svg" alt="freecoin" width={44} height={44} />
          <RaiseButton ml="10px" onClick={() => { onRaise(); setOpen(false) }}>
                        Raise
          </RaiseButton>
        </RaiseInput>
        <RaiseAction>
          <Box>1/2</Box>
          <Box>3/4</Box>
          <Box>Pot</Box>
          <Box>Max</Box>
        </RaiseAction>
      </RaisePanel>
    </RaiseField>
  );
};

export default RaiseSetting;
