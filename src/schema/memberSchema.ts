import { z } from "zod";

export const memberSchema = z.object({
  prefix: z.string().min(2, "กรุณาเลือกคำนำหน้า"),
  firstName: z.string().min(2, "กรุณากรอกชื่อ"),
  lastName: z.string().min(2, "กรุณากรอกนามสกุล"),
  img: z.string().url("กรุณากรอก URL รูปภาพ"),
  party: z.string().min(2, "กรุณากรอกพรรค"),
  province: z.string().optional(),
  workHistory: z.string().optional(),
  achievements: z.string().optional(),
  position: z.string().optional(),
  ministry: z.string().optional(),
});

export type MemberFormValues = z.infer<typeof memberSchema>;
