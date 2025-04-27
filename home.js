// Decodificar o token para pegar o nome
function parseJwt (token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }
  
  const token = localStorage.getItem('token');
  
  if (!token) {
    alert('Você precisa estar logado!');
    window.location.href = 'index.html';
  } else {
    const payload = parseJwt(token);
    const nomeUsuario = payload.email.split('@')[0]; // Simples: pega antes do @
  
    document.getElementById('nomeUsuario').textContent = `Bem-vindo(a), ${nomeUsuario}!`;
  }
  