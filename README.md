# Barber Shop API

## Descrição

Este projeto é uma API desenvolvida com [NestJS](https://nestjs.com), projetada para gerenciar as operações de uma barbearia. Ele oferece funcionalidades para:

- Consultar horários disponíveis.
- Agendar horários.
- Configurar dias de folga, dias trabalhados, horários de abertura e fechamento, além do horário de almoço.
- Disponibilizar módulos para construção de um front-end, incluindo título e imagens de banners.

O Swagger das APIs pode ser acessado no seguinte link: [Swagger UI](https://joaoferrazfs.github.io/swagguerUI/).

Este projeto utiliza as seguintes tecnologias:


![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803.svg?style=for-the-badge&logo=typeorm&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

- **NestJS**: Framework para construção de aplicações escaláveis e eficientes.
- **MySQL**: Banco de dados relacional para armazenar informações da barbearia.
- **Redis**: Sistema de armazenamento em cache para melhorar a performance da API.
- **Docker**: Para facilitar a configuração e execução da aplicação em contêineres.
- **Swagger**: Para documentação interativa e fácil acesso à API. O Swagger UI permite visualizar e testar todos os endpoints disponíveis diretamente pelo navegador.

## Instalação

```bash

# Builda containers
docker compose build

# Aciona containers
docker compose up -d

npm install

# Ambiente de desenvolvimento
npm run start

# Modo de desenvolvimento com hot-reload
npm run start:dev

# Ambiente de produção
npm run start:prod

# Testes unitários
npm run test

# Testes de integração (e2e)
npm run test:e2e
