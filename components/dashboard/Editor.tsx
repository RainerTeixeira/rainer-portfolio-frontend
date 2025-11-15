/**
 * Editor Component (Tiptap Professional)
 *
 * Editor WYSIWYG completo com toolbar de formatação estilo Medium/Ghost.
 * Suporta formatação de texto, títulos, listas, citações, blocos de código,
 * links, imagens e tabelas. Inclui contador de palavras e caracteres em tempo
 * real.
 *
 * @module components/dashboard/Editor
 * @fileoverview Editor profissional WYSIWYG para blog
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <Editor
 *   content={initialContent}
 *   onChange={(content) => handleChange(content)}
 *   placeholder="Comece a escrever..."
 * />
 * ```
 *
 * Funcionalidades:
 * - Formatação de texto (negrito, itálico, tachado, código inline)
 * - Títulos (H1, H2, H3) com tipografia otimizada
 * - Listas (ordenadas e não-ordenadas)
 * - Citações e blocos de código com syntax highlighting
 * - Links e imagens com estilização avançada
 * - Tabelas responsivas (inserir com tamanho personalizado)
 * - Contador de palavras e caracteres em tempo real
 * - Placeholder customizado
 * - Atalhos de teclado
 * - Múltiplas linguagens de código suportadas
 * - Preview em tempo real
 */

'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableRow } from '@tiptap/extension-table-row';
import {
  EditorContent,
  useEditor,
  type Editor as TiptapEditor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { common, createLowlight } from 'lowlight';
import {
  AlignLeft,
  Bold,
  ChevronDown,
  Code,
  Columns,
  Copy,
  Eye,
  FileJson,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Rows,
  Strikethrough,
  Table as TableIcon,
  TableProperties,
  Trash2,
  Undo,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

// Cria instância do lowlight com linguagens comuns
const lowlight = createLowlight(common);

// Linguagens suportadas
const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'swift', label: 'Swift' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'scss', label: 'SCSS' },
  { value: 'json', label: 'JSON' },
  { value: 'yaml', label: 'YAML' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'bash', label: 'Bash' },
  { value: 'sql', label: 'SQL' },
  { value: 'plaintext', label: 'Texto Simples' },
];

interface EditorProps {
  content: string | object; // Aceita JSON ou HTML
  onChange: (content: {
    json: Record<string, unknown>;
    html: string;
    text: string;
  }) => void; // Retorna múltiplos formatos
  placeholder?: string;
  className?: string;
  mode?: 'json' | 'html'; // Modo de operação (padrão: json)
}

/**
 * ToolbarButton - Botão reutilizável da toolbar
 */
interface ToolbarButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isActive?: boolean;
  title: string;
  icon: React.ReactNode;
  label?: string;
}

const ToolbarButton = ({
  onClick,
  disabled,
  isActive,
  title,
  icon,
  label,
}: ToolbarButtonProps) => (
  <Button
    type="button"
    variant="ghost"
    size="sm"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'h-9 px-2.5 transition-all duration-200',
      'hover:bg-gray-100 dark:hover:bg-cyan-400/10',
      'disabled:opacity-40 disabled:cursor-not-allowed',
      isActive &&
        'bg-gray-200 dark:bg-cyan-400/20 text-cyan-600 dark:text-cyan-300 shadow-sm',
      !disabled && !isActive && 'hover:shadow-sm'
    )}
    title={title}
  >
    <span className="flex items-center gap-1.5">
      {icon}
      {label && (
        <span className="text-xs font-medium hidden sm:inline">{label}</span>
      )}
    </span>
  </Button>
);

/**
 * ToolbarDivider - Separador visual
 */
const ToolbarDivider = () => (
  <Separator
    orientation="vertical"
    className="h-6 mx-1 bg-gray-300 dark:bg-cyan-400/30"
  />
);

/**
 * LanguageSelector - Seletor de linguagem para blocos de código
 */
const LanguageSelector = ({
  editor,
}: {
  editor: ReturnType<typeof useEditor>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('plaintext');

  const setLanguage = (language: string) => {
    editor.chain().focus().updateAttributes('codeBlock', { language }).run();
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  // Atualiza a linguagem selecionada quando o cursor muda
  useEffect(() => {
    if (editor && editor.isActive('codeBlock')) {
      const attrs = editor.getAttributes('codeBlock');
      setSelectedLanguage(attrs.language || 'plaintext');
    }
  }, [editor]);

  if (!editor || !editor.isActive('codeBlock')) return null;

  const currentLang = LANGUAGES.find(l => l.value === selectedLanguage);

  return (
    <div className="relative">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 px-3 gap-1.5 text-xs font-medium"
      >
        <Code className="h-3.5 w-3.5" />
        {currentLang?.label || 'Texto Simples'}
        <ChevronDown className="h-3 w-3" />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-cyan-400/20 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
            {LANGUAGES.map(lang => (
              <button
                key={lang.value}
                onClick={() => setLanguage(lang.value)}
                className={cn(
                  'w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-cyan-400/10 transition-colors',
                  selectedLanguage === lang.value &&
                    'bg-cyan-50 dark:bg-cyan-400/20 text-cyan-700 dark:text-cyan-300 font-medium'
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/**
 * MenuBar - Toolbar de formatação do editor
 */
const MenuBar = ({
  editor,
  viewMode,
  onViewModeChange,
}: {
  editor: TiptapEditor | null;
  viewMode: 'visual' | 'json';
  onViewModeChange: (mode: 'visual' | 'json') => void;
}) => {
  /**
   * Adiciona link ao texto selecionado
   */
  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL do link:', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    if (editor) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    }
  }, [editor]);

  /**
   * Adiciona imagem via URL
   */
  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('URL da imagem:');

    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  /**
   * Adiciona tabela com tamanho personalizado
   */
  const insertTable = useCallback(() => {
    if (!editor) return;
    const rows = window.prompt('Número de linhas:', '3');
    if (rows === null) return;

    const cols = window.prompt('Número de colunas:', '3');
    if (cols === null) return;

    const numRows = parseInt(rows, 10);
    const numCols = parseInt(cols, 10);

    if (numRows > 0 && numCols > 0 && numRows <= 20 && numCols <= 10) {
      if (editor) {
        editor
          .chain()
          .focus()
          .insertTable({
            rows: numRows,
            cols: numCols,
            withHeaderRow: true,
          })
          .run();
      }
    } else {
      alert('Por favor, insira valores válidos (Linhas: 1-20, Colunas: 1-10)');
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border-b border-gray-200 dark:border-cyan-400/20 px-3 py-2.5 flex flex-wrap items-center gap-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
      {/* Toggle Visual/JSON */}
      <div className="flex items-center gap-0.5 mr-2">
        <Button
          type="button"
          variant={viewMode === 'visual' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('visual')}
          className={cn(
            'h-9 px-3 gap-1.5',
            viewMode === 'visual' &&
              'bg-cyan-500 hover:bg-cyan-600 text-white dark:bg-cyan-600 dark:hover:bg-cyan-700'
          )}
          title="Modo Visual (WYSIWYG)"
        >
          <Eye className="h-4 w-4" />
          <span className="text-xs font-medium hidden sm:inline">Visual</span>
        </Button>
        <Button
          type="button"
          variant={viewMode === 'json' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('json')}
          className={cn(
            'h-9 px-3 gap-1.5',
            viewMode === 'json' &&
              'bg-purple-500 hover:bg-purple-600 text-white dark:bg-purple-600 dark:hover:bg-purple-700'
          )}
          title="Modo JSON (Edição Avançada)"
        >
          <FileJson className="h-4 w-4" />
          <span className="text-xs font-medium hidden sm:inline">JSON</span>
        </Button>
      </div>

      <ToolbarDivider />

      {/* Seletor de Linguagem (aparece apenas quando está em bloco de código) */}
      <LanguageSelector editor={editor} />

      {editor?.isActive('codeBlock') && <ToolbarDivider />}

      {/* Histórico */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Desfazer (Ctrl+Z)"
          icon={<Undo className="h-4 w-4" />}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Refazer (Ctrl+Y)"
          icon={<Redo className="h-4 w-4" />}
        />
      </div>

      <ToolbarDivider />

      {/* Formatação de Texto */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Negrito (Ctrl+B)"
          icon={<Bold className="h-4 w-4" />}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Itálico (Ctrl+I)"
          icon={<Italic className="h-4 w-4" />}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title="Tachado"
          icon={<Strikethrough className="h-4 w-4" />}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
          title="Código Inline"
          icon={<Code className="h-4 w-4" />}
        />
      </div>

      <ToolbarDivider />

      {/* Títulos */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive('heading', { level: 1 })}
          title="Título 1"
          icon={<Heading1 className="h-4 w-4" />}
          label="H1"
        />
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive('heading', { level: 2 })}
          title="Título 2"
          icon={<Heading2 className="h-4 w-4" />}
          label="H2"
        />
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive('heading', { level: 3 })}
          title="Título 3"
          icon={<Heading3 className="h-4 w-4" />}
          label="H3"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          isActive={editor.isActive('paragraph')}
          title="Parágrafo Normal"
          icon={<AlignLeft className="h-4 w-4" />}
        />
      </div>

      <ToolbarDivider />

      {/* Listas */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Lista com Marcadores"
          icon={<List className="h-4 w-4" />}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Lista Numerada"
          icon={<ListOrdered className="h-4 w-4" />}
        />
      </div>

      <ToolbarDivider />

      {/* Blocos Especiais */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Citação"
          icon={<Quote className="h-4 w-4" />}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          title="Bloco de Código"
          icon={<Code className="h-4 w-4" />}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Linha Horizontal"
          icon={<Minus className="h-4 w-4" />}
        />
      </div>

      <ToolbarDivider />

      {/* Mídia */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton
          onClick={setLink}
          isActive={editor.isActive('link')}
          title="Inserir Link"
          icon={<LinkIcon className="h-4 w-4" />}
        />
        <ToolbarButton
          onClick={addImage}
          title="Inserir Imagem"
          icon={<ImageIcon className="h-4 w-4" />}
        />
      </div>

      <ToolbarDivider />

      {/* Tabelas */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton
          onClick={insertTable}
          title="Inserir Tabela"
          icon={<TableIcon className="h-4 w-4" />}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          disabled={!editor.can().addColumnBefore()}
          title="Adicionar Coluna"
          icon={<Columns className="h-4 w-4" />}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().addRowBefore().run()}
          disabled={!editor.can().addRowBefore()}
          title="Adicionar Linha"
          icon={<Rows className="h-4 w-4" />}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().deleteColumn().run()}
          disabled={!editor.can().deleteColumn()}
          title="Deletar Coluna"
          icon={<Trash2 className="h-4 w-4" />}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().deleteRow().run()}
          disabled={!editor.can().deleteRow()}
          title="Deletar Linha"
          icon={<Trash2 className="h-4 w-4" />}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().deleteTable().run()}
          disabled={!editor.can().deleteTable()}
          title="Deletar Tabela"
          icon={<TableProperties className="h-4 w-4" />}
        />
      </div>
    </div>
  );
};

/**
 * Componente Editor Principal
 */
export function Editor({
  content,
  onChange,
  placeholder = 'Comece a escrever seu conteúdo...',
  className,
  // mode = 'json' // Padrão: JSON para otimização MongoDB (não usado atualmente)
}: EditorProps) {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [viewMode, setViewMode] = useState<'visual' | 'json'>('visual');
  const [jsonValue, setJsonValue] = useState('');
  const [jsonError, setJsonError] = useState('');

  const editor = useEditor({
    immediatelyRender: false, // Fix para SSR no Next.js
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        codeBlock: false, // Desabilita o codeBlock padrão
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'plaintext',
        HTMLAttributes: {
          class: 'code-block-wrapper',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            'text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 underline underline-offset-2 cursor-pointer transition-colors',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-6 shadow-md',
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse table-auto w-full my-6 shadow-sm',
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 dark:border-cyan-400/30',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class:
            'border border-gray-300 dark:border-cyan-400/30 bg-gray-100 dark:bg-cyan-400/10 font-semibold px-4 py-3 text-left',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 dark:border-cyan-400/30 px-4 py-3',
        },
      }),
    ],
    content: typeof content === 'string' ? content : content,
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-base sm:prose-lg dark:prose-invert max-w-none',
          'focus:outline-none min-h-[500px] px-8 py-6',
          'prose-headings:font-bold prose-headings:tracking-tight',
          'prose-h1:text-4xl prose-h1:mb-4 prose-h1:mt-8',
          'prose-h2:text-3xl prose-h2:mb-3 prose-h2:mt-6',
          'prose-h3:text-2xl prose-h3:mb-2 prose-h3:mt-5',
          'prose-p:leading-relaxed prose-p:mb-4',
          'prose-a:font-medium',
          'prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-6',
          'prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:font-mono prose-code:text-sm',
          'prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:my-6 prose-pre:overflow-x-auto',
          'prose-ul:my-4 prose-ol:my-4 prose-li:my-1.5',
          'prose-img:rounded-lg prose-img:shadow-lg',
          'dark:text-gray-100 dark:prose-headings:text-cyan-200 dark:prose-p:text-gray-300',
          'dark:prose-strong:text-cyan-300 dark:prose-code:text-pink-400',
          'dark:prose-blockquote:text-gray-400 dark:prose-li:text-gray-300',
          className
        ),
        'data-placeholder': placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      // Retorna múltiplos formatos para flexibilidade
      const jsonContent = editor.getJSON(); // Formato otimizado para MongoDB
      const htmlContent = editor.getHTML(); // Para preview/renderização
      const textContent = editor.getText(); // Para busca/indexação

      onChange({
        json: jsonContent,
        html: htmlContent,
        text: textContent,
      });

      // Atualiza contadores
      const words = textContent
        .split(/\s+/)
        .filter(word => word.length > 0).length;
      const chars = textContent.length;
      const reading = Math.ceil(words / 200); // ~200 palavras por minuto

      setWordCount(words);
      setCharCount(chars);
      setReadingTime(reading);
    },
  });

  // Sincroniza conteúdo externo com editor
  useEffect(() => {
    if (!editor) return;

    try {
      const currentContent = editor.getJSON();
      const newContent = typeof content === 'string' ? content : content;

      // Evita atualizações desnecessárias
      if (JSON.stringify(currentContent) !== JSON.stringify(newContent)) {
        editor.commands.setContent(newContent, { emitUpdate: false });

        // Atualiza contadores iniciais
        const text = editor.getText();
        const words = text.split(/\s+/).filter(word => word.length > 0).length;
        const chars = text.length;
        const reading = Math.ceil(words / 200);

        setWordCount(words);
        setCharCount(chars);
        setReadingTime(reading);
      }
    } catch (error) {
      console.error('Erro ao sincronizar conteúdo:', error);
    }
  }, [content, editor]);

  // Sincroniza JSON quando muda para modo JSON
  useEffect(() => {
    if (viewMode === 'json' && editor) {
      setJsonValue(JSON.stringify(editor.getJSON(), null, 2));
      setJsonError('');
    }
  }, [viewMode, editor]);

  /**
   * Alterna entre modo visual e JSON
   */
  const handleViewModeChange = useCallback(
    (newMode: 'visual' | 'json') => {
      if (newMode === 'visual' && viewMode === 'json') {
        // Tentando voltar para visual - validar JSON
        try {
          const parsed = JSON.parse(jsonValue);
          if (editor) {
            editor.commands.setContent(parsed, { emitUpdate: false });
            onChange({
              json: parsed,
              html: editor.getHTML(),
              text: editor.getText(),
            });
          }
          setJsonError('');
          setViewMode('visual');
        } catch {
          setJsonError(
            'JSON inválido! Por favor, corrija os erros antes de voltar ao modo visual.'
          );
        }
      } else {
        setViewMode(newMode);
      }
    },
    [viewMode, jsonValue, editor, onChange]
  );

  /**
   * Atualiza JSON quando usuário edita
   */
  const handleJsonChange = useCallback((value: string) => {
    setJsonValue(value);

    // Tenta validar em tempo real
    try {
      JSON.parse(value);
      setJsonError('');
    } catch {
      setJsonError('JSON inválido');
    }
  }, []);

  // Adiciona botões de copiar aos blocos de código
  useEffect(() => {
    if (!editor) return;

    const addCopyButtons = () => {
      const codeBlocks = document.querySelectorAll('.ProseMirror pre');

      codeBlocks.forEach(block => {
        // Remove botão anterior se existir
        const existingBtn = block.querySelector('.code-copy-btn');
        if (existingBtn) existingBtn.remove();

        // Cria novo botão
        const button = document.createElement('button');
        button.className = 'code-copy-btn';
        button.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        `;
        button.title = 'Copiar código';

        button.addEventListener('click', async () => {
          const code = block.querySelector('code');
          if (code) {
            try {
              await navigator.clipboard.writeText(code.textContent || '');
              button.classList.add('copied');
              button.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              `;
              setTimeout(() => {
                button.classList.remove('copied');
                button.innerHTML = `
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                `;
              }, 2000);
            } catch (err) {
              console.error('Falha ao copiar:', err);
            }
          }
        });

        block.appendChild(button);
      });
    };

    // Adiciona botões quando o editor atualizar
    addCopyButtons();
    editor.on('update', addCopyButtons);

    return () => {
      editor.off('update', addCopyButtons);
    };
  }, [editor]);

  return (
    <Card
      className={cn(
        'overflow-hidden border-gray-200 dark:border-cyan-400/20',
        'bg-white dark:bg-gray-950 shadow-lg'
      )}
    >
      <MenuBar
        editor={editor}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />

      {/* Área de Edição */}
      <div className="relative">
        {viewMode === 'visual' ? (
          <EditorContent editor={editor} className="editor-content" />
        ) : (
          /* Modo JSON */
          <div className="p-4">
            {jsonError && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-400 text-sm font-medium">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {jsonError}
                </div>
              </div>
            )}
            <textarea
              value={jsonValue}
              onChange={e => handleJsonChange(e.target.value)}
              className={cn(
                'w-full min-h-[500px] p-4 rounded-lg font-mono text-sm',
                'bg-gray-50 dark:bg-gray-900',
                'border-2 border-gray-200 dark:border-cyan-400/20',
                'focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400',
                'text-gray-900 dark:text-gray-100',
                'transition-all duration-200',
                jsonError && 'border-red-300 dark:border-red-800'
              )}
              placeholder="JSON do conteúdo..."
              spellCheck={false}
            />
            <div className="mt-3 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <FileJson className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  Modo Avançado
                </span>
                <span className="flex items-center gap-1.5">
                  {jsonError ? (
                    <span className="text-red-600 dark:text-red-400">
                      ❌ Inválido
                    </span>
                  ) : (
                    <span className="text-green-600 dark:text-green-400">
                      ✓ Válido
                    </span>
                  )}
                </span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(jsonValue);
                  alert('JSON copiado!');
                }}
                className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                Copiar JSON
              </button>
            </div>
          </div>
        )}

        {/* Estilos customizados do editor */}
        <style jsx global>{`
          /* Placeholder */
          .ProseMirror p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: var(--color-text-secondary);
            pointer-events: none;
            height: 0;
          }

          .ProseMirror:focus {
            outline: none;
          }

          .ProseMirror {
            transition: all 0.2s ease;
          }

          .ProseMirror > * + * {
            margin-top: 0.75em;
          }

          .ProseMirror ul,
          .ProseMirror ol {
            padding: 0 1.5rem;
          }

          .ProseMirror h1,
          .ProseMirror h2,
          .ProseMirror h3 {
            line-height: 1.3;
          }

          /* Código inline */
          .ProseMirror code {
            background-color: var(--color-background-secondary);
            color: var(--color-status-error);
            padding: 0.2em 0.5em;
            border-radius: var(--radius-md);
            font-size: 0.9em;
            font-family: var(--font-mono);
            font-weight: 500;
          }

          .dark .ProseMirror code {
            background-color: var(--color-background-tertiary);
            color: var(--color-status-error);
          }

          /* Bloco de código */
          .ProseMirror .code-block-wrapper {
            position: relative;
            margin: 1.5rem 0;
          }

          .ProseMirror pre {
            background: var(--color-surface-tertiary);
            color: var(--color-text-primary);
            font-family: var(--font-mono);
            padding: 1.25rem;
            border-radius: var(--radius-lg);
            overflow-x: auto;
            line-height: 1.6;
            font-size: 0.9em;
            border: 1px solid var(--color-border-primary);
            position: relative;
          }

          .ProseMirror pre::before {
            content: attr(data-language);
            position: absolute;
            top: 0.5rem;
            right: 0.75rem;
            font-size: 0.7rem;
            text-transform: uppercase;
            color: var(--color-text-tertiary);
            font-weight: 600;
            letter-spacing: 0.05em;
          }

          .ProseMirror pre code {
            background: transparent;
            color: inherit;
            padding: 0;
            font-size: inherit;
            border-radius: 0;
            font-weight: normal;
          }

          /* Syntax Highlighting */
          .ProseMirror pre .hljs-comment,
          .ProseMirror pre .hljs-quote {
            color: var(--color-text-tertiary);
            font-style: italic;
          }

          .ProseMirror pre .hljs-keyword,
          .ProseMirror pre .hljs-selector-tag,
          .ProseMirror pre .hljs-subst {
            color: var(--color-status-error);
          }

          .ProseMirror pre .hljs-number,
          .ProseMirror pre .hljs-literal,
          .ProseMirror pre .hljs-variable,
          .ProseMirror pre .hljs-template-variable,
          .ProseMirror pre .hljs-tag .hljs-attr {
            color: var(--color-brand-secondary);
          }

          .ProseMirror pre .hljs-string,
          .ProseMirror pre .hljs-doctag {
            color: var(--color-status-info);
          }

          .ProseMirror pre .hljs-title,
          .ProseMirror pre .hljs-section,
          .ProseMirror pre .hljs-selector-id {
            color: var(--color-brand-accent);
            font-weight: bold;
          }

          .ProseMirror pre .hljs-type,
          .ProseMirror pre .hljs-class .hljs-title {
            color: var(--color-status-warning);
          }

          .ProseMirror pre .hljs-tag,
          .ProseMirror pre .hljs-name,
          .ProseMirror pre .hljs-attribute {
            color: var(--color-status-success);
          }

          .ProseMirror pre .hljs-regexp,
          .ProseMirror pre .hljs-link {
            color: var(--color-status-info);
          }

          .ProseMirror pre .hljs-symbol,
          .ProseMirror pre .hljs-bullet {
            color: var(--color-brand-secondary);
          }

          .ProseMirror pre .hljs-built_in,
          .ProseMirror pre .hljs-builtin-name {
            color: var(--color-status-warning);
          }

          .ProseMirror pre .hljs-meta {
            color: var(--color-text-tertiary);
          }

          .ProseMirror pre .hljs-deletion {
            background: var(--color-surface-error);
            color: var(--color-status-error);
          }

          .ProseMirror pre .hljs-addition {
            background: var(--color-surface-success);
            color: var(--color-status-success);
          }

          .ProseMirror pre .hljs-emphasis {
            font-style: italic;
          }

          .ProseMirror pre .hljs-strong {
            font-weight: bold;
          }

          /* Botão de copiar */
          .code-copy-btn {
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
            padding: 0.5rem;
            background: var(--color-surface-glass);
            border: 1px solid var(--color-border-primary);
            border-radius: var(--radius-md);
            color: var(--color-text-secondary);
            cursor: pointer;
            opacity: 0;
            transition: all 0.2s;
            z-index: 10;
          }

          .ProseMirror pre:hover .code-copy-btn {
            opacity: 1;
          }

          .code-copy-btn:hover {
            background: var(--color-surface-secondary);
            color: var(--color-brand-primary);
            border-color: var(--color-brand-primary);
          }

          .code-copy-btn.copied {
            color: var(--color-status-success);
            border-color: var(--color-status-success);
          }

          /* Citações */
          .ProseMirror blockquote {
            border-left: 4px solid var(--color-brand-primary);
            padding-left: 1.25rem;
            font-style: italic;
            color: var(--color-text-secondary);
            margin: 1.5rem 0;
          }

          .dark .ProseMirror blockquote {
            color: var(--color-text-secondary);
            border-left-color: var(--color-brand-primary);
          }
        `}</style>
      </div>

      {/* Barra de Status Otimizada */}
      <div className="border-t border-gray-200 dark:border-cyan-400/20 px-6 py-3 bg-gray-50 dark:bg-gray-900/50 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          {/* Palavras */}
          <span className="font-medium flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-cyan-600 dark:text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
              {wordCount}
            </span>
            <span className="hidden sm:inline">palavras</span>
          </span>

          <span className="text-gray-400 dark:text-gray-600 hidden sm:inline">
            •
          </span>

          {/* Caracteres */}
          <span className="font-medium flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-cyan-600 dark:text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
              {charCount}
            </span>
            <span className="hidden sm:inline">caracteres</span>
          </span>

          <span className="text-gray-400 dark:text-gray-600 hidden sm:inline">
            •
          </span>

          {/* Tempo de Leitura */}
          <span className="font-medium flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-purple-600 dark:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-purple-600 dark:text-purple-400 font-semibold">
              {readingTime === 0 ? '< 1' : readingTime}
            </span>
            <span className="hidden sm:inline">min de leitura</span>
            <span className="sm:hidden">min</span>
          </span>

          <span className="text-gray-400 dark:text-gray-600 hidden sm:inline">
            •
          </span>

          {/* Status JSON */}
          <span
            className="font-medium text-green-600 dark:text-green-400 hidden md:flex items-center gap-1.5"
            title="Formato otimizado para MongoDB"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            JSON Otimizado
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden lg:inline text-gray-500 dark:text-gray-500 text-xs">
            Editor Profissional v2.0
          </span>
          <span className="text-xs px-2.5 py-1 bg-linear-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 text-cyan-700 dark:text-cyan-300 rounded-full font-semibold shadow-sm border border-cyan-200 dark:border-cyan-800/30">
            MongoDB Ready
          </span>
        </div>
      </div>
    </Card>
  );
}
