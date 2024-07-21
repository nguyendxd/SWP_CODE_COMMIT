import React from 'react';
import styled from 'styled-components';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const FixedButtonWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const Button = styled.button`
  background-color: #bdbdbd;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
`;

const Icon = styled.svg`
  fill: #fff;
`;

const FixedButton = () => {
  return (
    <FixedButtonWrapper>
      <Button>
        <Icon viewBox="0 0 24 24" width="24" height="24">
          <path d="M...Z" /> {<ChatBubbleIcon/>}
        </Icon>
      </Button>
    </FixedButtonWrapper>
  );
};

export default FixedButton;
