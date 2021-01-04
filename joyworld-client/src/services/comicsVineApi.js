import axios from 'axios';
//https://cors-anywhere.herokuapp.com/
const instance = axios.create({
    baseURL:'https://comicvine.gamespot.com/api',
    headers:{ 'Access-Control-Allow-Origin': '*'},
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
