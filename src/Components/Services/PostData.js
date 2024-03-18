import constant from './constant';

export function PostData(type, UserData){
    let BaseUrl = constant.API_URL;
    return new Promise((reslove, reject) =>{
        fetch(BaseUrl+type,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(UserData)
        })
        .then((response) => response.json())
        .then((responseJson) =>{
            reslove(responseJson);
        })
        .catch((error) =>{
            reject(error);
        })
    });
}