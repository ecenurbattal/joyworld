module.exports.getNews = (req,res) => {
    const axios = require('axios');
    const jsdom = require('jsdom');

    const {JSDOM} = jsdom;

    const url = 'https://fanzade.com/comicsfan/cizgi-roman-haber/';


const getFirstDegreeChild = (item,childIndex) => {
    return item.children[childIndex]
}

const getSecondDegreeChild = (item,firstChildIndex,secondChildIndex) => {
    return item.children[firstChildIndex].children[secondChildIndex]
}

const uniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))

const getNodes = (html) => {
    const data = [];

    const dom = new JSDOM(html)

    const news = dom.window.document.querySelectorAll('.p-feat a');
    news.forEach(item => {
        if(getFirstDegreeChild(item,0) && item.getAttribute('href').includes('/comicsfan')){
            data.push({
                title: item.getAttribute('title'),
                href: item.getAttribute('href'),
                image: getSecondDegreeChild(item,0,0).getAttribute('data-src')
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
