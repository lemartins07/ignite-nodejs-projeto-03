# App

Gympass style app.

## RFs (Requisitos Funcionais)
- [ ] Deve ser possível se cadastrar; 
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de checkins pelo usuário logado;
- [ ] Deve ser possível o usuário obter o seu histórico de checkins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de Negócio)

- [ ] O usuário não pode se cadastrar com um e-mail duplicado;
- [ ] o usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] o usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] o check-in só pode ser validado até 20 minutos após ser criado;
- [ ] o check-in só pode ser validado por administradores; 
- [ ] a academia só pode ser cadastradas por administradores;

## RNFs (Requisitos não funcionais)

- [ ] A senha do usuário precisa ser criptografada;
- [ ] Os dados da aplicação precisam ser persistidos em um banco PostgresSQL;
- [ ] Todas listas de dados precisam estar paginadas por 20 items por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token)