import styled from 'styled-components';
import color from 'utils/color';

export const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const Reset = styled.button`
  width: 2rem;
  height: 1.5rem;

  position: absolute;
  top: 0;
  bottom: 0.25rem;
  right: 0;
  margin: auto;

  background: none;

  &:before {
    content: '×';
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 0.5rem;
  border: solid 1px ${color('border')};
  border-radius: 0;

  &:focus {
    outline: none;
  }
`;
