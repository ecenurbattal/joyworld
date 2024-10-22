import axios from 'axios';
//https://cors-anywhere.herokuapp.com/
//'http://comicvine.gamespot.com/api'
const instance = axios.create({
    baseURL:'http://localhost:8080/comicvine/api',
    params: {
        api_key:process.env.REACT_APP_COMIC_VINE_API_KEY,
        format: 'json',
    },
})

export const getCharacters = () => {
    return instance.get('/characters',{
        params: {
            field_list : 'image,deck,name,id,api_detail_url',
            limit: '50',
            sort: 'count_of_issue_appearances:desc',
        }
    })
}

export const getCharacter = (url) => {
    return instance.get('/',{
        baseURL:`http://localhost:8080/comicvine/api/${url.replace('https://comicvine.gamespot.com/api','')}`,
        params: {
            field_list : 'id,team_enemies,team_friends,deck,gender,image,movies,name,origin,powers,publisher,real_name,teams,volume_credits',
        }
    })
}

export const getFilteredCharacters = (value) => {
    return instance.get('/search', {
        params: {
            query: `${value}`,
            resources: 'character',
            field_list : 'image,deck,name,id,api_detail_url',
            limit: '50',
            sort: 'count_of_issue_appearances:desc',
        }
    })
}

export const getVolumes = () => {
    return instance.get('/volumes',{
        params: {
            field_list : 'image,deck,name,id,api_detail_url',
            limit: '50',
            sort: 'count_of_issue:desc',
        }
    })
}

export const getVolume = (url) => {
    return instance.get('/',{
        baseURL:`http://localhost:8080/comicvine/api/${url.replace('https://comicvine.gamespot.com/api','')}`,
        params: {
            field_list : 'id,deck,image,start_year,name,publisher,first_issue,last_issue',
        }
    })
}

export const getFilteredVolumes = (value) => {
    return instance.get('/search', {
        params: {
            query: `${value}`,
            resources: 'volume',
            field_list : 'image,deck,name,id,api_detail_url',
            limit: '50',
            sort: 'count_of_issue:desc',
        }
    })
}