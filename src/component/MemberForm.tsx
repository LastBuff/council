import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { memberSchema,type MemberFormValues } from "../schema/memberSchema";
import { type Member } from "../types/member";
import { loadMembers } from "../utils/dataLoader";
import MemberList from "./MemberList";

export default function MemberForm() {
  const [members, setMembers] = useState<Member[]>([]);
  const [newlyAdded, setNewlyAdded] = useState<Member[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [showCount, setShowCount] = useState<number | null>(10);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
  });

  useEffect(() => {
    setMembers(loadMembers());
  }, []);

  const onSubmit = (data: MemberFormValues) => {
    if (editId !== null) {
      // แก้ไขสมาชิก
      setMembers(prev => prev.map(m => m.id === editId ? { ...m, ...data } : m));
      setNewlyAdded(prev => prev.map(m => m.id === editId ? { ...m, ...data } : m));
      setEditId(null);
    } else {
      // เพิ่มสมาชิกใหม่
      const newMember: Member = { id: Date.now(), ...data };
      setMembers(prev => [...prev, newMember]);
      setNewlyAdded([newMember]); // แสดงเฉพาะคนที่เพิ่ม
    }
    reset();
  };

  const handleEdit = (member: Member) => {
    setEditId(member.id);
    reset(member);
  };

  const handleDelete = (id: number) => {
    setMembers(prev => prev.filter(m => m.id !== id));
    setNewlyAdded(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 shadow-md rounded mb-6 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <select {...register("prefix")} className="border p-2 rounded w-full">
            <option value="">คำนำหน้า</option>
            <option value="นาย">นาย</option>
            <option value="นาง">นาง</option>
            <option value="นางสาว">นางสาว</option>
          </select>
          {errors.prefix && <p className="text-red-500">{errors.prefix.message}</p>}

          <input {...register("firstName")} placeholder="ชื่อ" className="border p-2 rounded w-full" />
          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}

          <input {...register("lastName")} placeholder="นามสกุล" className="border p-2 rounded w-full" />
          {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input {...register("img")} placeholder="รูปถ่าย" className="border p-2 rounded w-full" />
          {errors.img && <p className="text-red-500">{errors.img.message}</p>}

          <input {...register("party")} placeholder="พรรค" className="border p-2 rounded w-full" />
          {errors.party && <p className="text-red-500">{errors.party.message}</p>}

          <input {...register("province")} placeholder="จังหวัด" className="border p-2 rounded w-full" />
        </div>

        <textarea {...register("workHistory")} placeholder="ประวัติการทำงาน" className="border p-2 w-full rounded" />
        <textarea {...register("achievements")} placeholder="ผลงานที่ผ่านมา" className="border p-2 w-full rounded" />
        <input {...register("position")} placeholder="ตำแหน่งรัฐมนตรี" className="border p-2 w-full rounded" />
        <input {...register("ministry")} placeholder="กระทรวง" className="border p-2 w-full rounded" />

        <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600">
          {editId !== null ? "อัปเดตสมาชิก" : "เพิ่มสมาชิก"}
        </button>
      </form>

      {/* แสดงสมาชิกใหม่ล่าสุด */}
      {newlyAdded.length > 0 && (
        <div className="mb-4">
          <h3 className="font-bold mb-2">สมาชิกที่เพิ่มล่าสุด</h3>
          <MemberList members={newlyAdded} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      )}

      {/* ปุ่มควบคุมสมาชิกเก่า */}
      <div className="mb-4 space-x-2">
        <button onClick={() => setShowCount(10)} className="bg-blue-700 px-3 py-1 rounded hover:bg-gray-400">ดูสมาชิก 10 คน</button>
        <button onClick={() => setShowCount(members.length)} className="bg-blue-700 px-3 py-1 rounded hover:bg-gray-400">ดูสมาชิกทั้งหมด</button>
        <button onClick={() => setShowCount(null)} className="bg-blue-700 px-3 py-1 rounded hover:bg-gray-400">ซ่อนสมาชิก</button>
      </div>

      {/* แสดงสมาชิกเก่า */}
      {showCount !== null && members.length > 0 && (
        <MemberList members={members.slice(0, showCount)} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}
