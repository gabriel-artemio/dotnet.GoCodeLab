# 🐰 RabbitMQ com .NET 8 - Processamento Assíncrono

Este projeto demonstra o uso de RabbitMQ com .NET 8 utilizando uma arquitetura simples de Producer + Consumer.

## 📦 Tecnologias utilizadas
* .NET 8 Web API
* Worker Service
* RabbitMQ
* Docker

## 🧠 Arquitetura
* API (Producer) → envia pedidos para a fila
* Worker (Consumer) → consome e processa pedidos
 
## 🚀 Como executar o projeto

### 1️⃣ Subir o RabbitMQ com Docker
* docker-compose up -d

* Acesse o painel:
*  http://localhost:15672 | Login: guest / guest

### 2️⃣ Executar a API

* cd Producer
* dotnet run

### 3️⃣ Executar o Worker
* cd src/Order.Worker
* dotnet run

## 📬 Testando a API
Endpoint:
POST /api/orders
````
Exemplo de body:
{
  "product": "Notebook",
  "price": 3500
}
````
## 🔄 Fluxo

* API recebe pedido
* Publica na fila "orders"
* Worker consome a mensagem
* Pedido é processado

## 📌 Melhorias futuras
* Persistência com banco de dados
* Autenticação JWT


## 👨‍💻 Autor
Projeto desenvolvido para estudo de mensageria com RabbitMQ e .NET.

## ⭐ Objetivo
Demonstrar comunicação assíncrona e desacoplamento entre serviços.
