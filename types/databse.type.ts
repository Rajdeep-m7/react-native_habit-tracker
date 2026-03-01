import { Models } from "react-native-appwrite";


export interface Habit extends Models.Document{
    user_id:string,
    title:string,
    frequency:string,
    description:string,
    streak_count:number,
    last_completed:string,
    $createdAt:string
}