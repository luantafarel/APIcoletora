### Componentes do sistema

- Todo o sistema foi desenovlvido em NodeJs, usando pacotes como:
 - Boom: Pacote usado para formatar os erros a serem retornados.
 - HapiJs: Um framework usado para configurar o servidor, usado por que eu estou acostumado a trabalhar com o mesmo.
 - Bluebird: Usado para promissificar funções e percorrer arrays.
 - sequelize: Usado para gerenciar os acessos ao banco de dados desenvolvido em PSQL

#Configuração
- O sistema pode ser configurado seguindo os seguintes passos.
- Instalando o NodeJs na versão 9.3.0
- Instalando postgrees e criando o host local
- Use npm install no projeto para instalar as dependencias.
- Use o comando  npm run migrate
	- Esse comando irá rodar a migração e criar as tabelas necessárias para a primeira tarefa.
- Para rodar o server existem duas possibilidades.
	- Usando npm start
	 - Use npm run delete para interromper o server efetivamente.
- Usando o debug do vscode.


Tasks
=============
## Desenvolver um sistema de auto complete.
-------------
##### API Coletora

- Você deverá construir uma API para coletar e armazenar os dados. Esta API deverá
receber informações de navegação dos usuários em um site.

Os endpoints 

localhost:3000/api/v1/products/create (recebe um objeto)
localhost:3000/api/v1/products/bulk (recebe um array de objetos)

São os endpoints responsáveis por criar as informações de navegação de usuários.

O endpoint
localhost:3000/api/v1/products
Lista todas as ações, esse endpoint pode ser usado juntamente com o parametro como no exemplo
localhost:3000/api/v1/products?search=string_de_busca
Para testar o auto complete, espera-se que os resultados da busca sejam strings que correspondam com o inicio da string_de_busca.

 ####Ex:

![](https://i.ibb.co/CsJgc1M/photo-2019-06-06-20-12-09.jpg)
> All objects stored in db

![](https://i.ibb.co/F81jQNp/photo-2019-06-06-20-18-02.jpg)
> An successful autocomplete search

![](https://i.ibb.co/vZtHkkJ/photo-2019-06-06-20-18-05.jpg)
> Resultado de nenhum match com o autocomplete

=============
## Desenvolver um sistema de manipulação de manipulação dos registros disponíveis no endpoint https://storage.googleapis.com/dito-questions/events.json
-------------
##### Manipulation

- Você deve implementar uma função, em qualquer linguagem de programação, que
consuma esse endpoint e agrupe as compras pelo campo transaction_id. Cada
item da timeline deve representar uma compra em uma determinada loja e deve
conter uma lista com os produtos comprados. A timeline deve ser ordenada pelo campo timestamp na ordem decrescente.

O sistema funciona adquirindo diretamente do endpoint no enunciado e trabalhando o dado para que possa ser retornado.

Não faz diferença da ordem que os dados chegam.


![](https://i.ibb.co/vQbB9DG/photo-2019-06-06-20-28-45.jpg)
> Um exemplo de execução com sucesso



