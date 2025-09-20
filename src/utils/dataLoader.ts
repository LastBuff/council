import { type Member } from "../types/member";
import data from "../data/mps.json";

export function loadMembers(): Member[] {
  return data.map((m, idx) => {
    const [prefix, firstName, ...rest] = m.name.split(" ");
    const lastName = rest.join(" ");

    return {
      id: idx,
      prefix: prefix || "",
      firstName: firstName || "",
      lastName: lastName || "",
      img: m.img || "",
      party: m.party || "",
      province: m.province || "",
      workHistory: "",   // กำหนด default
      achievements: "",
      position: "",
      ministry: "",
    };
  });
}
