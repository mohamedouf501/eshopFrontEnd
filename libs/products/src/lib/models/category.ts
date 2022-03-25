export interface Category {
    id?:string,
    name?:string,
    icon?:string,
    color?:string
}
export interface CategoriesDto {
    massege:string , 
    categories :Category []
}
export interface CategoryDto {
    massege:string , 
    category:Category 
}