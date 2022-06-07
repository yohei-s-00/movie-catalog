import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { collection, query, limit, where } from "firebase/firestore";
import { firestore } from "./firebase";

export function getMovie() {
  const ref = query(collection(firestore, "movies"));
  return ref;
}
