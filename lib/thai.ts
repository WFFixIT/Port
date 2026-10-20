// The browser's Thai dictionary breaks lines inside these words. "|" marks where,
// and a word joiner (U+2060) goes there instead. A trailing "|" also holds the
// word to the next one, for words whose last syllable gets misread on its own.
const WORDS = [
  "โปร|เจ|กต์",
  "คอน|เทนต์",
  "คอน|เสิร์ต|",
  "สตู|ดิ|โอ",
  "แอ|ด|มิ|น",
  "แค|ต|ตา|ล็อก",
  "สต็|อก",
  "แพ็ก|เกจ",
  "เซ็|ตอัพ",
  "จู|บิ|ลี่",
  "เด|โม",
  "เช็|ก",
  "แช|ท",
  "บอ|ท",
  "แด|ช|บอร์ด",
  "ดอง|เกิล",
  "เท|ส",
  "อัต|โน|มัติ",
  "เม|ม|โม่",
  "ณัฐ|ภัทร",
  "กร|อก",
  "ก|ว่า",
  "ที|ละ",
  "ทัน|ที",
  "ดู|แล",
  "คัด|ลอก",
  "เครือ|ข่าย",
  "ลง|ทะ|เบียน",
  "ทะ|เบียน",
  "มือ|ถือ",
  "วัน|แสดง",
  "สถาน|ที่",
  "หลัง|บ้าน",
  "ลูก|ค้า",
  "คลัง|สินค้า",
  "การ|ตลาด",
  "ผล|งาน",
  "แม่|ฟ้า|หลวง",
  "กอง|ทัพ|บก",
  "อำนวย|การ",
  "ปลัด|กระทรวง",
  "หน่วย|งาน",
  "หน้า|งาน",
  "กลุ่ม|งาน",
  "ตำแหน่ง|งาน",
  "เจ้า|หน้าที่",
  "ความ|ปลอดภัย",
  "ซ่อม|คอม",
  "ใบ|เสนอ|ราคา",
  "ใบ|แจ้ง|หนี้",
]

const JOINER = "\u2060"
const joined = new Map(WORDS.map((w) => [w.replaceAll("|", ""), w.replaceAll("|", JOINER)]))
const keys = [...joined.keys()].sort((a, b) => b.length - a.length).join("|")
const pattern = new RegExp(`(?:${keys})(?![\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E])|ผู้(?=[ก-ฮเ-ไ])`, "g")

export function keepThaiWords(text: string) {
  // a match right after a leading vowel or before a mark is part of a longer word
  return text.replace(pattern, (w, at: number) => (/[เ-ไ]/.test(text[at - 1] ?? "") ? w : (joined.get(w) ?? w + JOINER)))
}
