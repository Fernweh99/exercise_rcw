export const getPagination = (query: any) => {
    let limit = 10 , offset = 0;

    if(query){
        limit = query.size ? query.size : 100;
        offset = query.page ? (query.page - 1) * limit : 0;
    }
    
    return { limit, offset };
}