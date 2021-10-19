import { useEffect } from 'react'

const useFetchData = (type,applyData) => {
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
        fetch(`http://172.20.10.8:5000/${type}`, requestOptions)
            .then(response => { return response.json() })
            .then(data => {
                if(type==="mode"){
                    console.log("fetching mode: ",data.value)
                    applyData(data.value)
                }else if(type==="threshold"){
                    console.log("fetching threshold: ",data.value)
                    applyData(parseInt(data.value))
                }
            })
    }, [type,applyData])

    return 
}

export default useFetchData;