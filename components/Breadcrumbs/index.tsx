import Link from 'components/Link';

import {
  BreadcrumbsList,
  BreadcrumbsCurrent,
  BreadcrumbsCurrentLabel,
} from './styles';

interface BreadcrubmsProps {
  path: { href?: string; text: string; label?: string }[];
}

export default function Breadcrumbs({ path }: BreadcrubmsProps) {
  return (
    <BreadcrumbsList>
      {path.map(({ href, text, label }) => (
        <li key={href || 'current'}>
          {href && <Link href={href}>{text}</Link>}
          {!href && (
            <BreadcrumbsCurrent aria-current="page">
              {label && (
                <BreadcrumbsCurrentLabel>{label}</BreadcrumbsCurrentLabel>
              )}
              {text}
            </BreadcrumbsCurrent>
          )}
        </li>
      ))}
    </BreadcrumbsList>
  );
}
