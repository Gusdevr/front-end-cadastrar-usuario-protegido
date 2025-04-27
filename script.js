const API_URL = 'https://apicadastrarusu-rioprotegido-production.up.railway.app'; // sua API Railway!

const userForm = document.getElementById('userForm');
const listarUsuariosBtn = document.getElementById('listarUsuarios');
const listaUsuarios = document.getElementById('listaUsuarios');

// Cadastrar usuário
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

// Listar usuários
listarUsuariosBtn.addEventListener('click', async () => {
  listaUsuarios.innerHTML = ''; // limpa lista antes de listar de novo

  try {
    const response = await fetch(`${API_URL}/usuarios`);
    const usuarios = await response.json();

    usuarios.forEach(usuario => {
      const li = document.createElement('li');
      li.textContent = `Nome: ${usuario.nome} | Email: ${usuario.email}`;
      listaUsuarios.appendChild(li);
    });

  } catch (error) {
    alert('Erro ao listar usuários');
    console.error(error);
  }
});
