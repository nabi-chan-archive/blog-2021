import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";

const Header = () => {
  return (
    <Navbar
      collapseOnSelect
      expand={"sm"}
      variant={"light"}
      sticky={"top"}
      as={"header"}
    >
      <Container>
        <Link href={"/"}>
          <Navbar.Brand href={"/"}>{"PINOT"}</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Link href={"/"}>
              <Nav.Link href={"/"}>{"최근 작성한 글"}</Nav.Link>
            </Link>
          </Nav>

          <Nav>
            <Link href={"/login"}>
              <Nav.Link href={"/login"}>{"로그인"}</Nav.Link>
            </Link>
            <Link href={"/create"}>
              <Nav.Link href={"/create"}>{"글쓰기"}</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
