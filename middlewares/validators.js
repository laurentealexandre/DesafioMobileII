const validateCliente = (req, res, next) => {
    const { nome, sobrenome, email, idade } = req.body;
  
    if (!nome || nome.length < 3 || nome.length > 255) {
      return res.status(400).json({ message: 'Nome inválido' });
    }
  
    if (!sobrenome || sobrenome.length < 3 || sobrenome.length > 255) {
      return res.status(400).json({ message: 'Sobrenome inválido' });
    }
  
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ message: 'Email inválido' });
    }
  
    if (!idade || idade < 0 || idade > 120) {
      return res.status(400).json({ message: 'Idade inválida' });
    }
  
    next();
  };
  
  const validateProduto = (req, res, next) => {
    const { nome, descricao, preco, data_atualizado } = req.body;
  
    if (!nome || nome.length < 3 || nome.length > 255) {
      return res.status(400).json({ message: 'Nome inválido' });
    }
  
    if (!descricao || descricao.length < 3 || descricao.length > 255) {
      return res.status(400).json({ message: 'Descrição inválida' });
    }
  
    if (!preco || preco <= 0) {
      return res.status(400).json({ message: 'Preço inválido' });
    }
  
    const dataMinima = new Date('2000-01-01');
    const dataMaxima = new Date('2024-06-20');
    const dataAtualizada = new Date(data_atualizado);
  
    if (!data_atualizado || dataAtualizada < dataMinima || dataAtualizada > dataMaxima) {
      return res.status(400).json({ message: 'Data inválida' });
    }
  
    next();
  };
  
  module.exports = {
    validateCliente,
    validateProduto
  };