
import { GraphQLClient, gql } from 'graphql-request'

const graphQLClient = new GraphQLClient('https://graphql.us.fauna.com/graphql', {
headers: {
    authorization: `Bearer ${process.env.FAUNA_ADMIN_KEY}`,
  },
})

const Sitemap = () => {

}

export async function getServerSideProps({res}) {

    const query = gql`
    query listItems {
        allItems(_size:1000) {
          data {
            itemID
            itemName
            itemSlug
          }
        }
      }
    `
  
    const data = await graphQLClient
      .request(query)

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        
      ${data.allItems.data.map((c) => {
        return `
            <url>
                <loc>https://www.example.com/item/${c.itemSlug}</loc>
            </url>
        `
      }).join("")}

    </urlset>
    `;

        console.log(sitemap)
        res.setHeader("Content-Type", "text/xml");
        res.write(sitemap);
        res.end();

return { 
    props: {}
 }

}

export default Sitemap