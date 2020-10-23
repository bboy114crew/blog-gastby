// @flow strict
import React from 'react';
import { graphql } from 'gatsby';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';

const NotFoundTemplate = ({ data }) => {
  const { title, subtitle } = useSiteMetadata();
  return (
    <Layout title={`Not Found - ${title}`} description={subtitle}>
      <Sidebar />
      <Page>
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <p
            style={{
              textAlign: 'center',
              color: 'rgba(0, 0, 0, 0.85)',
              fontSize: 24,
              lineHeight: 1.8,
              marginBottom: 0,
            }}
          >
            404
          </p>
          <p
            style={{
              textAlign: 'center',
              color: 'rgba(0,0,0,.45)',
              fontSize: 14,
              lineHeight: 1.6,
              marginBottom: 0,
            }}
          >
            Sorry, the page you visited does not exist.
          </p>
          <img
            src={data.allImageSharp.nodes[0].original.src}
            alt="Not found image"
            style={{
              maxHeight: 400,
            }}
          />
        </div>
      </Page>
    </Layout>
  );
};

export const query = graphql`
  {
    allImageSharp(
      filter: { id: { eq: "c173548b-71e4-558e-b627-7508ee7fbead" } }
    ) {
      nodes {
        id
        original {
          src
        }
      }
    }
  }
`;

export default NotFoundTemplate;
