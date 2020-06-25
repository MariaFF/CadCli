import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  flex-direction: column;
  display: flex;
`;

export const Content = styled.main`
  margin: 64px auto;
  flex-direction: column;
  display: flex;
  width: 100%;
  align-items: center;

  button {
    background: #ff9000;
    height: 45px;
    width: 45px;
    border-radius: 8px;
    border: 0;
    margin-left: 8px;
  }
`;

export const Header = styled.div`
  padding: 32px;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  button {
    margin-left: auto;
    background: transparent;
    border: 0;
  }

  svg {
    color: #999591;
    width: 20px;
    height: 20px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    strong {
      color: #ff9000;
    }
  }
`;

export const Avatar = styled.div`
  display: flex;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #ff9000;
  align-items: center;
  justify-content: center;
`;

export const Search = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

export const ItemList = styled.div`
  display: flex;
  width: 50%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 8px;
  background: #424242;
  border-radius: 8px;
  margin-top: 16px;
`;

export const ItemInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
  }
`;

export const ItemActions = styled.div`
  display: flex;
  flex-direction: row;

  button {
    background: #ff9000;
    height: 30px;
    width: 30px;
    border-radius: 8px;
    border: 0;
    margin-left: 8px;
    align-items: center;
  }

  svg {
    color: #fff;
  }
`;
