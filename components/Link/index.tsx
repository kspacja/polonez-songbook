import { ReactNode } from 'react';
import Link from 'next/link';

interface LinkProps {
  href: string;
  children: ReactNode;
}

export default function CustomLink({ href, children }: LinkProps) {
  console.log(href, children);
  return href.startsWith('#') ? (
    <a href={href}>{children}</a>
  ) : (
    <Link href={href}>{children}</Link>
  );
}
