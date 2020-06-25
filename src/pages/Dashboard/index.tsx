import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import ReactLoading from 'react-loading';

import { FiPower, FiSearch, FiPlus, FiTrash, FiEdit2 } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import api from '../../service/api';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Avatar,
  Content,
  ItemList,
  ItemInfo,
  Search,
  ItemActions,
} from './styles';

import Input from '../../components/input/index';
import { useAuth } from '../../hooks/auth';

interface Client {
  id?: string;
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { signOut } = useAuth();
  const [search, setSearch] = useState<string>('');

  const loadClients = useCallback(async () => {
    try {
      const { data } = await api.get('/users');
      setClients(data);
      setLoading(false);
    } catch (error) {
      console.log('erro ao carregar', error);
    }
  }, []);

  const handleDelete = useCallback(async (id) => {
    try {
      await api.delete(`/users/${id}`);
      loadClients();
    } catch (error) {
      console.log('DEU ERRO DELETE', error);
    }
  }, []);

  const handleSubmitSearch = useCallback(async () => {
    console.log('search', search);

    if (search !== '' && search.length > 3) {
      try {
        const response = await api.get('/users', {
          params: {
            q: search,
          },
        });
        console.log('SEARCH', response.data);
        setClients(response.data);
      } catch (error) {
        console.log('DEU ERRO DELETE', error);
      }
    } else {
      loadClients();
    }
  }, [search, loadClients]);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <span>CadCli</span>
          <Profile>
            <Avatar>
              <span>MF</span>
            </Avatar>

            <div>
              <span>Bem-vindo,</span>
              <strong>Teste</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Search>
          <Form ref={formRef} onSubmit={handleSubmitSearch}>
            <Input
              onChange={(event) => setSearch(event.target.value)}
              name="pesquisar"
              placeholder="Pesquisar"
              icon={FiSearch}
            />
          </Form>
          <button type="submit" style={{ width: 100 }}>
            Pesquisar
          </button>

          <button type="button" onClick={() => history.push('/signup')}>
            <FiPlus />
          </button>
        </Search>

        {loading ? (
          <ReactLoading
            type="bubbles"
            color="#ff9000"
            height="15%"
            width="15%"
          />
        ) : (
          <>
            {clients.map((client) => (
              <ItemList>
                <ItemInfo>
                  <Avatar>
                    <span>MF</span>
                  </Avatar>
                  <div>
                    <span>{client.name}</span>
                    <span>{client.email}</span>
                    <span>Paranavaí-PR</span>
                  </div>
                </ItemInfo>
                <ItemActions>
                  <button
                    type="button"
                    // onClick={() => history.push('/signup', client)}
                    onClick={() =>
                      history.push({ pathname: '/signup', state: client })
                    }
                  >
                    <FiEdit2 />
                  </button>
                  <button type="button" onClick={() => handleDelete(client.id)}>
                    <FiTrash />
                  </button>
                </ItemActions>
              </ItemList>
            ))}
          </>
        )}
      </Content>
    </Container>
  );
};

export default Dashboard;
