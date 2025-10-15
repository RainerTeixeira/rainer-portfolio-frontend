/**
 * Constantes do Sistema Carousel Cyberpunk
 * 
 * Centraliza todas as constantes utilizadas no carousel
 * para facilitar manutenção e configuração
 * 
 * @fileoverview Constants for cyberpunk carousel system
 * @author Rainer Teixeira
 * @version 1.0.0
 */

/**
 * Intervalo de auto-play do carousel em milissegundos
 * @constant {number}
 * @default 5000
 */
export const AUTOPLAY_INTERVAL_MS = 5000

/**
 * Array de textos primários impactantes para o carousel
 * Padrão: verbo de ação + solução/resultado, estilo cyberpunk
 * 
 * @constant {string[]}
 * @readonly
 */
export const PRIMARY_TEXTS = [
  "ELEVE-SE AO FUTURO DIGITAL",                // Chamamento geral
  "TRANSFORME IDEIAS EM CÓDIGO VIVO",          // Full-stack
  "DOMINE A NUVEM, EXPANDA LIMITES",           // Cloud
  "TURBINE SUA PERFORMANCE SEM BARREIRAS",      // Performance
  "CONSTRUA SEGURANÇA DE NÍVEL NEXT-GEN",      // Segurança
  "POTENCIALIZE SEUS DADOS EM SEGUNDOS",       // Banco de dados
  "ORQUESTRE TIMES HIPERÁGEIS",                // Gestão
  "INOVE COM MOBILE MULTIVERSO",               // Mobile
  "ATIVE EXPERIÊNCIAS UI/UX IMERSIVAS",        // Design
  "MOLDE SOFTWARES COM ARQUITETURA NEURAL",    // Arquitetura
  "ACELERE SEU DEVOPS AUTOMATIZADO",           // DevOps
  "REVELE INSIGHTS DE DADOS EM TEMPO REAL",    // Data
  "LIBERE A INTELIGÊNCIA ARTIFICIAL GENERATIVA",// AI/ML
  "INSPIRE-SE NA TECNOLOGIA QUE IMPACTA",      // Inspiração/Visão
  "MESTRE EM WEB: SOLUÇÕES ESCALÁVEIS",        // Web escalável
]

/**
 * Array de subtextos/descrições com padrão claro e complementar
 * Padrão: promessa de valor, claridade e ação direta
 * Deve ter mesmo comprimento que PRIMARY_TEXTS
 *
 * @constant {string[]}
 * @readonly
 */
export const SUBTEXTS = [
  "Conecte-se ao extraordinário – para quem exige o próximo nível.",                          // Chamamento geral
  "Aplicações impecáveis, execução rápida, tecnologia de ponta.",                             // Full-stack
  "Infraestrutura distribuída, disponível e resiliente para você crescer.",                   // Cloud
  "Nada mais de lentidão – tenha eficiência máxima em cada clique.",                         // Performance
  "Sua proteção digital reforçada com criptografia e vigilância ativa.",                     // Segurança
  "Armazene, acesse e analise massivos volumes de dados em instantes.",                      // Banco de dados
  "Sinergia total – visão estratégica guiando equipes ao topo.",                             // Gestão
  "Aplicativos híbridos, experiência nativa e multiplataformas sem limites.",                // Mobile
  "Interfaces que fascinam e guiam usuários como nunca antes.",                              // Design
  "Organize, escale e evolua sistemas com inteligência artificial integrada.",               // Arquitetura
  "Entregas contínuas, automação total, velocidade e segurança unidas.",                     // DevOps
  "Monitore, entenda e transforme dados em decisões precisas.",                              // Data
  "Soluções cognitivas para criar, aprender e inovar além do humano.",                       // AI/ML
  "Tecnologia radical que inspira negócios, marcas e pessoas.",                              // Inspiração/Visão
  "Performance neural, robustez e escalabilidade para mercados globais.",                    // Web escalável
]

/**
 * Padrões de código binário pré-definidos
 * Usados para gerar sequências interessantes na chuva de matriz
 * 
 * @constant {string[]}
 * @readonly
 */
export const BINARY_PATTERNS = [
  "0101", "1010", "0110", "1001", "0011", "1100",
  "1111", "0000", "1000", "0111", "1101", "0010",
  "0100", "1110", "1011", "0110", "0001", "1010",
  "1001", "0011", "0101", "0111", "0100", "1000",
  "1100", "0011", "1001", "0110", "1010", "0101",
  "0000", "1111", "0010", "1101", "0111", "1000"
]

/**
 * Caracteres usados na chuva de matriz
 * Apenas 0 e 1 (código binário) para estética de computação
 * 
 * @constant {string}
 */
export const MATRIX_CHARS = "01"

