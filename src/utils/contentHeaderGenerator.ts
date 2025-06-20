
export const generateContentHeaders = (content: string): string[] => {
  const lines = content.split('\n');
  const headers: string[] = [];
  
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('#') || trimmed.startsWith('##') || trimmed.startsWith('###')) {
      headers.push(trimmed.replace(/^#+\s*/, ''));
    }
  });
  
  return headers;
};

export const extractSectionContent = (content: string, sectionTitle: string): string => {
  const lines = content.split('\n');
  let capturing = false;
  let result = '';
  
  for (const line of lines) {
    if (line.trim().startsWith('#') && line.includes(sectionTitle)) {
      capturing = true;
      continue;
    }
    
    if (capturing && line.trim().startsWith('#')) {
      break;
    }
    
    if (capturing) {
      result += line + '\n';
    }
  }
  
  return result.trim();
};
