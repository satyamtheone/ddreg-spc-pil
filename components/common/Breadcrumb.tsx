// "use client";

// import { usePathname, useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { AiOutlineHome } from "react-icons/ai";
// import { useMemo, useEffect, useState } from "react";

// const Breadcrumb = () => {
// //   const { isSuperAdmin, isRootAdmin } = useAuth();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const [productId, setProductId] = useState<string | null>(null);

//   useEffect(() => {
//     const idFromQuery = searchParams.get("productId");

//     if (idFromQuery) {
//       setProductId(idFromQuery);
//       return;
//     }

//     // fallback from pathname
//     const match = pathname.match(/product\/([^/]+)/);
//     if (match) {
//       setProductId(match[1]);
//     }
//   }, [pathname, searchParams]);

//   const isDashboard = pathname === "/dashboard";

//   const breadcrumbTrail = useMemo(() => {
//     const links = NavLinks(productId);

//     const findBreadcrumbs = (items: any[], trail: any[] = []): any[] => {
//       for (const item of items) {
//         const itemPath = item.link.split("?")[0];

//         if (pathname.startsWith(itemPath)) {
//           const newTrail = [...trail, item];

//           if (item.children) {
//             const childMatch = findBreadcrumbs(item.children, newTrail);
//             if (childMatch.length) return childMatch;
//           }

//           return newTrail;
//         }
//       }
//       return [];
//     };

//     return findBreadcrumbs(links);
//   }, [pathname, productId]);

//   return (
//     <div className="breadcrumbs text-xs">
//       <ul>
//         {!isDashboard && (
//           <li className="text-gray-500">
//             <Link href="/dashboard" className="flex items-center gap-1">
//               <AiOutlineHome size={18} />
//               Dashboard
//             </Link>
//           </li>
//         )}

//         {breadcrumbTrail.map((item, index) => (
//           <li key={`${item.link}-${index}`}>
//             <Link href={item.link} className="flex items-center gap-1">
//               {item.icon}
//               {item.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Breadcrumb;