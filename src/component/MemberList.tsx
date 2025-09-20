import { type Member } from "../types/member";

interface MemberListProps {
  members: Member[];
  onEdit: (member: Member) => void;
  onDelete: (id: number) => void;
}

export default function MemberList({ members, onEdit, onDelete }: MemberListProps) {
  if (members.length === 0)
    return <p className="text-center text-gray-500 mt-4">ไม่มีสมาชิกในระบบ</p>;

  return (
    <div className="grid md:grid-cols-2 gap-4 text-black">
      {members.map(member => (
        <div key={member.id} className="bg-white p-4 shadow rounded flex space-x-4">
          {/* รูป */}
          <img
            src={member.img}
            alt={member.firstName}
            className="w-20 h-20 rounded-full object-cover"
          />

          {/* ข้อมูลสมาชิก */}
          <div className="flex-1 space-y-1">
            <p className="font-bold text-lg">{member.prefix} {member.firstName} {member.lastName}</p>
            <p><span className="font-semibold">พรรค:</span> {member.party}</p>
            <p><span className="font-semibold">จังหวัด:</span> {member.province || "-"}</p>
            <p><span className="font-semibold">ตำแหน่ง:</span> {member.position || "-"}</p>
            <p><span className="font-semibold">กระทรวง:</span> {member.ministry || "-"}</p>
            <p><span className="font-semibold">ประวัติการทำงาน:</span> {member.workHistory || "-"}</p>
            <p><span className="font-semibold">ผลงานที่ผ่านมา:</span> {member.achievements || "-"}</p>
          </div>

          {/* ปุ่มแก้ไข/ลบ */}
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => onEdit(member)}
              className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
            >
              แก้ไข
            </button>
            <button
              onClick={() => onDelete(member.id)}
              className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600"
            >
              ลบ
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
