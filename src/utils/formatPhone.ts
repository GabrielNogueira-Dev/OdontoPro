
export function formatPhone(value: string){
                                        //este REGEX elimina todos carac n numericos
    const cleanedValue  = value.replace(/\d/g, "")
    
    if(cleanedValue.length > 11){
        return value.slice(0,15)
    }
        // Aplica a mascara p/ (65) 91234-5678
    const formatedValue = cleanedValue
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d{4,5})(\d{4})$/, '$1-$2') 

    return formatedValue

}

export function extractPhoneNumber(phone:string){

    const phoneValue = phone.replace(/[\(\)\s-]/g, "")

    return phoneValue;

}