const fs = require("fs");
const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`)
const twitterCard = require('twitter-card-image');


exports.onCreateNode = async ({ node, actions, getNode, reporter }, options) => {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        let slug = createFilePath({ node, getNode });
        if (slug.endsWith('/')) {
            slug = slug.substring(0, slug.length - 1);
        }
        const { title, description, excerpt } = node.frontmatter;

        const outputDir = path.join(
            "./static",
            "twitter-cards");

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir)
        }

        const output = path.join(
            outputDir,
            slug + ".jpg"
        );

        if (!fs.existsSync(output) || options.overwrite) {
            const cardOptions = { ...options };
            cardOptions.texts = options.texts.map(text => {
                let newText = { ...text };
                if (/\$title/.test(text.text)) {
                    newText.text = title;
                }
                else if (/\$description/.test(text.text)) {
                    newText.text = description;
                }
                else if (/\$excerpt/.test(text.text)) {
                    newText.text = excerpt;
                }
                return newText;
            })
            cardOptions.output = output;
            await twitterCard({ ...cardOptions });
            reporter.success(`Card created ${output}`)
        } else {
            reporter.info(`Already exists, skip: ${output}`)
        }

        const twitterImagePath = `twitter-cards${slug}.jpg`;
        createNodeField({
            name: `twitterCardImage`,
            node,
            value: twitterImagePath,
        })
    }
}
