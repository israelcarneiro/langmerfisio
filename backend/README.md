# Recuperação de Senha ✔

**RF**

- O usuário deve poder recuperar sua senha informando seu e-mail; ✔
- O usuário deve receber um e-amil com instruções de recuperação de senha; ✔
- O usuário deve poder resetar sua senha; ✔

**RNF**

- Utilizar Etheral para testar envios de e-mail em desenvolvimento; ✔
- Utilizar o Amazon SES para envios em produção; ✔
- O envio de e-mails deve acontecer em segundo plano ( background job ); ✔

**RN**

- O link enviado por e-mail para resetar senha, deve expirar em 2h; ✔
- O usuário precisa confimar a nova senha ao redefinir sua senha; ✔

# Atualização do Perfil ✔

**RF**
- O usuário deve poder atualizar seu nome, email e senha; ✔

**RN**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado por outro usuário; ✔
- Para atualizar sua senha o usuário deve informar a senha antiga; ✔
- Para atualizar sua senha o usuário deve confirmar sua nova senha; ✔

# Dashboard do Paciente

**RF**

- O paciente deve poder listar seus agendamentos;
- O paciente deve poder selecionar um agendamento para ver mais detalhes do mesmo;
- O paciente deve poder realizar um novo agendamento com um fisioterapeuta específico
- O paciente deve receber uma notificação sempre que houver um novo agendamento;

**RNF**

- Os agendamentos do paciente ser armazenados em cache;
- A push notification deve ser enviada através do FireBase;
- Ao selecionar um agendamento o paciente deve ser redirecionado para uma tela com os seguintes detalhes:
  - Data do agendamento, Horário, Nome do fisioterapeuta, Observações do agendamento
  - Um botão com a opção de cancelar um agendamento
- Ao clicar no botão de cancelar um agendamento o paciente deve ser redirecionado para uma tela de cancelamento de serviços
- Ao clicar no botão de realizar um agendamento o paciente deve ser redirecionado para uma tela de agendamento de serviços

**RN**
- O paciente não deve visualizar agendamentos que já passaram da data/horário atual;

  ## Agendamento de Serviços

**RF**

- O paciente deve poder listar todos os fisioterapeutas cadastrados;
- O paciente deve poder listar os dias de um mês com pelo menos horário disponível de um fisioterapeuta;
- O paciente deve poder listar horários disponíveis em dias específicos de um fisioterapeuta;

**RNF**

- A listagem de fisioterapeutas devem ser armazenada em cache

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (primeiras às 8h, último às 17h);
- O paciente não pode agendar em um horário já ocupado;
- O paciente não pode agendar em um horário que já passou;
- O paciente não pode agendar serviços consigo mesmo;

  ## Cancelamento de Serviços

**RF**
- O paciente deve poder cancelar um agendamento para um dia/horário e paciente específico;
- O fisioterapeuta deve receber uma notificação que o agendamento foi cancelado;

**RNF**
- A push notification deve ser enviada através do FireBase;

**RN**
- O paciente só pode cancelar um agendamento com no mínimo 3hrs de antecedência
- O paciente deve visualizar uma tela de confirmação do cancelamento



# Dashboard do Fisioterapeuta

**RF**

- O fisioterapeuta deve poder listar seus agendamentos de um dia específico;
- O fisioterapeuta deve poder selecionar um agendamento para ver mais detalhes do mesmo;
- O fisioterapeuta deve poder realizar um novo agendamento com um paciente específico
- O fisioterapeuta deve receber uma notificação sempre que houver um novo agendamento;

**RNF**

- Os agendamentos do fisioterapeuta no dia devem ser armazenados em cache;
- A push notification deve ser enviada através do FireBase;
- Ao selecionar um agendamento o fisioterapeuta deve ser redirecionado para uma tela com os seguintes detalhes:
  - Data do agendamento, Horário, Nome do paciente, Observações do agendamento
  - Um botão com a opção de cancelar um agendamento
- Ao clicar no botão de cancelar um agendamento o paciente deve ser redirecionado para uma tela de cancelamento de serviços
- Ao clicar no botão de realizar um agendamento o paciente deve ser redirecionado para uma tela de agendamento de serviços

**RN**
- O fisioterapeuta não deve visualizar agendamentos que já passaram da data/horário atual;


  ## Agendamento de Serviços

**RF**

- O fisioterapeuta deve poder listar todos os pacientes cadastrados;
- O fisioterapeuta deve poder listar os dias de um mês com pelo menos horário disponível dele mesmo;
- O fisioterapeuta deve poder listar horários disponíveis em dias específicos dele mesmo;
- O fisioterapeuta deve poder realizar um novo agendamento com um paciente;

**RNF**

- A listagem de pacientes devem ser armazenada em cache

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (primeiras às 8h, último às 17h);
- O fisioterapeuta não pode agendar em um horário já ocupado;
- O fisioterapeuta não pode agendar em um horário que já passou;
- O fisioterapeuta não pode agendar serviços consigo mesmo;

  ## Cancelamento de Serviços

**RF**
- O fisioterapeuta deve poder cancelar um agendamento para um dia/horário e paciente específico;
- O paciente deve receber uma notificação que o agendamento foi cancelado;

**RNF**
- A push notification deve ser enviada através do FireBase;

**RN**
- O fisioterapeuta só pode cancelar um agendamento com no mínimo 3hrs de antecedência
- O fisioterapeuta deve visualizar uma tela de confirmação do cancelamento

