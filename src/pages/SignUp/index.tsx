import React, { useCallback, useRef } from 'react';
import { FiUser, FiMail, FiLock, FiCreditCard, FiMapPin } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory, useLocation } from 'react-router-dom';

import api from '../../service/api';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Address } from './styles';

import Input from '../../components/input/index';
import Button from '../../components/button/index';

interface Client {
  id?: number;
  name: string;
  cpf: string;
  email: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  localidade: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const location = useLocation<Client>();
  const { state } = location;

  console.log('PROPPPPPS', state);

  // Nome, CPF, Email, CEP, logradouro, Número, Bairro e localidade

  const handleSubmit = useCallback(
    async (data: Client) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          cpf: Yup.string().required('Cpf obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
          cep: Yup.string().required('Cep obrigatório'),
          logradouro: Yup.string().required('logradouro obrigatória'),
          numero: Yup.string().required('Número obrigatório'),
          bairro: Yup.string().required('Bairro obrigatório'),
          localidade: Yup.string().required('localidade obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        console.log('STATE', state);
        if (state) {
          await api.put(`/users/${state.id}`, data);
        } else {
          await api.post('/users', data);
        }
        history.goBack();
      } catch (error) {
        console.log('ERRORS', error);
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);
      }
    },
    [history, state],
  );

  return (
    <Container>
      <Content>
        <Form
          initialData={{
            email: state?.email,
            name: state?.name,
            cpf: state?.cpf,
            cep: state?.cep,
            logradouro: state?.logradouro,
            numero: state?.numero,
            bairro: state?.bairro,
            localidade: state?.localidade,
          }}
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <h1>Faça seu cadastro</h1>

          {/* Nome, CPF, Email, CEP, logradouro, Número, Bairro e localidade */}

          <Input name="name" placeholder="Nome" icon={FiUser} />
          <Input name="cpf" placeholder="000.000.000-00" icon={FiCreditCard} />
          <Input name="email" placeholder="E-mail" icon={FiMail} />
          <Input name="cep" placeholder="CEP" icon={FiMapPin} />

          <Input name="logradouro" placeholder="Rua" icon={FiMapPin} />
          <Input name="numero" placeholder="Nº" icon={FiMapPin} />

          <Input name="bairro" placeholder="Bairro" icon={FiMapPin} />
          <Input name="localidade" placeholder="Cidade" icon={FiMapPin} />

          <Button type="submit">{state ? 'Alterar' : 'Cadastrar'}</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SignUp;
