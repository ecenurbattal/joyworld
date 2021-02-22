import axios from 'axios'
import jsdom from 'jsdom'
import {getElement} from '../utils/domChildUtils.js';
import {ErrorHandler} from '../helpers/error.js';
import errorMessages from '../../config/errorMessages.js';

export const getNews = async (req,res,next) => {


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
        const {data} = await axios.get(url)
        if(data){
            res.status(200).json(getNodes(data));
        } else {
            return next(new ErrorHandler(500,errorMessages.SERVER_ERROR))
        }
    } catch(error){
        return next(new ErrorHandler(500,errorMessages.SERVER_ERROR));
    }
}