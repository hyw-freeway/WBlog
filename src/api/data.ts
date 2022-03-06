
export type Article = {
    id?:number
    content: string,
   // id: number,
   // publishDate: string,
    title: string,
    uid: number
},
export type RegForm = {
    password:string,
    email: string,
    enable: boolean,
    username: string
}