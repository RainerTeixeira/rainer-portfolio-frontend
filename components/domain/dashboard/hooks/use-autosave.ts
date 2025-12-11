/**
 * Autosave Hook
 *
 * Hook que salva automaticamente rascunhos do editor em intervalos
 * configuráveis, prevenindo perda de dados. Inclui fallback com localStorage
 * e notificações de feedback.
 *
 * @module components/domain/dashboard/hooks/use-autosave
 * @fileoverview Hook para autosave automático de posts e rascunhos
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';

/**
 * Opções de configuração do autosave
 *
 * @interface AutosaveOptions
 * @property {number} [interval=30000] - Intervalo entre salvamentos em ms
 * @property {boolean} [enabled=true] - Se o autosave está ativo
 * @property {Function} onSave - Função async que salva os dados
 */
interface AutosaveOptions {
  interval?: number; // ms (padrão: 30s)
  enabled?: boolean;
  onSave: () => Promise<void>;
}

/**
 * Hook useAutosave
 *
 * Gerencia salvamento automático de dados em intervalos regulares.
 * Ideal para editores de texto, formulários longos e rascunhos.
 *
 * @param {AutosaveOptions} options - Configurações de autosave
 *
 * @returns {Object} Funções e estado de autosave
 * @returns {Function} saveNow - Salva manualmente e mostra toast
 * @returns {Date | null} lastSave - Data/hora do último salvamento
 * @returns {Function} getTimeSinceLastSave - Retorna segundos desde último save
 *
 * @example
 * // Uso básico em editor de posts
 * import { useAutosave } from '@/components/domain/dashboard/hooks'
 *
 * function PostEditor() {
 *   const [content, setContent] = useState('')
 *
 *   const { saveNow, lastSave } = useAutosave({
 *     interval: 30000, // Salva a cada 30 segundos
 *     enabled: true,
 *     onSave: async () => {
 *       await fetch('/api/posts/draft', {
 *         method: 'POST',
 *         body: JSON.stringify({ content })
 *       })
 *     }
 *   })
 *
 *   return (
 *     <div>
 *       <textarea value={content} onChange={(e) => setContent(e.target.value)} />
 *       <button onClick={saveNow}>Salvar Agora</button>
 *       {lastSave && <p>Último save: {lastSave.toLocaleTimeString()}</p>}
 *     </div>
 *   )
 * }
 *
 * @example
 * // Com controle dinâmico
 * function ConditionalAutosave() {
 *   const [isDirty, setIsDirty] = useState(false)
 *   const [content, setContent] = useState('')
 *
 *   useAutosave({
 *     interval: 15000,
 *     enabled: isDirty, // Só salva se houver mudanças
 *     onSave: async () => {
 *       await saveContent(content)
 *       setIsDirty(false)
 *     }
 *   })
 *
 *   return (
 *     <textarea
 *       value={content}
 *       onChange={(e) => {
 *         setContent(e.target.value)
 *         setIsDirty(true)
 *       }}
 *     />
 *   )
 * }
 */
export function useAutosave({
  interval = 30000,
  enabled = true,
  onSave,
}: AutosaveOptions) {
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const lastSaveRef = useRef<Date | null>(null);

  /**
   * Salva e atualiza timestamp
   */
  const save = useCallback(async () => {
    try {
      await onSave();
      lastSaveRef.current = new Date();
    } catch (error) {
      console.error('Erro no autosave:', error);
    }
  }, [onSave]);

  /**
   * Effect: Inicia timer de autosave
   */
  useEffect(() => {
    if (!enabled) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    // Salva periodicamente
    timerRef.current = setInterval(save, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [enabled, interval, save]);

  /**
   * Salva manualmente com feedback via toast
   */
  const saveNow = useCallback(async () => {
    await save();
    toast.success('Rascunho salvo!', { duration: 2000 });
  }, [save]);

  /**
   * Retorna tempo desde último save em segundos
   */
  const getTimeSinceLastSave = useCallback(() => {
    if (!lastSaveRef.current) return null;

    const now = new Date();
    const diff = now.getTime() - lastSaveRef.current.getTime();

    return Math.floor(diff / 1000); // segundos
  }, []);

  return {
    saveNow,
    lastSave: lastSaveRef.current,
    getTimeSinceLastSave,
  };
}

/**
 * Hook useLocalDraft
 *
 * Gerencia rascunhos no localStorage como fallback ou cache local.
 * Útil para salvar dados mesmo sem conexão.
 *
 * @param {string} key - Chave única para identificar o rascunho
 *
 * @returns {Object} Funções de gerenciamento de draft
 * @returns {Function} saveDraft - Salva dados no localStorage
 * @returns {Function} loadDraft - Carrega dados do localStorage
 * @returns {Function} clearDraft - Remove rascunho
 *
 * @example
 * // Uso em editor com fallback localStorage
 * import { useLocalDraft } from '@/components/domain/dashboard/hooks'
 *
 * function EditorWithDraft() {
 *   const [content, setContent] = useState('')
 *   const { saveDraft, loadDraft, clearDraft } = useLocalDraft<{ content: string }>('post-123')
 *
 *   // Carregar rascunho ao montar
 *   useEffect(() => {
 *     const draft = loadDraft()
 *     if (draft) {
 *       setContent(draft.content)
 *     }
 *   }, [])
 *
 *   // Salvar ao digitar (com debounce)
 *   useEffect(() => {
 *     const timer = setTimeout(() => {
 *       saveDraft({ content })
 *     }, 1000)
 *     return () => clearTimeout(timer)
 *   }, [content])
 *
 *   return (
 *     <div>
 *       <textarea value={content} onChange={(e) => setContent(e.target.value)} />
 *       <button onClick={clearDraft}>Limpar Rascunho</button>
 *     </div>
 *   )
 * }
 */
export function useLocalDraft<T>(key: string) {
  /**
   * Salva rascunho no localStorage
   */
  const saveDraft = useCallback(
    (data: T) => {
      try {
        localStorage.setItem(`draft_${key}`, JSON.stringify(data));
      } catch (error) {
        console.error('Erro ao salvar rascunho:', error);
      }
    },
    [key]
  );

  /**
   * Carrega rascunho do localStorage
   */
  const loadDraft = useCallback((): T | null => {
    try {
      const saved = localStorage.getItem(`draft_${key}`);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Erro ao carregar rascunho:', error);
      return null;
    }
  }, [key]);

  /**
   * Remove rascunho
   */
  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(`draft_${key}`);
    } catch (error) {
      console.error('Erro ao limpar rascunho:', error);
    }
  }, [key]);

  return {
    saveDraft,
    loadDraft,
    clearDraft,
  };
}


