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
     <nav aria-label="Breadcrumb" className="mx-auto w-[90%] max-w-6xl py-2 mt-5">
       <ol className="flex items-center gap-2 text-sm text-muted-foreground">
         {items.map((item, idx) => {
           const isLast = idx === items.length - 1
           return (
             <li key={item.href} className="flex items-center gap-2">
               {isLast ? (
                 <span className="font-medium text-foreground text-lg">{item.label}</span>
               ) : (
                 <Link href={item.href} className="hover:text-foreground transition-colors">
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
