import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return <div>{children}</div>;
};

export default Layout;
