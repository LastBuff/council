import { type Member } from "../types/member";
import data from "../data/mps.json";

export function loadMembers(): Member[] {
  return data.map((m, idx) => {
    // แยก name ออกเป็น prefix, firstName, lastName
    // สมมติ format เป็น "คำนำหน้า ชื่อ นามสกุล"
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
      workHistory: m.workHistory || "",
      achievements: m.achievements || "",
      position: m.position || "",
      ministry: m.ministry || "",
    };
  });
}
