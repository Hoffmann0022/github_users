import { API } from "./api";


export async function getUser(user: string) {
    try{
        const response = await API.get(`users/${user}`);
        return response;
    } catch (err){
        throw new Error(err as string);
    }
}


export async function getRepos(user: string) {
    try{
        const response = await API.get(`users/${user}/repos`);
        return response;
    } catch (err){
        throw new Error(err as string);
    }
}

export async function getReposDetail(user: string, repos: string) {
    try{
        const response = await API.get(`repos/${user}/${repos}`);
        return response;
    } catch (err){
        throw new Error(err as string);
    }
}
