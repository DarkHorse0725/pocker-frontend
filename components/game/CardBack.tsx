import { Box } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';

interface Props {
  transform: string;
}

const CardBody = styled(Box)`
  background: #252525;
  border: 2.5px solid #ffffff;
  box-sizing: border-box;
  border-radius: 3.70921px;
  width: 32px;
  height: 47px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardBack: React.FC<Props> = ({ transform }) => {
  return (
    <CardBody style={{ transform: transform }}>
      <Image
        src="/images/cardback.png"
        width="13px"
        height="13px"
        alt="cardback"
      />
    </CardBody>
  );
};

export default CardBack;
