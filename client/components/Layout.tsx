import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return <div>{children}</div>;
};

export default Layout;

const NavBar = styled.div``;
