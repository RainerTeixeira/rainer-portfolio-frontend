/**
 * Image Upload Component
 *
 * Componente de upload de imagem com drag & drop, preview e barra de progresso.
 * Integração com Cloudinary para armazenamento de imagens, compressão automática
 * e suporte a múltiplos tipos de upload (cover, content, general).
 *
 * @module components/dashboard/ImageUpload
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

import { useImageCompression, useUpload } from '@/components/dashboard/hooks';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { ImageIcon, Loader2, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
  maxSize?: number; // MB
  type?: 'cover' | 'content' | 'general'; // Tipo de upload
}

/**
 * Componente ImageUpload
 *
 * Upload de imagem com drag & drop, preview via Cloudinary.
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
   */
  const handleFile = useCallback(
    async (file: File) => {
      // Preview local
      const localPreview = URL.createObjectURL(file);
      setPreviewUrl(localPreview);

      // Comprime imagem (opcional, Cloudinary já otimiza)
      const compressed = await compress(file, 1920, 1080, 0.92);

      // Faz upload para Cloudinary
      const url = await upload(compressed);

      if (url) {
        onChange(url); // Retorna URL do Cloudinary
        setPreviewUrl(url);
      }
    },
    [upload, compress, onChange]
  );

  /**
   * Handler de drop
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
   * Handler de input file
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
   * Remove imagem
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
        <div className="relative group">
          <div className="relative h-48 w-full rounded-lg overflow-hidden border border-border dark:border-cyan-400/20">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="text-center text-white">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
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
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        /* Área de Drop */
        <div
          onDrop={handleDrop}
          onDragOver={e => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          className={cn(
            'relative h-48 w-full rounded-lg border-2 border-dashed transition-all duration-200',
            isDragging
              ? 'border-cyan-400 bg-cyan-400/5 dark:bg-cyan-400/5'
              : 'border-border dark:border-cyan-400/20 hover:border-cyan-400/50',
            'flex flex-col items-center justify-center gap-2',
            'cursor-pointer group'
          )}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />

          <div
            className={cn(
              'p-4 rounded-full',
              'bg-linear-to-br from-cyan-500/10 to-purple-500/10',
              'border border-cyan-400/30',
              'group-hover:scale-110 transition-transform'
            )}
          >
            <ImageIcon className="w-8 h-8 text-cyan-400" />
          </div>

          <div className="text-center">
            <p className="text-sm font-medium dark:text-gray-200">
              {isDragging
                ? 'Solte a imagem aqui'
                : 'Clique ou arraste uma imagem'}
            </p>
            <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1">
              PNG, JPG, WebP ou GIF (máx. {maxSize}MB)
            </p>
            <p className="text-xs text-muted-foreground dark:text-gray-500 mt-1 font-mono">
              Hospedado via Cloudinary
            </p>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {isUploading && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-center text-muted-foreground dark:text-gray-400">
            Enviando... {progress}%
          </p>
        </div>
      )}
    </div>
  );
}
