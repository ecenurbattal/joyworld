import axios from 'axios'
import jsdom from 'jsdom'
import {getElement} from '../utils/domChildUtils.js';
import {ErrorHandler} from '../helpers/error.js';
import errorMessages from '../../config/errorMessages.js';

export const getNews = async (req,res,next) => {
    const {JSDOM} = jsdom;

    const url = 'https://fanzade.com/comicsfan/cizgi-roman-haber';


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
                image: getElement(item,'rb-iwrap').children[0].getAttribute('data-lazy-src'),
                summary: getElement(item,'entry-summary').textContent.replace('\t\t\t\t\t\t','')
            })
        }
    });
    
    return uniqueArray(data);
}

    try{
        const {data} = await axios.get(url)
        //console.log(data)
        if(data){
            res.status(200).json(getNodes(data));
        } else {
            console.log(error)
            return next(new ErrorHandler(500,errorMessages.SERVER_ERROR))
            
        }
    } catch(error){
        console.log(error)
        return next(new ErrorHandler(500,errorMessages.SERVER_ERROR));
        
    }
}
