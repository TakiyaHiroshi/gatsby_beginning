/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { path } = require("path");

// You can delete this file if you're not using it
exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    return graphql(`
    {
        allWorksYaml {
            edges {
                node {
                    slug
                }
            }
        }
    }
    `).then(result => {
        result.data.allWorksYaml.edges.map(edge => {
            const work = edge.node;
            const workComponent = require.resolve("./src/templates/work.js");

            // デバッグ用にログを出力しておくと便利
            console.log("Create Page", `/works/${work.slug}`);
            createPage({
                // workのslugを元にパスを組み立てて文字列で渡します。
                path: `/works/${work.slug}`,
                // path.resolveを使うと絶対パスに変換してくれます。
                component: workComponent,
                // コンポーネントに渡すデータを指定しています。
                // ここに与えた値がGraphQLの変数としてセットされます。
                context: {
                    slug: work.slug,
                },
            });
        });
    });
};