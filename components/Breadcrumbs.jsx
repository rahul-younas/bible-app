 "use client"
 
 import Link from "next/link"
 import { usePathname } from "next/navigation"
 import { ChevronRight } from "lucide-react"
 
 function formatLabel(segment) {
   const map = {
     "bible": "Bible",
     "new-testament": "New Testament",
     "old-testament": "Old Testament",
   }
   if (map[segment]) return map[segment]
   const decoded = decodeURIComponent(segment)
   const spaced = decoded.replace(/-/g, " ")
   return spaced.replace(/\b\w/g, c => c.toUpperCase())
 }
 
 export default function Breadcrumbs() {
   const pathname = usePathname()
   if (!pathname || !pathname.startsWith("/bible")) return null
   const segments = pathname.split("/").filter(Boolean)
   const items = []
   let href = ""
   for (let i = 0; i < segments.length; i++) {
     href += "/" + segments[i]
     items.push({ href, label: formatLabel(segments[i]) })
   }
   return (
     <nav aria-label="Breadcrumb" className="mx-auto w-full px-2 md:px-5 max-w-6xl py-3 rounded-lg sticky top-0 bg-black">
       <ol className="flex items-center gap-1 text-white text-[12px] md:text-base">
         {items.map((item, idx) => {
           const isLast = idx === items.length - 1
           return (
             <li key={item.href} className="flex items-center gap-1 font-semibold">
               {isLast ? (
                 <span className="font-medium text-[12px] md:text-base text-white">{item.label}</span>
               ) : (
                 <Link href={item.href} className="hover:text-white transition-colors">
                   {item.label}
                 </Link>
               )}
               {!isLast && <ChevronRight className="size-4" />}
             </li>
           )
         })}
       </ol>
     </nav>
   )
 }
