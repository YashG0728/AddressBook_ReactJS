import axios from "axios";

export const DataTransfer = () =>{

    try{
        const resoponse = axios.put("http//localhost:4025/updateUsingToken/{id}");
        return resoponse;
        }
        catch(err){
            return err;
        }

}
