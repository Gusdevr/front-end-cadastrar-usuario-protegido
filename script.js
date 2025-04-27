const API_URL = 'https://apicadastrarusu-rioprotegido-production.up.railway.app';

const userForm = document.getElementById('userForm');
const loginForm = document.getElementById('loginForm');

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
      alert('Usuário cadastrado com sucesso! Agora faça o login.');
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
      localStorage.setItem('email', email); // 👉 salvar email também
      window.location.href = 'home.html'; // 👉 vai para a HOME!
    } else {
      alert(`Erro: ${data.mensagem}`);
    }
  } catch (error) {
    alert('Erro ao fazer login');
    console.error(error);
  }
});
