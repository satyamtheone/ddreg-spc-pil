export interface NavItem {
  title: string;
  icon: string;
  link: string;
  hidden: boolean;
  className: string;
  iconFolder?: string;
}

export const NavData: NavItem[] = [
  {
    title: "Dashboard",
    icon: "Icon-01.svg",
    link: "/dashboard",
    hidden: false,
    className: "bg-white",
    iconFolder: "black",
  },
  {
    title: "Generate SPC / PIL",
    icon: "Icon-02.svg",
    link: "/generate-SPC-PIL",
    hidden: false,
    className: "bg-gradient border-transparent text-white",
    iconFolder: "white",
  },
  {
    title: "Document Editor",
    icon: "Icon-03.svg",
    link: "/document-editor",
    hidden: false,
    className: "bg-gradient border-transparent text-white",
    iconFolder: "white",
  },
  // {
  //   title: "Workflow Management",
  //   icon: "Icon-04.svg",
  //   link: "/workflow-management",
  //   hidden: false,
  //   className: "bg-gradient border-transparent text-white",
  //   iconFolder: "white",
  // },
  {
    title: "Document Repository",
    icon: "Icon-05.svg",
    link: "/document-repository",
    hidden: false,
    className: "bg-gradient border-transparent text-white",
    iconFolder: "white",
  },
  {
    title: "Template Library",
    icon: "Icon-06.svg",
    link: "/template-library",
    hidden: false,
    className: "bg-gradient border-transparent text-white",
    iconFolder: "white",
  },
  // {
  //   title: "Regulatory Intelligence",
  //   icon: "Icon-07.svg",
  //   link: "/regulatory-intelligence",
  //   hidden: false,
  //   className: "bg-gradient border-transparent text-white",
  //   iconFolder: "white",
  // },
  // {
  //   title: "Compare Documents",
  //   icon: "Icon-08.svg",
  //   link: "/compare-documents",
  //   hidden: false,
  //   className: "bg-gradient border-transparent text-white",
  //   iconFolder: "white",
  // },
  // {
  //   title: "Audit & Version History",
  //   icon: "Icon-09.svg",
  //   link: "/audit-version-history",
  //   hidden: false,
  //   className: "bg-gradient border-transparent text-white",
  //   iconFolder: "white",
  // },
  // {
  //   title: "Notification Center",
  //   icon: "Icon-10.svg",
  //   link: "/notification-center",
  //   hidden: false,
  //   className: "bg-gradient border-transparent text-white",
  //   iconFolder: "white",
  // },
  {
    title: "Settings",
    icon: "Icon-11.svg",
    link: "/settings",
    hidden: false,
    className: "bg-gradient border-transparent text-white",
    iconFolder: "white",
  },
  {
    title: "Account",
    icon: "Icon-13.svg",
    link: "/account",
    hidden: true,
    className: "bg-gradient border-transparent text-white",
    iconFolder: "white",
  },
];
