# Cadastro Pilotos

Esse projeto é um formulário interativo, desenvolvido como parte da atividade formativa (AVD1) da disciplina Linguagem de Programação Web II (LPW2).

Em vez de só fazer uma página simples que valida o CEP, decidi criar um "Cadastro para Pilotos", onde o usuário pode colocar Nome, Equipe, CEP, Logradouro, Número e UF e o site um por um.

## Objetivo Principal

O objetivo principal foi implementar validações em **JavaScript** utilizando Expressões Regulares, garantindo a integridade dos dados inseridos antes do envio.

## Features e Diferenciais
Além dos requisitos acadêmicos, adicionei algumas coisinhas a mais ao projeto:
* **Autopreenchimento de Endereço (ViaCEP):** Minha primeira interação com APIs. Utilizei 'async/await' e 'fetch' para buscar e validar o CEP digitado. Após o validamento, o sistema preenche a rua (logradouro), cidade e estado.
* **Feedback Visual:** Campos com bordas verdes ou vermelhas dependendo da validação e mensagens, substituindo os 'alerts'.
* **Modal de Sucesso:** Modal customizado no CSS confirmando os dados do piloto cadastrado.

## Requisitos Técnicos Atendidos (Enunciado)
- [x] CEP obrigatório com máscara (`/(\d{5})(\d)/`).
- [x] Logradouro com mínimo de 5 caracteres.
- [x] Número restrito a dígitos numéricos (`/^\d+$/`).
- [x] UF validada para aceitar apenas 2 letras maiúsculas (`/^[A-Z]{2}$/`).
- [x] Interceptação de formulário com `addEventListener` e `preventDefault()`.
