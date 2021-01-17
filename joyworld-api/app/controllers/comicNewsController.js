import axios from 'axios'
import jsdom from 'jsdom'
import {getElement} from '../utils/domChildUtils.js';

export const getNews = async (req,res) => {
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
        await axios.get(url)
        .then(response => {
            res.status(200).json((getNodes(response.data)))
        })
        .catch(error => {
            res.status(500).json({message:error.message});
        })
    } catch(error){
        res.status(500).json({message:error.message});
    }
}
