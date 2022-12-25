import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useRef, useState } from 'react';

interface Props {
  type: number;
  percent: number;
  text: string;
  width?: string;
  height?: number;
}

const ProgressBarBack = styled(Box)`
  display: flex;
  margin-top: 5px;
  border-radius: 24px;
  background: #000000e5;
  height: 20px;
  cursor: pointer;
`;
const Progress = styled(Box)`
  height: 20px;
  box-shadow: inset 0px -4px 8px rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  min-width: 20px !important;
  transition: width 0.1s;
`;

interface TitleProps {
  type?: any;
}

const Title = styled(Box)<TitleProps>(({ type }) => ({
  position: 'absolute',
  fontSize: '8px',
  right: type ? '5px' : '-30px',
  top: '5px',
  color: 'white',
}));

const ProgressBar: React.FC<Props> = ({ type, percent, text, width }) => {
  const backgrounds = [
    'radial-gradient(227.45% 196.14% at 21.78% -82.5%, #FF8FD9 0%, #865DFF 56.25%, #4021FF 94.65%)',
    'radial-gradient(195.01% 168.18% at 22.02% -54.55%, #93F8FF 0%, #5882FF 62.16%, #2144FF 94.65%)',
    'radial-gradient(166.55% 143.64% at 22.09% -30%, #C6FFEA 0%, #5CDAEA 56.25%, #21AFFF 94.65%)',
  ];
  const offset = useRef<any>();

  const [curpercent, setCurPercent] = useState(percent);
  const [curtext, setCurText] = useState(text);
  const [ismove, setIsMove] = useState(false);

  const MoveAction = (event: any, click?: any) => {
    if (!ismove && !click && event.type !== 'touchmove') return;
    const { offsetLeft, offsetWidth } = offset.current;
    const textlist = text.includes('/') ? text.split('/') : text.split(' of ');
    const per = offsetWidth / Number(textlist[1]);
    const times = Math.min(
      Number(textlist[1]),
      Math.max(
        0,
        Math.ceil(
          ((event.type === 'touchmove'
            ? event.changedTouches[0].clientX
            : event.clientX) -
            offsetLeft) /
            per
        )
      )
    );
    setCurPercent(times * per);
    if (text.includes('/')) setCurText(`${times}/${textlist[1]}`);
    else setCurText(`${times} of ${textlist[1]}`);
  };

  useEffect(() => {
    document.addEventListener('mouseup', function (event) {
      if (offset.current && !offset.current.contains(event.target)) {
        setIsMove(false);
      }
    });
  }, []);

  const handleClick = (event: any) => {
    setIsMove(true);
    MoveAction(event, true);
  };

  const handleUp = () => {
    setIsMove(false);
  };

  return (
    <ProgressBarBack
      position="relative"
      onMouseDown={(e) => handleClick(e)}
      onTouchMove={(e) => MoveAction(e)}
      onMouseMove={(e) => MoveAction(e)}
      onMouseUp={() => handleUp()}
      ref={offset}
      width={width}
    >
      <Progress width={curpercent} style={{ background: backgrounds[type] }} />
      <Title type={text.includes('/').toString()}>{curtext}</Title>
    </ProgressBarBack>
  );
};

export default ProgressBar;
