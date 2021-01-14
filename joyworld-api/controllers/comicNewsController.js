module.exports.getNews = (req,res) => {
    const axios = require('axios');
    const jsdom = require('jsdom');
    const {getElement} = require('../utils/domChildUtils')

    const {JSDOM} = jsdom;

    const url = 'https://fanzade.com/comicsfan/cizgi-roman-haber/';


const uniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))

const getNodes = (html) => {
    const data = [];

    const dom = new JSDOM(html)

    const news = dom.window.document.querySelectorAll('.p-wrap');
    news.forEach(item => {
        if(getElement(item,'entry-summary')){
            data.push({
                title:  getElement(item,'p-flink').getAttribute('title'),
                href:  getElement(item,'p-flink').getAttribute('href'),
                image: getElement(item,'rb-lazyload').getAttribute('data-src'),
                summary: getElement(item,'entry-summary').textContent.replace('\t\t\t\t\t\t','')
            })
        }
    });
    
    return uniqueArray(data);
}

    try{
        axios.get(url)
        .then(response => {
            res.status(200).send((getNodes(response.data)))
        })
        .catch(error => {
            res.sendStatus(500);
        })
    } catch(error){
        res.sendStatus(500)
    }
}
