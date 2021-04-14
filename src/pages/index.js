import React from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import get from 'lodash/get'
import {Image, Header, Container, Menu} from 'semantic-ui-react'
import ProductList from '../components/ProductList'
import SEO from '../components/SEO'
import logo from '../images/logo.png'
import Layout from '../components/Layout'
import ShoppingCartIcon from '../components/Header/ShoppingCartIcon'

const StoreIndex = ({location}) => {
  const data = useStaticQuery(graphql`
    query IndexQuery {
      site {
        siteMetadata {
          title
        }
      }
      allMoltinProduct {
        edges {
          node {
            id
            name
            description
            mainImageHref
            meta {
              display_price {
                with_tax {
                  amount
                  currency
                  formatted
                }
              }
            }
            mainImage {
              childImageSharp {
                sizes(maxWidth: 600) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  `)

  const siteTitle = get(data, 'site.siteMetadata.title')
  const products = get(data, 'allMoltinProduct.edges')
  const filterProductsWithoutImages = products.filter(v => v.node.mainImageHref)
  return (
    <Layout location={location}>
      <SEO title={siteTitle} />
      <Header
        as="h3"
        icon
        textAlign="center"
        style={{
          marginBottom: '2em',
        }}
      >
        <Header.Content
          style={{
            margin: '0 auto',
          }}
        >
          <Image src={logo} alt="logo" />
          {/*<div className="ui fluid input">*/}
          {/*  <input*/}
          {/*    id="search"*/}
          {/*    name="search"*/}
          {/*    type="search"*/}
          {/*    value=""*/}
          {/*    placeholder="Search..."*/}
          {/*  />*/}
          {/*  <ShoppingCartIcon name="Cart" />*/}
          {/*</div>*/}
        </Header.Content>
        <Menu size="huge" borderless pointing color="#0097d6">
          <Container text>
            <Menu.Menu position="right">
              <Menu.Item
                style={{color: '#0097d6', fontSize: '15px', fontWeight: 900}}
              >
                HOME
              </Menu.Item>
              <Menu.Item
                style={{color: '#0097d6', fontSize: '15px', fontWeight: 900}}
              >
                PRODUCTS
              </Menu.Item>
              <Menu.Item
                style={{color: '#0097d6', fontSize: '15px', fontWeight: 900}}
              >
                RESOURCE + SERVICES
              </Menu.Item>
              <Menu.Item
                style={{color: '#0097d6', fontSize: '15px', fontWeight: 900}}
              >
                OUR HISTORY
              </Menu.Item>
              <Menu.Item
                style={{color: '#0097d6', fontSize: '15px', fontWeight: 900}}
              >
                ABOUT ACE
              </Menu.Item>
              <Menu.Item
                style={{color: '#0097d6', fontSize: '15px', fontWeight: 900}}
              >
                CONTACT
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
      </Header>
      <ProductList products={filterProductsWithoutImages} />
    </Layout>
  )
}

export default StoreIndex
