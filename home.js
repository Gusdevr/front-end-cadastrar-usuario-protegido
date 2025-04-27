const API_URL = 'https://apicadastrarusu-rioprotegido-production.up.railway.app';

// Mostrar nome do usuário
const email = localStorage.getItem('email');

if (!email) {
  alert('Você precisa estar logado!');
  window.location.href = 'index.html';
} else {
  const nome = email.split('@')[0]; // Pegando o nome do email
  document.getElementById('titulo').textContent = `Bem-vindo(a), ${nome}!`;
}

// Listar usuários
const listarUsuariosBtn = document.getElementById('listarUsuarios');
const listaUsuarios = document.getElementById('listaUsuarios');

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
