export type HorazionErrorCode = 
  // Autenticação & Credenciais (001 - 010)
  | 'HZ_ACC_001' | 'HZ_ACC_002' | 'HZ_ACC_003' | 'HZ_ACC_004' | 'HZ_ACC_005'
  | 'HZ_ACC_006' | 'HZ_ACC_007' | 'HZ_ACC_008' | 'HZ_ACC_009' | 'HZ_ACC_010'
  // Identidade & Jurídico (011 - 020)
  | 'HZ_ACC_011' | 'HZ_ACC_012' | 'HZ_ACC_013' | 'HZ_ACC_014' | 'HZ_ACC_015'
  | 'HZ_ACC_016' | 'HZ_ACC_017' | 'HZ_ACC_018' | 'HZ_ACC_019' | 'HZ_ACC_020'
  // Perfil & Espaço (021 - 025)
  | 'HZ_ACC_021' | 'HZ_ACC_022' | 'HZ_ACC_023' | 'HZ_ACC_024' | 'HZ_ACC_025'
  // Infraestrutura & Limites (026 - 030)
  | 'HZ_ACC_026' | 'HZ_ACC_027' | 'HZ_ACC_028' | 'HZ_ACC_029' | 'HZ_ACC_030'
  | 'HZ_SYS_001';

export interface HorazionError {
  code: HorazionErrorCode;
  message: string;
  action: string;
  helpLink: string;
}

export const AccountErrorDictionary: Record<string, HorazionError> = {
  // --- AUTENTICAÇÃO E CREDENCIAIS ---
  'auth/email-already-in-use': { code: 'HZ_ACC_001', message: 'Esta credencial de e-mail já pertence a um arquiteto ativo no ecossistema.', action: 'Faça login ou recupere sua senha.', helpLink: '/ajuda/contas/recuperacao' },
  'auth/invalid-email': { code: 'HZ_ACC_002', message: 'O formato do e-mail fornecido não atende aos nossos protocolos de validação.', action: 'Verifique se há espaços ou erros de digitação.', helpLink: '/ajuda/contas/email' },
  'auth/weak-password': { code: 'HZ_ACC_003', message: 'A entropia da sua senha mestra é insuficiente. É necessária maior complexidade criptográfica.', action: 'Use letras maiúsculas, minúsculas, números e símbolos.', helpLink: '/ajuda/seguranca/senhas' },
  'auth/passwords-do-not-match': { code: 'HZ_ACC_004', message: 'As chaves criptográficas fornecidas não coincidem.', action: 'Digite a senha e a confirmação exatamente iguais.', helpLink: '/ajuda/seguranca/senhas' },
  'auth/invalid-recovery-email': { code: 'HZ_ACC_005', message: 'O e-mail de recuperação não pode ser idêntico ao e-mail primário.', action: 'Forneça um endereço alternativo seguro.', helpLink: '/ajuda/seguranca/recuperacao' },
  'auth/too-many-requests': { code: 'HZ_ACC_006', message: 'Detectamos múltiplas tentativas de acesso à nossa infraestrutura.', action: 'Aguarde 15 minutos antes de tentar novamente.', helpLink: '/ajuda/seguranca/bloqueio' },
  'auth/verification-code-invalid': { code: 'HZ_ACC_007', message: 'O código de verificação de integridade expirou ou está incorreto.', action: 'Solicite um novo envio para o seu e-mail.', helpLink: '/ajuda/contas/verificacao' },
  'auth/verification-timeout': { code: 'HZ_ACC_008', message: 'O tempo limite para verificação da identidade foi excedido.', action: 'Reinicie o protocolo de verificação.', helpLink: '/ajuda/contas/verificacao' },
  'auth/device-untrusted': { code: 'HZ_ACC_009', message: 'Este dispositivo foi sinalizado pelos nossos protocolos de risco.', action: 'Utilize uma rede ou dispositivo reconhecido.', helpLink: '/ajuda/seguranca/dispositivos' },
  'auth/2fa-setup-failed': { code: 'HZ_ACC_010', message: 'Falha ao ancorar o fator duplo de autenticação.', action: 'Verifique a sincronização de tempo do seu aplicativo autenticador.', helpLink: '/ajuda/seguranca/2fa' },

  // --- IDENTIDADE JURÍDICA E CADASTRO ---
  'legal/tax-id-in-use': { code: 'HZ_ACC_011', message: 'Esta raiz jurídica (CPF/CNPJ) já está registrada em nossa malha de dados.', action: 'Caso não reconheça a conta, inicie o protocolo de contestação.', helpLink: '/ajuda/compliance/identidade' },
  'legal/invalid-tax-id': { code: 'HZ_ACC_012', message: 'O identificador nacional fornecido falhou no cálculo de dígitos verificadores.', action: 'Confirme os números inseridos no seu documento.', helpLink: '/ajuda/compliance/documentos' },
  'legal/name-too-short': { code: 'HZ_ACC_013', message: 'O nome de registro não possui a extensão mínima exigida legalmente.', action: 'Insira seu nome completo, sem abreviações.', helpLink: '/ajuda/contas/perfil' },
  'legal/invalid-characters-name': { code: 'HZ_ACC_014', message: 'Caracteres não autorizados detectados no seu nome jurídico.', action: 'Remova símbolos, números ou caracteres especiais.', helpLink: '/ajuda/contas/perfil' },
  'legal/minor-age-detected': { code: 'HZ_ACC_015', message: 'Nossos protocolos exigem maioridade civil para arquitetar espaços sem supervisão.', action: 'Inicie a jornada Horizion For Education com um tutor.', helpLink: '/ajuda/education/tutoria' },
  'legal/pep-detected': { code: 'HZ_ACC_016', message: 'Seu perfil exige governança ampliada (Pessoa Politicamente Exposta).', action: 'Conclua o cadastro e aguarde o compliance.', helpLink: '/ajuda/compliance/pep' },
  'legal/terms-not-accepted': { code: 'HZ_ACC_017', message: 'O Acordo Soberano do Horazion Group precisa ser reconhecido.', action: 'Leia e aceite os termos para avançar.', helpLink: '/termos' },
  'legal/sanctions-list': { code: 'HZ_ACC_018', message: 'Restrição de conformidade global ativa para esta identidade.', action: 'Contate a nossa unidade de resolução legal.', helpLink: '/ajuda/compliance/restricoes' },
  'legal/address-not-found': { code: 'HZ_ACC_019', message: 'As coordenadas ou CEP informados não puderam ser vetorizados.', action: 'Preencha os dados manualmente.', helpLink: '/ajuda/contas/localizacao' },
  'legal/invalid-postal-code': { code: 'HZ_ACC_020', message: 'O código de endereçamento postal está formatado incorretamente.', action: 'Digite apenas os 8 números válidos.', helpLink: '/ajuda/contas/localizacao' },

  // --- PERFIL E ESPAÇO ---
  'profile/username-taken': { code: 'HZ_ACC_021', message: 'Esta nomenclatura (@username) já foi reivindicada por outro arquiteto.', action: 'Escolha uma variação ou utilize sugestões.', helpLink: '/ajuda/contas/nomenclatura' },
  'profile/username-invalid': { code: 'HZ_ACC_022', message: 'A nomenclatura do espaço não segue a padronização alfanumérica contínua.', action: 'Utilize apenas letras, números e underscores (_).', helpLink: '/ajuda/contas/nomenclatura' },
  'profile/avatar-too-large': { code: 'HZ_ACC_023', message: 'A mídia enviada excede nossa capacidade alocada de renderização (5MB).', action: 'Comprima o arquivo e tente novamente.', helpLink: '/ajuda/midia/limites' },
  'profile/avatar-invalid-format': { code: 'HZ_ACC_024', message: 'O formato do ativo visual não é suportado pelo nosso pipeline.', action: 'Envie arquivos em formato PNG, JPG ou WebP.', helpLink: '/ajuda/midia/formatos' },
  'profile/bio-too-long': { code: 'HZ_ACC_025', message: 'A biografia excede a densidade de caracteres permitida para blocos primários.', action: 'Reduza a descrição para até 160 caracteres.', helpLink: '/ajuda/contas/perfil' },

  // --- INFRAESTRUTURA ---
  'system/database-timeout': { code: 'HZ_ACC_026', message: 'A latência de escrita no banco de dados excedeu o limite seguro.', action: 'Tente novamente em instantes.', helpLink: '/ajuda/status' },
  'system/rpc-failure': { code: 'HZ_ACC_027', message: 'Falha no acionamento da arquitetura de registro (Procedure V2).', action: 'Tente novamente.', helpLink: '/ajuda/status' },
  'system/session-creation-failed': { code: 'HZ_ACC_028', message: 'Não foi possível ancorar a sessão criptográfica após o registro.', action: 'Vá para a página de login para acessar a conta.', helpLink: '/ajuda/acesso' },
  'system/rate-limit-global': { code: 'HZ_ACC_029', message: 'Nosso cluster está operando sob controle rígido de tráfego (DDoS mitigation).', action: 'Aguarde alguns minutos e tente novamente.', helpLink: '/ajuda/status' },
  'system/network-error': { code: 'HZ_ACC_030', message: 'Sua conexão com o nó do Horazion Group foi interrompida.', action: 'Verifique sua estabilidade de rede (Wi-Fi/5G).', helpLink: '/ajuda/conectividade' },

  'fallback': { code: 'HZ_SYS_001', message: 'Ocorreu uma flutuação em nossos protocolos. A engenharia foi notificada.', action: 'Aguarde ou contate o suporte caso o problema persista.', helpLink: '/ajuda/status' }
};

export const parseHorazionError = (errKey: string): HorazionError => {
  return AccountErrorDictionary[errKey] || AccountErrorDictionary['fallback'];
};