import { useEffect } from 'react'

const useFetchData = (type,applyData) => {
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
        fetch(`http://127.0.0.1:5000/${type}`, requestOptions)
            .then(response => { return response.json() })
            .then(data => {
                if(type==="mode"){
                    console.log("fetching mode: ",data.value)
                    if (data.value === "AUTO") {
                        applyData(true)
                      } else {
                        applyData(false)
                      }
                }else if(type==="threshold"){
                    console.log("fetching threshold: ",data.value)
                    applyData(parseInt(data.value))
                }
            })
    }, [type,applyData])

    return 
}

export default useFetchData;