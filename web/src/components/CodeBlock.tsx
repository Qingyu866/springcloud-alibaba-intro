import React, { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-properties';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, filename, title }) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
      fallbackCopy(code);
    }
  };

  const fallbackCopy = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('降级复制也失败:', err);
    }
    document.body.removeChild(textarea);
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-header">
        {(title || filename) && (
          <span className="code-filename">{title || filename}</span>
        )}
        {!title && !filename && (
          <span className="code-language">{language.toUpperCase()}</span>
        )}
        <button
          onClick={handleCopy}
          className="copy-button"
          aria-label="复制代码"
        >
          {copied ? '✓ 已复制' : '📋 复制'}
        </button>
      </div>
      <pre className="code-content">
        <code ref={codeRef} className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

interface InlineCodeProps {
  children: React.ReactNode;
}

export const InlineCode: React.FC<InlineCodeProps> = ({ children }) => {
  return (
    <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-primary-700 dark:text-primary-300 rounded text-sm font-mono">
      {children}
    </code>
  );
};
