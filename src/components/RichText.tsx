import { theme } from '@/styles/theme';

type ValidLinkColor = keyof typeof theme.links;

interface Props {
  text: string;
  defaultColor?: ValidLinkColor;
  linkClassName?: string;
}

export function RichText({ text, defaultColor = 'social', linkClassName = '' }: Props) {
  const parts = text.split(/\[(.*?)\]\((.*?)(?:,\s*color=(\w+))?\)/);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 4 === 0) return part || null;
        if (i % 4 === 1) {
          const url = parts[i + 1];
          const colorParam = parts[i + 2] as ValidLinkColor;
          const linkColor = colorParam && theme.links[colorParam] ? colorParam : defaultColor;
          return (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-200 ${linkClassName}`}
              style={{ color: theme.links[linkColor].default, textDecoration: 'underline' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = theme.links[linkColor].hover; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = theme.links[linkColor].default; }}
            >
              {part}
            </a>
          );
        }
        return null;
      })}
    </>
  );
}
