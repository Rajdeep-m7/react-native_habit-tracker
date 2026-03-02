import { Account , Client , Databases} from "react-native-appwrite";

export const client = new Client()
.setEndpoint("https://sgp.cloud.appwrite.io/v1")
.setProject("69a1acf0000e9b650940")
.setPlatform("Rajdeep.habitTracker")

export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID= "69a3b97000199af1467f"
export const HABITS_COLLECTION="habits"
export const COMPLETION_COLLECTION="habit_completions"