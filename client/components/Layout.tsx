import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Nav from "./NavBar";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};

export default Layout;

const NavBar = styled.div``;
