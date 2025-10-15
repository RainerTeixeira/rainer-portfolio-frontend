/**
 * Hook de Autosave
 * 
 * Salva automaticamente rascunhos do editor em intervalos.
 * 
 * @fileoverview Hook para autosave de posts
 * @author Rainer Teixeira
 * @version 1.0.0
 */

"use client"

import { useEffect, useRef, useCallback } from 'react'
import { toast } from 'sonner'

interface AutosaveOptions {
  interval?: number // ms (padrão: 30s)
  enabled?: boolean
  onSave: () => Promise<void>
}

/**
 * Hook useAutosave
 * 
 * Salva automaticamente em intervalos regulares.
 * 
 * @param options - Configurações de autosave
 */
export function useAutosave({ interval = 30000, enabled = true, onSave }: AutosaveOptions) {
  const timerRef = useRef<NodeJS.Timeout>()
  const lastSaveRef = useRef<Date | null>(null)

  /**
   * Salva e atualiza timestamp
   */
  const save = useCallback(async () => {
    try {
      await onSave()
      lastSaveRef.current = new Date()
    } catch (error) {
      console.error('Erro no autosave:', error)
    }
  }, [onSave])

  /**
   * Inicia timer de autosave
   */
  useEffect(() => {
    if (!enabled) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      return
    }

    // Salva periodicamente
    timerRef.current = setInterval(save, interval)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [enabled, interval, save])

  /**
   * Salva manualmente
   */
  const saveNow = useCallback(async () => {
    await save()
    toast.success('Rascunho salvo!', { duration: 2000 })
  }, [save])

  /**
   * Retorna tempo desde último save
   */
  const getTimeSinceLastSave = useCallback(() => {
    if (!lastSaveRef.current) return null
    
    const now = new Date()
    const diff = now.getTime() - lastSaveRef.current.getTime()
    
    return Math.floor(diff / 1000) // segundos
  }, [])

  return {
    saveNow,
    lastSave: lastSaveRef.current,
    getTimeSinceLastSave,
  }
}

/**
 * Hook para salvar no localStorage (fallback)
 */
export function useLocalDraft<T>(key: string) {
  /**
   * Salva rascunho no localStorage
   */
  const saveDraft = useCallback((data: T) => {
    try {
      localStorage.setItem(`draft_${key}`, JSON.stringify(data))
    } catch (error) {
      console.error('Erro ao salvar rascunho:', error)
    }
  }, [key])

  /**
   * Carrega rascunho do localStorage
   */
  const loadDraft = useCallback((): T | null => {
    try {
      const saved = localStorage.getItem(`draft_${key}`)
      return saved ? JSON.parse(saved) : null
    } catch (error) {
      console.error('Erro ao carregar rascunho:', error)
      return null
    }
  }, [key])

  /**
   * Remove rascunho
   */
  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(`draft_${key}`)
    } catch (error) {
      console.error('Erro ao limpar rascunho:', error)
    }
  }, [key])

  return {
    saveDraft,
    loadDraft,
    clearDraft,
  }
}

