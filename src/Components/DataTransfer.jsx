import axios from "axios";

export const DataTransfer = () => {

    try{
    const resoponse = axios.get("http://localhost:4025/retriveAllData");
    return resoponse;
    }
    catch(err){
        return err;
    }
}
