import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import Image from 'next/image'

interface Props { }

const CloseIcon = styled(Box) <{ open: boolean }>`
  top : -55px;
  left : 15px;
  position : absolute;
  background: #1F1F1F;
  box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.24);
  border-radius: 24px;
  width : 48px;
  height : 48px;
  display  :${({ open }) => open ? 'flex' : 'none'};
  justify-content : center;
  align-items : center;
  cursor : pointer;
`;

const Ice = styled(Box) <{ radius: number, color: string }>`
  background-image: ${({ radius, color }) =>
    `linear-gradient(0deg, rgba(255, 255, 255, ${radius}), rgba(255, 255, 255, ${radius})),
  linear-gradient(0deg, ${color}, ${color})`};

  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
`;
const ScoreField = styled(Box)`
  display : flex;
  justify-content : space-between;
  align-items : center;
  font-weight : bold;
  line-height: 18px;
  font-size : 15px;
    width : 100%;
`;

const ScoreTab = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.75);
  font-weight: bold;
  font-size: 14px;
`;

const LeaderBoardBody = styled(Box) <{ open: boolean }>`
  width : 100%;
  display : flex;
  justify-content : center;
  position : absolute;
  bottom : 0px;
  z-index : 20;
  max-height : ${({ open }) => open ? '800px' : '0px'};
  transition : max-height 0.5s;
`;


const LeaderBoardField = styled(Box)`
  overflow : hidden;
  background: #1f1f1f;
  box-shadow: 0px -4px 16px rgba(0, 0, 0, 0.25);
  border-radius: 16px 16px 0px 0px;
  padding: 0px 40px;
  width: 374px;
  :nth-of-type(1) {
    font-weight: 800;
    font-size: 24px;
    line-height: 33px;
    color: white;
  }
`;

const ChipField = styled(Box)`
  padding: 0px 9px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 127.143px;
  color: white;
  font-size: 12px;
  font-weight: 600px;
`;


interface Props {
  open: boolean;
  setOpen: any;
}

const LeaderBoard: React.FC<Props> = ({ open, setOpen }) => {

  const [scoredata, setScoreData] = useState<any[]>([]);

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < 20; i++) {
      let data: any = { percentile: '', ice: '', chips: '' };
      data.percentile = `${i * 5 + 1} - ${i * 5 + 5}%`;
      data.ice = `${(1.5 - 0.05 * i).toFixed(2)}x`;
      data.chips = '+4000';
      temp.push(data);
    }
    setScoreData(temp);
  }, []);

  return (
    <>
      <LeaderBoardBody open={open}>
        <LeaderBoardField >
          <CloseIcon onClick={() => setOpen(false)} open={open}><FaChevronDown fontSize="20px" /></CloseIcon>
          <Box width={295} textAlign={'center'} mt="16px">Daily Leaderboard & Winnings Percentile</Box>
          <ScoreTab mt="26px">
            <Box>Percentile</Box>
            <Box>ICE Multiplier</Box>
            <Box>Net Chips</Box>
          </ScoreTab>
          {
            scoredata.map((data: any, i: any) => {
              let radius: any, color: any;
              if (i < 10) {
                radius = 0.05 * i;
                color = '#91FF95';
              }
              else {
                radius = 1 - 0.1 * (i - 10);
                color = '#FF9191';
              }
              return (
                <Box key={2000 + i} display="flex" mt="2px">
                  <Box width="16px" height="16px" mt="-10px" mr="10px">
                    <Image src="/images/star.svg" alt="star" width={12} height={13} />
                  </Box>
                  <ScoreField >
                    <Box width="75px">{data.percentile}</Box>
                    <Ice width="45px" radius={radius} color={color}>{data.ice}</Ice>
                    <ChipField>
                      <Box mr="4px">{data.chips}</Box>
                      <Box pt="5px"><Image src="/images/freecoin.svg" alt="freecoin" width={13} height={13} /></Box>
                    </ChipField>
                  </ScoreField>
                </Box>
              )
            })
          }
          <Box mb="30px" />
        </LeaderBoardField>
      </LeaderBoardBody>
    </>
  );
};



export default LeaderBoard;
