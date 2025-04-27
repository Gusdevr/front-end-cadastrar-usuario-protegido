const API_URL = 'https://apicadastrarusu-rioprotegido-production.up.railway.app';

const userForm = document.getElementById('userForm');
const loginForm = document.getElementById('loginForm');
const listarUsuariosBtn = document.getElementById('listarUsuarios');
const listaUsuarios = document.getElementById('listaUsuarios');

// Cadastro de usuário
userForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email, senha })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Usuário cadastrado com sucesso!');
      userForm.reset();
    } else {
      alert(`Erro: ${data.erro}`);
    }
  } catch (error) {
    alert('Erro ao cadastrar usuário');
    console.error(error);
  }
});

// Login de usuário
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('emailLogin').value;
  const senha = document.getElementById('senhaLogin').value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      alert('Login realizado com sucesso!');
      loginForm.reset();
    } else {
      alert(`Erro: ${data.mensagem}`);
    }
  } catch (error) {
    alert('Erro ao fazer login');
    console.error(error);
  }
});

// Listar usuários
listarUsuariosBtn.addEventListener('click', async () => {
  listaUsuarios.innerHTML = '';

  const token = localStorage.getItem('token');

  if (!token) {
    alert('Você precisa estar logado para listar os usuários!');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.mensagem || 'Erro desconhecido');
    }

    const usuarios = await response.json();

    usuarios.forEach(usuario => {
      const li = document.createElement('li');
      li.textContent = `Nome: ${usuario.nome} | Email: ${usuario.email}`;
      listaUsuarios.appendChild(li);
    });

  } catch (error) {
    alert(`Erro ao listar usuários: ${error.message}`);
    console.error(error);
  }
});
