import axios from 'axios';
//https://cors-anywhere.herokuapp.com/
//'http://comicvine.gamespot.com/api'
const instance = axios.create({
    baseURL:'http://localhost:8080/comworld/api',
    params: {
        api_key:'b1e1d27f0279baff924cb89c039596e6f7eb36ee',
        format: 'json',
    },
})

export const getCharacters = () => {
    return instance.get('/characters',{
        params: {
            field_list : 'image,deck,name,id,api_detail_url',
            limit: '20',
            sort: 'count_of_issue_appearances:desc',
        }
    })
}

export const getCharacter = (url) => {
    return instance.get('/',{
        baseURL:`${url}`,
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
            limit: '20',
            sort: 'count_of_issue_appearances:desc',
        }
    })
}

export const getVolumes = () => {
    return instance.get('/volumes',{
        params: {
            field_list : 'image,deck,name,id,api_detail_url',
            limit: '20',
            sort: 'count_of_issue:desc',
        }
    })
}

export const getVolume = (url) => {
    return instance.get('/',{
        baseURL:`${url}`,
        params: {
            field_list : 'id,character_credits,concept_credits,deck,image,start_year,name,publisher',
        }
    })
}

export const getFilteredVolumes = (value) => {
    return instance.get('/search', {
        params: {
            query: `${value}`,
            resources: 'volume',
            field_list : 'image,deck,name,id,api_detail_url',
            limit: '20',
            sort: 'count_of_issue:desc',
        }
    })
}