export interface Category {
    id?:string,
    name?:string,
    icon?:string
}
export interface CategoryDto {
    massege:string , 
    categories :Category []
}