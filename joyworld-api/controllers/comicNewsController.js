module.exports.getNews = (req,res) => {
    const axios = require('axios');
    const jsdom = require('jsdom');

    const {JSDOM} = jsdom;

    const url = 'https://fanzade.com/comicsfan/cizgi-roman-haber/';


const getNodes = (html) => {
    const data = [];

    const dom = new JSDOM(html)

    const news = dom.window.document.querySelectorAll('.p-feat a');
    news.forEach(item => {
        if(item.children[0]){
            data.push({
                title: item.getAttribute('title'),
                href: item.getAttribute('href'),
                image: item.children[0].children[0].getAttribute('data-src')
            })
        }
    });

    return data;
}

    try{
        axios.get(url)
        .then(response => {
            res.status(200).send((getNodes(response.data)))
        })
        .catch(error => {
            res.status(500).send({message:error})
        })
    } catch(error){
        res.status(500).send({message:error})
    }
    
}