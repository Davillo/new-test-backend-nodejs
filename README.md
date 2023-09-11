
### Download e Instalação

Para executar o projeto é necessário Node.js , NPM, MongoDB , uma conta na AWS e o Postman instalado para as rotas.

1. Comece fazendo o clone deste repositório:

```bash
git clone <git@github.com:Davillo/new-test-backend-nodejs.git>
```

2. Acesse a pasta do repositório e instale as dependências usando o NPM:

```bash
npm install
```

3. Crie uma cópia do arquivo **.env.example** e renomeie para **.env**.

4. Abra o **.env** e preencha com as variáveis de ambiente.

5. Execute usando o script de dev:

```bash
npm run dev
```

Se tudo estiver ok, o a aplicação irá iniciar e avisar a porta em que está rodando: Listening on "3001"

### Docs

Se encontram em /docs , na raíz do projeto. Basta importar o arquivo de collection no POSTMAN e verificar payloads e formatos de request para CATEGORIA E PRODUTOS.

### Techs

- Node.js
- Express
- MongoDB 
- AWS
- Yup
- Postman