import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

// 1 param recurso que quero mockar
jest.mock('react-router-dom', () => {
  return {
    // jest.fn cria uma função vazia, só pra mocar mesmo a funcao do useHistory
    // useHistory: jest.fn(),
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

jest.mock('../../hooks/ToastContext', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

// describe('SignIn Page', () => {
//   // limpar a instancia
//   beforeEach(() => {
//     mockedHistoryPush.mockClear();
//   });

//   // cada IT um teste
//   it('Should be able to sign in', async () => {
//     // renderizar a page de signIn, para te acesso a ela
//     const { getByPlaceholderText, getByText } = render(<SignIn />);

//     // recuperando o elemento
//     const emailField = getByPlaceholderText('E-mail');
//     const passwordField = getByPlaceholderText('Senha');
//     const buttonElement = getByText('Entrar');

//     // FireEvent simula o evento do usuário com o app
//     // preenche email e senha
//     fireEvent.change(emailField, { target: { value: 'teste@teste.com' } });
//     fireEvent.change(passwordField, { target: { value: '123456' } });

//     fireEvent.click(buttonElement);

//     // wait executa o expect varias vezes, até passar, porem com timeout
//     await wait(() => {
//       expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
//     });
//   });
// });

describe('SignIn Page', () => {
  // cada IT um teste
  it('Should not be able to sign in with invalid credentials', async () => {
    // renderizar a page de signIn, para te acesso a ela
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    // recuperando o elemento
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    // FireEvent simula o evento do usuário com o app
    // preenche email e senha
    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    // wait executa o expect varias vezes, até passar, porem com timeout
    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });
});

describe('SignIn Page', () => {
  // reescrevendo a implementacao da funcao mockedSignIn que antes era vazia
  mockedSignIn.mockImplementation(() => {
    throw new Error();
  });

  // cada IT um teste
  it('Should display an error if login fails', async () => {
    // renderizar a page de signIn, para te acesso a ela
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    // recuperando o elemento
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    // FireEvent simula o evento do usuário com o app
    // preenche email e senha
    fireEvent.change(emailField, { target: { value: 'teste@teste.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    // wait executa o expect varias vezes, até passar, porem com timeout
    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
