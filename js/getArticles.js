import {db} from "./firebase-config.js";

import {
collection,
getDocs,
query,
orderBy
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


export async function getArticles(){

let q=query(
collection(db,"articles"),
orderBy("createdAt","desc")
);


let snap=await getDocs(q);


return snap.docs.map(d=>({

id:d.id,
...d.data()

}));

}