'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface NavLink {
  href: string
  label: string
}

export default function NavMenu({ links, minWidth = 1000, listWidget}: { links: NavLink[]; minWidth? : number | undefined, listWidget?: React.ReactNode[]}) {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < minWidth);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  if (!isMobile) {
    return (
      <div className="flex items-center gap-4">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
        {listWidget?.map((widget, index) => (
          <div key={index} className="contents">
            {widget}
          </div>
        ))}
      </div>
    );
  }

  return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-full">
              {links.map((link) => (
                <DropdownMenuItem key={link.href} onClick={() => router.push(link.href)}>
                  {link.label}
                </DropdownMenuItem>
              ))}
              {listWidget?.map((widget, index) => (
                <DropdownMenuItem key={index}>
                  {widget}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
       
  );
}
