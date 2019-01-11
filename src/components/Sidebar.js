import React from "react"
import styled from "styled-components"
import { graphql, StaticQuery } from "gatsby"
import { Button } from "@material-ui/core"

import Logo from "./Logo"
import TreeView from "./TreeView"
import withSimpleErrorBoundary from "../util/withSimpleErrorBoundary"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"

const StyledIcon = styled(FontAwesomeIcon)`
  vertical-align: middle;
  margin-right: 0.5rem;
  margin-left: 0.1rem;
  color: var(--color);
  font-size: 1.5em;
`

export const SIDEBAR_WIDTH = "20rem"

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;

  ${props =>
    !props.mobileMenuOpen &&
    `
      display: none;
    `}

  @media only screen and (min-width: 1200px) {
    height: 100%;
    width: ${SIDEBAR_WIDTH};
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    z-index: 100;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    overflow-y: scroll;
    display: flex;
  }
  @media only screen and (max-width: 1200px) {
    width: 90%;
    max-width: 500px;
    margin: 0 auto;
  }
`
const LogoContainer = styled.div`
  display: flex;
  background-color: white;
  justify-content: space-around;
  align-content: center;
  align-items: center;
`

const TreeViewContainer = styled.nav`
  flex: 1;
`

const Brand = styled.div`
  width: 100%;
  text-align: center;
  padding: 1rem;
  padding-top: 2rem;
  font-weight: bold;
  color: #6a3e23;
  font-size: 1.3rem;
`

const MenuExpanderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  @media only screen and (min-width: 1200px) {
    display: none;
  }
`

var content2 = [
  {
    title: "Tietoa kurssista",
    path: "/",
  },
  {
    title: "Osaamistavoitteet",
    path: "/osaamistavoitteet",
  },
  {
    title: "Arvostelu ja kokeet",
    path: "/arvostelu",
  },
  { title: "Tukiväylät", path: "/tukivaylat" },
  {
    title: "Opettajille ja opinto-ohjaajille",
    path: "/opettajille",
  },
  { separator: true },
]

var futurePages = [
  { title: "Osa 1", tba: "14.1.2019" },
  { title: "Osa 2", tba: "21.1.2019" },
  { title: "Osa 3", tba: "28.1.2019" },
  { title: "Osa 4", tba: "4.2.2019" },
  { title: "Osa 5", tba: "11.2.2019" },
  { title: "Osa 6", tba: "18.2.2019" },
  { title: "Osa 7", tba: "25.2.2019" },
]

const MobileWrapper = styled.div`
  @media only screen and (max-width: 1200px) {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999999;
    overflow-y: scroll;
    background-color: white;
  }
`

const MobileWrapperOrFragment = props => {
  if (props.mobileMenuOpen) {
    return <MobileWrapper {...props} />
  }
  return <div {...props} />
}

class Sidebar extends React.Component {
  render() {
    let edges =
      this.props.data?.allMarkdownRemark?.edges.map(o => o.node?.frontmatter) ||
      []
    if (process.env.NODE_ENV === "production") {
      edges = edges.filter(o => !o.hidden)
    }
    let content = content2.concat(edges)
    content = content.concat(futurePages)
    return (
      <MobileWrapperOrFragment mobileMenuOpen={this.props.mobileMenuOpen}>
        <MenuExpanderWrapper>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.props.toggleMobileMenu}
          >
            {this.props.mobileMenuOpen ? (
              <span>
                <StyledIcon icon={faTimes} />
                Sulje valikko
              </span>
            ) : (
              <span>
                <StyledIcon icon={faBars} />
                Avaa valikko
              </span>
            )}
          </Button>
        </MenuExpanderWrapper>
        <SidebarContainer mobileMenuOpen={this.props.mobileMenuOpen}>
          <Brand>Tietokantojen perusteet 2019</Brand>
          <TreeViewContainer>
            <TreeView data={content} />
          </TreeViewContainer>
          <LogoContainer>
            <Logo />
          </LogoContainer>
        </SidebarContainer>
      </MobileWrapperOrFragment>
    )
  }
}

const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/index.md/" } }
      sort: { fields: [frontmatter___path] }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
            hidden
          }
        }
      }
    }
  }
`

const SidebarWithData = props => (
  <StaticQuery
    query={query}
    render={data => <Sidebar data={data} {...props} />}
  />
)

export default withSimpleErrorBoundary(SidebarWithData)
