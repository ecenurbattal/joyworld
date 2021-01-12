module.exports.getNews = (req,res) => {
    const axios = require('axios');
    const jsdom = require('jsdom');
    const {getFourthDegreeChild,getThirdDegreeChild,getSecondDegreeChild} = require('../utils/domChildUtils')

    const {JSDOM} = jsdom;

    const url = 'https://www.edebiyathaber.net/category/kitaplar-arasinda/';


    const getNodes = (html) => {
        const data = [];
    
        const dom = new JSDOM(html)
    
        const news = dom.window.document.querySelectorAll('.article-wrap-inner');
        news.forEach(item => {
            data.push({
                title: getFourthDegreeChild(item,0,0,0,0).textContent,
                href: getFourthDegreeChild(item,0,0,0,0).getAttribute('href'),
                image: getThirdDegreeChild(item,1,0,0).getAttribute('src'),
                summary: getSecondDegreeChild(item,1,2).textContent
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
            res.status(500).send({message:error})
        })
    } catch(error){
        res.status(500).send({message:error})
    }
}