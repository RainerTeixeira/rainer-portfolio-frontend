/**
 * Image Editor Panel Component
 *
 * Painel de edição de imagem que permite editar atributos da imagem
 * diretamente na interface do editor. Suporta alt text, título, largura
 * e alinhamento.
 *
 * @module components/dashboard/image-editor-panel
 * @fileoverview Painel de edição de atributos de imagem
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <ImageEditorPanel
 *   editor={editor}
 *   imageAttributes={{
 *     src: '/image.jpg',
 *     alt: 'Descrição',
 *     title: 'Título',
 *     width: 800,
 *     align: 'center'
 *   }}
 *   onClose={() => setIsOpen(false)}
 * />
 * ```
 */

'use client';

import { Button } from '@rainersoft/ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rainersoft/ui';
import { Input } from '@rainersoft/ui';
import { Label } from '@rainersoft/ui';
import type { Editor } from '@tiptap/react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ImageIcon,
  Save,
  X,
} from 'lucide-react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

interface ImageEditorPanelProps {
  editor: Editor;
  imageAttributes: {
    src?: string;
    alt?: string;
    title?: string;
    width?: string | number;
    height?: string | number;
    align?: 'left' | 'center' | 'right';
  };
  onClose: () => void;
}

export function ImageEditorPanel({
  editor,
  imageAttributes,
  onClose,
}: ImageEditorPanelProps) {
  const [alt, setAlt] = useState(imageAttributes.alt || '');
  const [title, setTitle] = useState(imageAttributes.title || '');
  const [width, setWidth] = useState(imageAttributes.width?.toString() || '');
  const [align, setAlign] = useState<'left' | 'center' | 'right'>(
    imageAttributes.align || 'center'
  );

  const handleSave = useCallback(() => {
    if (!editor) return;

    // Buscar a imagem selecionada no editor
    const { state } = editor;
    const { selection } = state;

    // Encontrar a posição da imagem
    let imagePos = -1;
    state.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
      if (node.type.name === 'image') {
        imagePos = pos;
      }
    });

    if (imagePos === -1) {
      // Se não encontrou, procurar nas adjacências
      const { $from } = selection;
      const nodeAfter = $from.nodeAfter;
      const nodeBefore = $from.nodeBefore;

      if (nodeAfter?.type.name === 'image') {
        imagePos = $from.pos;
      } else if (nodeBefore?.type.name === 'image') {
        imagePos = $from.pos - 1;
      }
    }

    if (imagePos === -1) {
      console.warn('Imagem não encontrada no editor');
      onClose();
      return;
    }

    // Construir atributos atualizados
    const attrs: Record<string, string | number | null> = {
      src: imageAttributes.src || '',
    };

    if (alt.trim()) {
      attrs.alt = alt.trim();
    } else {
      attrs.alt = null;
    }

    if (title.trim()) {
      attrs.title = title.trim();
    } else {
      attrs.title = null;
    }

    if (width.trim()) {
      const widthNum = parseInt(width, 10);
      if (!isNaN(widthNum) && widthNum > 0) {
        attrs.width = widthNum;
      }
    } else {
      attrs.width = null;
    }

    attrs.align = align;

    // Atualizar a imagem usando setNodeMarkup
    try {
      const tr = state.tr;
      tr.setNodeMarkup(imagePos, undefined, attrs);
      editor.view.dispatch(tr);

      toast.success('✅ Atributos da imagem atualizados!');
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar imagem:', error);
      toast.error('❌ Erro ao atualizar imagem');
    }
  }, [editor, alt, title, width, align, imageAttributes.src, onClose]);

  const handleAlignChange = (newAlign: 'left' | 'center' | 'right') => {
    setAlign(newAlign);
  };

  const handleDelete = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().deleteSelection().run();
    onClose();
  }, [editor, onClose]);

  return (
    <Card className="w-[420px] max-w-[90vw] shadow-2xl border-2 dark:border-cyan-400/30 bg-white dark:bg-gray-900">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <CardTitle className="text-lg dark:text-cyan-200">
              Editar Imagem
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-7 w-7"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <CardDescription className="text-xs">
          Configure os atributos da imagem
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Preview da imagem */}
        {imageAttributes.src && (
          <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-cyan-400/20 bg-gray-50 dark:bg-gray-900/50">
            <img
              src={imageAttributes.src}
              alt={alt || 'Preview'}
              className="w-full h-auto max-h-32 object-contain"
            />
          </div>
        )}

        {/* Alt Text */}
        <div className="space-y-2">
          <Label htmlFor="image-alt" className="text-sm font-medium">
            Texto Alternativo (Alt)
          </Label>
          <Input
            id="image-alt"
            placeholder="Descreva a imagem para acessibilidade"
            value={alt}
            onChange={e => setAlt(e.target.value)}
            className="text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Importante para SEO e acessibilidade
          </p>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="image-title" className="text-sm font-medium">
            Título (Tooltip)
          </Label>
          <Input
            id="image-title"
            placeholder="Título da imagem (aparece ao passar o mouse)"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="text-sm"
          />
        </div>

        {/* Width */}
        <div className="space-y-2">
          <Label htmlFor="image-width" className="text-sm font-medium">
            Largura (px)
          </Label>
          <Input
            id="image-width"
            type="number"
            placeholder="Ex: 800 (deixe vazio para auto)"
            value={width}
            onChange={e => setWidth(e.target.value)}
            className="text-sm"
            min="1"
            max="2000"
          />
          <p className="text-xs text-muted-foreground">
            Deixe vazio para largura automática
          </p>
        </div>

        {/* Alignment */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Alinhamento</Label>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant={align === 'left' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleAlignChange('left')}
              className="flex-1"
            >
              <AlignLeft className="w-4 h-4 mr-1" />
              Esquerda
            </Button>
            <Button
              type="button"
              variant={align === 'center' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleAlignChange('center')}
              className="flex-1"
            >
              <AlignCenter className="w-4 h-4 mr-1" />
              Centro
            </Button>
            <Button
              type="button"
              variant={align === 'right' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleAlignChange('right')}
              className="flex-1"
            >
              <AlignRight className="w-4 h-4 mr-1" />
              Direita
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-cyan-400/20">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            className="flex-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10"
          >
            Remover
          </Button>
          <Button
            onClick={handleSave}
            size="sm"
            className="flex-1 gap-2 dark:bg-cyan-600 dark:hover:bg-cyan-700"
          >
            <Save className="w-4 h-4" />
            Salvar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
