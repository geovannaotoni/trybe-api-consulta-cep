import { getAddress } from './main';
// getAddress = require('./main-teste');

describe('Quando a requisição é bem sucedida, ela retorna os dados esperados', () => {
  test('deve retornar os dados quando passamos um cep válido', async () => {
    const address = await getAddress('30130010');
    expect(address.cep).toBe('30130-010');
    expect(address.logradouro).toBe('Praça Sete de Setembro');
    expect(address.bairro).toBe('Centro');
    expect(address.uf).toBe('MG');
  });

  test('deve aceitar ceps com hífen ou sem hífen', async () => {
    let address = await getAddress('30130010');
    expect(address.cep).toBe('30130-010');

    address = await getAddress('30130-010');
    expect(address.cep).toBe('30130-010');
  });
});

describe('Quando a requisição é rejeitada, ela deverá retornar erro', () => {
  test('Lança o erro "Você precisa passar um CEP" quando passar cep vazio', async () => {
    const emptyCep = '';
    await expect(getAddress(emptyCep)).rejects.toThrow(new Error('CEP não encontrado!'));
  });
});
