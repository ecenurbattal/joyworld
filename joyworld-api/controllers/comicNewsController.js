module.exports.getNews = (req,res) => {
    const axios = require('axios');
    const jsdom = require('jsdom');
    const {getFirstDegreeChild,getThirdDegreeChild,getFifthDegreeChild} = require('../utils/domChildUtils')

    const {JSDOM} = jsdom;

    const url = 'https://fanzade.com/comicsfan/cizgi-roman-haber/';


const uniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))

const getNodes = (html) => {
    const data = [];

    const dom = new JSDOM(html)

    const news = dom.window.document.querySelectorAll('.p-wrap');
    news.forEach(item => {
        // console.log(getElementInsideElement(item,'entry-summary'))
        if(getFirstDegreeChild(item,2)){
            data.push({
                title:  getThirdDegreeChild(item,0,0,0).getAttribute('title'),
                href:  getThirdDegreeChild(item,0,0,0).getAttribute('href'),
                image: getFifthDegreeChild(item,0,0,0,0,0).getAttribute('data-src'),
                summary: getFirstDegreeChild(item,2).textContent.replace('\t\t\t\t\t\t','')
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
            res.status(500).send({message:error})
        })
    } catch(error){
        res.status(500).send({message:error})
    }
    
}
