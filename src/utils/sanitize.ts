import DOMPurify from 'dompurify';

export const sanitizeQuillHtml = (html: string): string => {
    if (typeof window === 'undefined') return html;
    
    // Configurar DOMPurify para limpiar elementos específicos de Quill
    const clean = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['h1', 'h2', 'h3', 'p', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'a', 'br'],
        ALLOWED_ATTR: ['href', 'target']
    });
    
    // Remover elementos vacíos de Quill
    return clean
        .replace(/<span[^>]*class="ql-ui"[^>]*>.*?<\/span>/gi, '')
        .replace(/data-list="[^"]*"/gi, '')
        .replace(/<p><br><\/p>/gi, '<p>&nbsp;</p>');
};