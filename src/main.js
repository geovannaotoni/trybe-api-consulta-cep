import './style.css';
import Swal from 'sweetalert2/dist/sweetalert2.min';
import '@sweetalert2/theme-dark/dark.css';

const consultBtn = document.getElementById('consult');
const input = document.getElementsByTagName('input')[0];
const p = document.getElementsByTagName('p')[0];

consultBtn.addEventListener('click', async () => {
  try {
    const apiURL = `https://viacep.com.br/ws/${input.value}/json/`;
    const response = await fetch(apiURL);
    const data = await response.json();
    if (data.logradouro) {
      p.innerHTML = `${data.logradouro},
      Bairro ${data.bairro}, ${data.localidade} - ${data.uf},
      DDD ${data.ddd}`;
    } else {
      throw new Error('CEP não encontrado');
    }
  } catch (error) {
    Swal.fire({
      title: 'Ops...',
      text: 'CEP não encontrado!',
      icon: 'error',
      confirmButtonText: 'OK',
    });
    p.innerHTML = error.message;
  }
});

/*
outra forma:
try {
    const result = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await result.json();

    if (data.erro) throw new Error('Erro de cep inválido');

    preEl.innerHTML = JSON.stringify(data);
    console.log(data);
    return data;
  } catch (error) {
    Swal.fire('Ops', error.message, 'error');
  }
*/
