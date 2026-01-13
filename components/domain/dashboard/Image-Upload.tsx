/**
 * Image Upload Component
 *
 * Componente de upload de imagem com drag & drop, preview e barra de progresso.
 * Integração com Cloudinary para armazenamento de imagens, compressão automática
 * e suporte a múltiplos tipos de upload (cover, content, general).
 *
 * @module components/domain/dashboard/ImageUpload
 * @fileoverview Componente de upload de imagens via Cloudinary
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <ImageUpload
 *   value={imageUrl}
 *   onChange={(url) => setImageUrl(url)}
 *   maxSize={10}
 *   type="cover"
 * />
 * ```
 *
 * Características:
 * - Drag & drop para upload
 * - Preview de imagem antes do upload
 * - Progress bar durante upload
 * - Compressão automática de imagens
 * - Validação de tamanho e tipo
 * - Integração com Cloudinary
 * - Múltiplos tipos de upload (cover, content, general)
 * - Acessibilidade completa
 */

'use client';

import { useImageCompression, useUpload } from '@/components/domain/dashboard/hooks';
import { Button } from '@rainersoft/ui';
import { Progress } from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';
import { ImageIcon, Loader2, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';

/**
 * Propriedades do componente ImageUpload
 * @interface ImageUploadProps
 * @property {string} [value] - URL da imagem atual (opcional)
 * @property {(url: string) => void} onChange - Callback executado quando a imagem é alterada
 * @property {string} [className] - Classes CSS adicionais
 * @property {number} [maxSize] - Tamanho máximo do arquivo em MB (padrão: 10)
 * @property {'cover' | 'content' | 'general'} [type] - Tipo de upload para otimização específica
 */
interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
  maxSize?: number;
  type?: 'cover' | 'content' | 'general';
}

/**
 * Componente ImageUpload
 *
 * Componente de upload de imagem com drag & drop, preview em tempo real,
 * compressão automática e integração com Cloudinary.
 *
 * @component
 * @param {ImageUploadProps} props - Propriedades do componente
 * @returns {JSX.Element} Componente de upload de imagem
 *
 * @remarks
 * Funcionalidades:
 * - Drag & drop com feedback visual
 * - Preview de imagem antes do upload
 * - Barra de progresso durante upload
 * - Compressão automática mantendo qualidade
 * - Validação de tamanho e tipo de arquivo
 * - Integração com Cloudinary CDN
 * - Múltiplos tipos de otimização
 * - Acessibilidade completa
 */
export function ImageUpload({
  value,
  onChange,
  className,
  maxSize = 10,
  type = 'general',
}: ImageUploadProps) {
  const { upload, isUploading, progress } = useUpload(type);
  const { compress } = useImageCompression();

  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);

  /**
   * Processa arquivo selecionado e faz upload para Cloudinary
   * @async
   * @param {File} file - Arquivo de imagem a ser processado
   * @returns {Promise<void>}
   */
  const handleFile = useCallback(
    async (file: File) => {
      // Validação de tipo de arquivo
      if (!file.type.startsWith('image/')) {
        console.error('Tipo de arquivo não suportado');
        return;
      }

      // Validação de tamanho
      if (file.size > maxSize * 1024 * 1024) {
        console.error(`Arquivo muito grande. Máximo: ${maxSize}MB`);
        return;
      }

      // Preview local imediato
      const localPreview = URL.createObjectURL(file);
      setPreviewUrl(localPreview);

      try {
        // Comprime imagem antes do upload
        const compressed = await compress(file, 1920, 1080, 0.92);

        // Faz upload para Cloudinary
        const url = await upload(compressed);

        if (url) {
          onChange(url); // Retorna URL otimizada do Cloudinary
          setPreviewUrl(url);
        }
      } catch (error) {
        console.error('Erro no upload:', error);
        // Limpa preview local em caso de erro
        URL.revokeObjectURL(localPreview);
        setPreviewUrl(null);
      } finally {
        // Limpa preview local após upload
        URL.revokeObjectURL(localPreview);
      }
    },
    [upload, compress, onChange, maxSize]
  );

  /**
   * Handler para evento de drop
   * @param {React.DragEvent} e - Evento de drag & drop
   */
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  /**
   * Handler para mudança no input de arquivo
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de mudança
   */
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  /**
   * Remove imagem selecionada
   */
  const handleRemove = useCallback(() => {
    setPreviewUrl(null);
    onChange('');
  }, [onChange]);

  return (
    <div className={cn('space-y-4', className)}>
      {/* Área de Upload ou Preview */}
      {previewUrl ? (
        /* Preview da Imagem */
        <div className="relative group" role="region" aria-label="Preview da imagem">
          <div className="relative h-48 w-full rounded-lg overflow-hidden border border-border dark:border-cyan-400/20">
            <Image
              src={previewUrl}
              alt="Preview da imagem"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              priority={false}
            />
            {isUploading && (
              <div 
                className="absolute inset-0 bg-black/60 flex items-center justify-center"
                role="status"
                aria-label="Carregando imagem"
              >
                <div className="text-center text-white">
                  <Loader2 
                    className="w-8 h-8 animate-spin mx-auto mb-2" 
                    aria-hidden="true"
                  />
                  <p className="text-sm">Enviando... {progress}%</p>
                </div>
              </div>
            )}
          </div>

          {/* Botão de remover */}
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemove}
            disabled={isUploading}
            aria-label="Remover imagem"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>
      ) : (
        /* Área de Drop nativa */
        <div
          className={cn(
            'relative h-48 border-2 border-dashed rounded-lg',
            'flex flex-col items-center justify-center gap-2',
            'transition-colors duration-200',
            isDragging
              ? 'border-cyan-400 bg-cyan-400/5'
              : 'border-gray-300 dark:border-gray-600 hover:border-cyan-400/50'
          )}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Área de upload de imagem"
          />
          <ImageIcon className="w-8 h-8 text-gray-400" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Arraste uma imagem ou clique para selecionar
          </p>
          <p className="text-xs text-gray-500">
            Máximo: {maxSize}MB
          </p>
        </div>
      )}

      {/* Barra de Progresso */}
      {isUploading && (
        <div className="space-y-2" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <Progress value={progress} className="h-2" aria-label="Progresso do upload" />
          <p className="text-xs text-center text-muted-foreground dark:text-gray-400">
            Enviando... {progress}%
          </p>
        </div>
      )}

      {/* Dicas de uso */}
      <div className="text-xs text-muted-foreground dark:text-gray-500 space-y-1">
        <p>💡 <strong>Dicas:</strong></p>
        <ul className="list-disc list-inside ml-2 space-y-0.5">
          <li>Imagens são automaticamente otimizadas para web</li>
          <li>Formato recomendado: JPG ou WebP</li>
          <li>Tipo "{type}" otimiza para: {type === 'cover' ? 'capa' : type === 'content' ? 'conteúdo' : 'uso geral'}</li>
        </ul>
      </div>
    </div>
  );
}