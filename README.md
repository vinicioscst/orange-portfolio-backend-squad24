# Programa Orange Juice Hackathon - V5.0 | Squad-24 | Back-end

<p align="center">
  <img alt="Favicon" width='30%' src="https://github.com/vinicioscst/orange-portfolio-frontend-squad24/blob/main/src/assets/logo.svg"  />
</p>


Bem-vindo ao repositório oficial da API desenvolvida durante a participação no hackathon Orange Juice! Este projeto foi concebido como parte de uma colaboração envolvendo uma equipe de cinco pessoas, incluindo o criador deste repositório.

👩‍💻 Acesse a aplicação aqui 👉 [Orange Portfólio](https://orange-portfolio-frontend-squad24.vercel.app/)

👩‍💻 Deploy da API 👉 [API](https://hackathon-squad24.onrender.com/)

👩‍💻 Deploy da API 👉 [Documentação Swagger](https://hackathon-squad24.onrender.com/api-docs/#/)

<hr>

- [1. O Projeto](#1-o-projeto)
- [2. A API](#2-a-api)
- [3. Estrutura do Repositório](#3-estrutura-do-repositório)
- [4. Integração e Deploy](#4-integração-e-deploy)
- [5. Instruções de Instalação](#5-instruções-de-instalação)
  - [5.1. Pré-requisitos](#51-pré-requisitos)
  - [5.2. Testando a instalação](#52-testando-a-instalação)
- [6. Rotas](#6-rotas)
- [7. Conheça a Squad-24!](#7-conheça-a-squad-24)

## 1. O Projeto

O Orange Portifólio é uma plataforma única que reúne os melhores talentos de desenvolvimento e design em um só lugar.
Desenvolvida com React.js e utilizando a API desenvolvida em Node.js, Express e PostgreSQL, a aplicação oferece ótimo desempenho e fácil manutenção.
Além da possibilidade de cadastrar e buscar projetos, incluímos algumas funcionalidades, como checkbox de requisitos de senha e darkmode.

  👉 [Figma do projeto](https://www.figma.com/file/utDx59m5Opz1lDSN1J4r9I/Desafio---Programa-de-Forma%C3%A7%C3%A3o-5.0?type=design&node-id=171-2351&mode=design&t=e2CL8emjA2XPacJ9-0)

  👉 [Repositório do Front-end](https://github.com/vinicioscst/orange-portfolio-frontend-squad24)

## 2. A API

O objetivo principal desta API é fornecer suporte robusto para o front-end de nossa aplicação, que também está em desenvolvimento como parte deste hackathon. Desenvolvida em Node.js, Express e utilizando PostgreSQL como banco de dados, a API atua como uma ponte essencial entre o cliente e o servidor.


## 3. Estrutura do Repositório
Este repositório contém o código fonte da API, enquanto o front-end está armazenado em um repositório separado. A separação destes permite uma melhor organização e modularidade do código, facilitando o trabalho em equipe e a manutenção a longo prazo.

## 4. Integração e Deploy
A API está atualmente integrada ao front-end em andamento, fornecendo funcionalidades cruciais para uma experiência do usuário fluida. Além disso, a API foi implantada na plataforma OnRender para garantir um ambiente de produção estável e confiável.

Este README fornece informações essenciais para começar a trabalhar com a API, incluindo instruções de instalação, configuração e utilização. Sinta-se à vontade para explorar o código fonte e contribuir para o crescimento e aprimoramento contínuo deste projeto.


## 5. Instruções de Instalação
Siga os passos abaixo para configurar e executar localmente a API em sua máquina:

### 5.1. Pré-requisitos
Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:
- Node.js - versão 12 ou superior
- npm (gerenciador de pacotes do Node.js)
- PostgreSQL - certifique-se de ter um banco de dados PostgreSQL disponível ( nesse repositório está disponivel um dump.sql para isso )
---
1. Clone o Repositório
```bash
git clone https://github.com/vinicioscst/orange-portfolio-backend-squad24.git cd orange-portfolio-backend-squad24
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

### 5.2. Testando a instalação 
Para verificar se a instalação foi bem-sucedida, abra seu navegador ou utilize uma ferramenta como Postman ou Insomnia para realizar uma solicitação HTTP para a rota de teste (baseUrl), por exemplo:
```
GET http://localhost:3000/
```

## 6. Rotas

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

## 7. Conheça a Squad-24!

<table>
  <tr>
    <td align="center" style="padding: 10px;">    
      <img src="https://github.com/Alvarosig.png" width="250px"/>
       <br>
        <sub>
          <b>Álvaro Garcia</b>
          <p> <a target="_blank" href="https://www.linkedin.com/in/alvarosig" ><img src="https://img.icons8.com/color/38/000000/linkedin.png"/></a> <a target="_blank" href="https://github.com/Alvarosig"><img src="https://img.icons8.com/ios-glyphs/38/000000/github.png"/></a>
        </sub>
      </a>
  <p>Frontend Developer</p>
    </td>
    <td align="center" style="padding: 10px;">
       <img src="https://github.com/carlos-wylliam.png" width="250px"/>
      <br>
        <sub>
          <b>Carlos Wylliam</b>
          <p> <a target="_blank" href="https://www.linkedin.com/in/carlos-wylliam"><img src="https://img.icons8.com/color/38/000000/linkedin.png"/></a> <a target="_blank" href="https://github.com/carlos-wylliam"><img src="https://img.icons8.com/ios-glyphs/38/000000/github.png"/></a>
        </sub>
      </a>
  <p>Backend Developer</p>
    </td>
    <td align="center" style="padding: 10px;">
       <img src="https://github.com/mari-moreira.png" width="250px"/>
      <br>
        <sub>
          <b>Mariana Moreira</b>
          <p> <a target="_blank" href="https://www.linkedin.com/in/mariana-moreira-santos-39417828a/" ><img src="https://img.icons8.com/color/38/000000/linkedin.png"/></a> <a target="_blank" href="https://github.com/mari-moreira"><img src="https://img.icons8.com/ios-glyphs/38/000000/github.png"/></a>
        </sub>
      </a>
  <p>Backend Developer</p>
    </td>
     <td align="center" style="padding: 10px;">
      <img src="https://github.com/ravenascampos.png" width="250px"/>
   <br>
      <sub>
          <b>Ravena Campos</b>
          <p> <a target="_blank" href="https://www.linkedin.com/in/ravenascampos" ><img src="https://img.icons8.com/color/38/000000/linkedin.png"/></a> <a target="_blank" href="https://github.com/ravenascampos"><img src="https://img.icons8.com/ios-glyphs/38/000000/github.png"/></a>
        </sub>
      </a>
    <p>Frontend Developer | PO</p>
    </td>
    <td align="center" style="padding: 10px;">
      <img src="https://github.com/vinicioscst.png" width="250px"/>
        <br>
        <sub>
          <b>Vinícios Soares</b>
          <p> <a target="_blank" href="https://www.linkedin.com/in/vinicioscst" ><img src="https://img.icons8.com/color/38/000000/linkedin.png"/></a> <a target="_blank" href="https://github.com/vinicioscst"><img src="https://img.icons8.com/ios-glyphs/38/000000/github.png"/></a>
        </sub>
      </a>
      <p>FullStack Developer</p>
    </td>
