# Projeto Orange Juice Hackathon - API em Node.js, Express e PostgreSQL
Bem-vindo ao repositório oficial da API desenvolvida durante a participação no hackathon Orange Juice! Este projeto foi concebido como parte de uma colaboração envolvendo uma equipe de cinco pessoas, incluindo o criador deste repositório.
## Visão Geral
O objetivo principal desta API é fornecer suporte robusto para o front-end de nossa aplicação, que também foi desenvolvida como parte deste hackathon. Desenvolvida em Node.js, Express e utilizando PostgreSQL como banco de dados, a API atua como uma ponte essencial entre o cliente e o servidor.
## Estrutura do Repositório
Este repositório contém o código fonte da API, enquanto o front-end está armazenado em um repositório separado. A separação destes permite uma melhor organização e modularidade do código, facilitando o trabalho em equipe e a manutenção a longo prazo.
## Integração e Deploy
A API está atualmente integrada ao front-end que já está em andamento na Vercel, fornecendo funcionalidades cruciais para uma experiência do usuário fluida. Além disso, a API foi implantada na plataforma OnRender para garantir um ambiente de produção estável e confiável.

Este README fornece informações essenciais para começar a trabalhar com a API, incluindo instruções de instalação, configuração e utilização. Sinta-se à vontade para explorar o código fonte e contribuir para o crescimento e aprimoramento contínuo deste projeto.
# Instruções de Instalação
Siga os passos abaixo para configurar e executar localmente a API em sua máquina:

## Pré-requisitos
Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:
- Node.js - versão 18 ou superior
- npm (gerenciador de pacotes do Node.js)
- PostgreSQL - certifique-se de ter um banco de dados PostgreSQL disponível ( nesse repositório está disponivel um dump.sql para isso )
---
1. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git cd nome-do-repositorio
```

2. Instale as dependências
```
npm install
```

3. Configure as variaveis de ambientes

Crie um arquivo .env na raiz do projeto e configure as variáveis de ambiente necessárias. Consulte o arquivo .env.example para referência.

4. Inicie o servidor local
```
npm run dev
```

## Testando a instalação 
Para verificar se a instalação foi bem-sucedida, abra seu navegador ou utilize uma ferramenta como Postman ou Insomnia para realizar uma solicitação HTTP para a rota de teste (baseUrl), por exemplo:
```
GET http://localhost:3000/
```

# Rotas

<details>
<summary><b>Cadastrar usuário</b></summary>

#### `GET` `/`

Essa é a rota que será utilizada para testar a API.

Retorno:
```
{
	"mensagem": "O servidor está online."
}
```
</details>

<details>
<summary><b>Cadastrar usuário</b></summary>

#### `POST` `/user`

Essa é a rota que permite o usuário se cadastrar no sistema.

Critérios de aceite:

    - Validar se o e-mail e a senha estão corretos para o usuário em questão.
    - Gerar um token de autenticação para o usuário.
    - Confere se o e-mail já existe no sistema.
    - fullName, email, password são campos obrigatórios e precisam ser do tipo string.

</details>

<details>
<summary><b>Efetuar login</b></summary>

#### `POST` `/session`

Essa é a rota que será utilizada para o usuário cadastrado no sistema efetuar seu login.

Critérios de aceite:

    - Validar os campos obrigatórios: 
        - nome
        - email
        - senha
    - A senha deve ser criptografada utilizando algum algoritmo de criptografia confiável.
    - O campo e-mail no banco de dados deve ser único para cada registro, não permitindo dois usuários possuírem o mesmo e-mail.

</details>

<details>
<summary><b>Efetuar login com o Google</b></summary>

#### `POST` `/session/google`

Essa é a rota que será utilizada para o usuário efetuar login através de sua conta do Google.

Critérios de aceite:

    - Validar os campos obrigatórios: 
        - nome
        - email
        - senha
    - A senha deve ser criptografada utilizando algum algoritmo de criptografia confiável.
    - O campo e-mail no banco de dados deve ser único para cada registro, não permitindo dois usuários possuírem o mesmo e-mail.

</details>
<details>
<summary><b>Efetuar upload de arquivos</b></summary>

#### `POST` `/upload`

Essa é a rota que será utilizada pelo o front para efetuar o upload de imagens.

</details>
<details>
<summary><b>Obter perfil do usuário logado</b></summary>

#### `GET` `/user/profile`

Essa é a rota que será utilizada para obter todas as informações do usuário logado desde o seu perfil a projetos cadastrados em seu nome.

Exemplo de retorno:

```
{
	"userid": 4,
	"fullname": "Jose",
	"email": "Jose01@email.com",
	"profileimage": null,
	"isgoogleaccount": null,
	"projects": [
		{
			"id": 2,
			"title": "teste 02",
			"tags": "teste tags",
			"link": "teste link",
			"description": "teste",
			"image": null,
			"createddate": null
		}
	]
}
```

</details>
<details>
<summary><b>Cadastrar projetos</b></summary>

#### `POST` `/projects`

Essa é a rota que será utilizada para o usuário cadastrar o seu projeto.

Critérios de aceite:

    - Validar os campos obrigatórios: 
        - title
        - tags
    - Todos os campos devem ser do tipo string.

</details>
<details>
<summary><b>Obter todos os projetos</b></summary>

#### `GET` `/projects`

Essa é a rota que será utilizada para obter todos os projetos existentes no sistema.

Exemplo de retorno:

```
[
	{
		"id": 1,
		"title": "API REST",
		"tags": "Back-end, TDD",
		"link": null,
		"description": null,
		"image": null,
		"createddate": null,
		"userid": 1,
		"user": {
			"fullname": "Carlos Wylliam",
			"email": "carlos01@email.com",
			"profileImage": null,
			"isGoogleAccount": null
		}
	},
	{
		"id": 3,
		"title": "API REST 03",
		"tags": "Back-end, TDD",
		"link": null,
		"description": null,
		"image": null,
		"createddate": null,
		"userid": 1,
		"user": {
			"fullname": "Carlos Wylliam",
			"email": "carlos01@email.com",
			"profileImage": null,
			"isGoogleAccount": null
		}
	}
]
```

</details>
<details>
<summary><b>Atualizar/Editar Projeto</b></summary>

#### `PUT` `/projects/:id`

Essa é a rota que será utilizada pelo o usuário para atualizar/editar o seu projeto.

Critérios de aceite:

    - Validar os campos obrigatórios: 
        - title
        - tags
        - senha

</details>
<details>
<summary><b>Deletar projeto</b></summary>

#### `DELETE` `/projects/:id`

Essa é a rota que será utilizada para deletar algum projeto cadastrado no sistema pelo o seu id.

</details>

<table>
  <tr>
    <td align="center" style="padding: 10px;">
      <img src=""/>
       <br>
        <sub>
          <b>Álvaro Garcia</b>
          <p> <a href="https://www.linkedin.com/in/" ><img src="https://img.icons8.com/color/38/000000/linkedin.png"/></a> <a href="https://github.com/"><img src="https://img.icons8.com/ios-glyphs/38/000000/github.png"/></a>
        </sub>
      </a>
    </td>
    <td align="center" style="padding: 10px;">
       <img src=""/>
      <br>
        <sub>
          <b>Carlos Wylliam</b>
          <p> <a href="https://www.linkedin.com/in/"><img src="https://img.icons8.com/color/38/000000/linkedin.png"/></a> <a href="https://github.com/"><img src="https://img.icons8.com/ios-glyphs/38/000000/github.png"/></a>
        </sub>
      </a>
    </td>
    <td align="center" style="padding: 10px;">
       <img src=""/>
      <br>
        <sub>
          <b>Mariana Moreira</b>
          <p> <a href="https://www.linkedin.com/in/mariana-moreira-santos-39417828a/" ><img src="https://img.icons8.com/color/38/000000/linkedin.png"/></a> <a href="https://github.com/mari-moreira"><img src="https://img.icons8.com/ios-glyphs/38/000000/github.png"/></a>
        </sub>
      </a>
    </td>
     <td align="center" style="padding: 10px;">
      <img src=""/>
   <br>
      <sub>
          <b>Ravena Campos</b>
          <p> <a href="https://www.linkedin.com/in/" ><img src="https://img.icons8.com/color/38/000000/linkedin.png"/></a> <a href="https://github.com/"><img src="https://img.icons8.com/ios-glyphs/38/000000/github.png"/></a>
        </sub>
      </a>
    </td>
    <td align="center" style="padding: 10px;">
      <img src=""/>
        <br>
        <sub>
          <b>Vinícius Soares</b>
          <p> <a href="https://www.linkedin.com/in/" ><img src="https://img.icons8.com/color/38/000000/linkedin.png"/></a> <a href="https://github.com/"><img src="https://img.icons8.com/ios-glyphs/38/000000/github.png"/></a>
        </sub>
      </a>
    </td>
</tr>
</table>
