import { Box } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';

interface Props {
  type: string;
  number: string;
  transform?: string;
}

type CardBodyProps = {
  transform?: string;
  type: string;
};

const CardBody = styled(Box)<CardBodyProps>(({ transform, type }) => ({
  background: '#F2F2F2',
  border: '0.159898px solid #D2D2D2',
  boxSizing: 'border-box',
  boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.16)',
  borderRadius: '5px',
  width: '45px',
  height: '63px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  margin: transform ? '0px' : '5px',
  transform: transform,
  ['& :nth-of-type(1)']: {
    fontSize: '28px',
    color: type == 'Carreau' ? 'red' : 'black',
    fontWeight: 'bold',
  },
}));

const ProgressBar: React.FC<Props> = ({ type, number, transform }) => {
  return (
    <CardBody transform={transform} type={type}>
      <Box>{number}</Box>
      <Image
        src={`/images/${type}.png`}
        width="19px"
        height="19px"
        alt="card"
      />
    </CardBody>
  );
};

export default ProgressBar;
