import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  display: flex;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }
  }
`;

export const Address = styled.div`
  display: flex;
  flex-direction: row;
  background: #f0c;
`;
