const contentful = require('contentful');

const config = {
    spaceId: 'zdojcjv5w4r6',
    deliveryToken: '312fed15ad930ff0873a9934c97ffc8cb927fc0a81e9731f1ba632f01c0a5af6',
    deliveryHost: '',
    previewToken: 'c8dffcd33f067620105f2de4818f59ad59c8834c797570fa8623e7964eafd59c',
    previewHost: ''
}

module.exports.deliveryClient = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: config.spaceId,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: config.deliveryToken,
    removeUnresolved: true
});

module.exports.previewClient = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: config.spaceId,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: config.previewToken,
});

// module.exports.getMenus = () => {
//     return deliveryClient.getEntries()
//         .then((response) => response.items
//         ).catch((err) => console.log(err));
// }