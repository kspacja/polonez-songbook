import styled from 'styled-components';
import color from 'utils/color';

export const Input = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 0.5rem;
  border: solid 1px ${color('border')};
  border-radius: 0;
  margin-bottom: 0.5rem;

  &::placeholder {
    font-size: 0.8rem;
  }
`;

export const Email = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: solid 1px ${color('border')};
  border-radius: 0;
  margin-bottom: 0.5rem;

  &::placeholder {
    font-size: 0.8rem;
  }
`;

export const Container = styled.div`
  width: 100%;
  padding: 1rem 0;
`;
