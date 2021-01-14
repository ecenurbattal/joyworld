module.exports.getNews = (req,res) => {
    const axios = require('axios');
    const jsdom = require('jsdom');
    const {getElement} = require('../utils/domChildUtils')

    const {JSDOM} = jsdom;

    const url = 'https://www.edebiyathaber.net/category/kitaplar-arasinda/';


    const getNodes = (html) => {
        const data = [];
    
        const dom = new JSDOM(html)
    
        const news = dom.window.document.querySelectorAll('.article-wrap-inner');
        news.forEach(item => {
            data.push({
                title: getElement(item,'article-title entry-title').children[0].textContent,
                href: getElement(item,'article-title entry-title').children[0].getAttribute('href'),
                image: getElement(item,'pp-excerpt-img').getAttribute('src'),
                summary: getElement(item,'article-content').children[2].textContent
            })
        })
        return data;
    }

    try{
        axios.get(url)
        .then(response => {
            res.status(200).send((getNodes(response.data)))
        })
        .catch(error => {
            res.sendStatus(500)
        })
    } catch(error){
        res.sendStatus(500)
    }
}