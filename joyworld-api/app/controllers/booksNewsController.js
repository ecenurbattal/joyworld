import axios from 'axios'
import jsdom from 'jsdom'
import {getElement} from '../utils/domChildUtils.js';

export const getNews = async (req,res) => {


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