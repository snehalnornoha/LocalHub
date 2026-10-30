const path = import.meta.env.VITE_OTHER_SIDE_PATH;


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
        console.log("//////",error)
        return {success :false ,msg :"hi" }
    }
}
export async function  mthdAPI(url,mthd='POST',package_data,isRefresh = true){
    console.log(path,url)
    try{
        const res = await fetch(`${path}/${url}`,{
            method: mthd,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(package_data)
        });    
        const data = await res.json(); 
        if(res.ok){
            console.log("data", data)
            return data
        }
        else if(res.status === 401 && isRefresh){
            const refreshed = await  refresh_credentials();
            if(refreshed.success){
                return mthdAPI(url ,mthd,package_data ,false)
            }
        }
        else if(res.status === 409){
            console.log(data)
             throw new Error(data.error)
        }
        throw new Error("something went wrong")

    }
    catch(error){
        console.log("--->",error)
        return {success :false ,msg : error.message}
    }
}

export async function refresh_credentials(){
   
    console.log("sending request to srver for jwt")
    try{
        const res = await fetch(`${path}/api/refresh_token`, {
            credentials: "include"
        })
        if(res.ok){
            const data = await res.json()
            console.log(data)
            return {success : true}
        }
        else{
            throw new Error("error")
        }

    }
  
    catch(err) {
            console.log("////",err)
            alert("please login again to continue")}
            return {success : false}        
}




