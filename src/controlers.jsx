const path = import.meta.env.OtherSide_path;
export async function  getAPI(url,mthd = 'GET',isRefresh = true){
    try{
        const res = await fetch(`${path}/${url}`,{
            method :mthd,
            credentials:"include"
        })        
        if(res.ok){
            const data = await res.json(); 
            return data
        }
        else if(res.status === 401 && isRefresh){
            const refreshed = await  refresh_credentials();
            if(refreshed.success){
                return getAPI(url ,mthd ,false)
            }
        }
        throw new Error("something went wrong")

    }
    catch(error){
        console.log(error)
        return {success :false}
    }
}
export async function  mthdAPI(url,mthd='POST',package_data,isRefresh = true){
    try{
        const res = await fetch(`${path}/${url}`,{
            method: mthd,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(package_data)
        });    
        if(res.ok){
            const data = await res.json(); 
            return data
        }
        else if(res.status === 401 && isRefresh){
            const refreshed = await  refresh_credentials();
            if(refreshed.success){
                return mthdAPI(url ,mthd,package_data ,false)
            }
        }
        throw new Error("something went wrong")

    }
    catch(error){
        console.log(error)
        return {success :false}
    }
}




