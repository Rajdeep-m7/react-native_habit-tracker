import { Account , Client , Databases} from "react-native-appwrite";

export const client = new Client()
.setEndpoint("https://sgp.cloud.appwrite.io/v1")
.setProject("69a1acf0000e9b650940")

export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID= process.env.EXPO_PUBLIC_DB!;
export const HABITS_COLLECTION= process.env.EXPO_PUBLIC_TABLE_ID!;