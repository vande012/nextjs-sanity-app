import type { PortableTextBlock } from 'next-sanity'
import Link from 'next/link'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import type { SettingsPayload, MenuItem } from '@/types'
import logo from '/app/logo.png'
import name from '/app/name.png'
import { resolveHref } from '@/sanity/lib/utils'


interface FooterProps {
  data: SettingsPayload
}

export default function Footer(props: FooterProps) {
  const { data } = props
  const footer = data?.footer || ([] as PortableTextBlock[])
  const menuItems = data?.menuItems || ([] as MenuItem[])

  return (
    <footer className="bg-custom-light text-white py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start md:w-1/3">
            <Link href="/" className="flex items-center mb-4">
              <img src={logo.src} alt="Logo" className="w-12 h-12" />
              <img src={name.src} alt="Name" className="pl-3 w-52" />
            </Link>
            {footer && (
              <div className="mt-4 md:mt-6 md:max-w-md text-center md:text-left">
                <CustomPortableText
                  paragraphClasses="text-sm md:text-base text-gray-600"
                  value={footer}
                />
              </div>
            )}
          </div>
          <nav
            className="mt-8 md:mt-0 md:mx-auto md:w-1/3"
            aria-label="Footer links"
          >
            <div className="flex flex-col md:flex-row md:space-x-6">
              {menuItems.map((menuItem, key) => {
                const href = resolveHref(menuItem?._type, menuItem?.slug)
                if (!href) {
                  return null
                }
                return (
                  <Link
                    key={key}
                    className={`block text-sm md:text-base font-bold hover:text-gray-300 ${
                      menuItem?._type === 'home'
                        ? 'font-extrabold text-white'
                        : 'text-gray-600'
                    }`}
                    href={href}
                  >
                    {menuItem.title}
                  </Link>
                )
              })}
              <Link
            className="block text-sm md:text-base font-bold text-gray-600 hover:text-gray-300"
            href="/posts"
          >
            Blog
          </Link>
            </div>

          </nav>
          
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Brehm-Rose Health LLC. All rights reserved.
          <Link
            className="block text-sm md:text-base font-bold text-gray-600 hover:text-gray-300"
            href="/sitemap"
          >
            Sitemap
          </Link>
        </div>
        
      </div>
    </footer>
  )
}
