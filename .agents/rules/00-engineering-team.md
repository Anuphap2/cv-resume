---
trigger: model_decision
description: "Engineering guardrails for software changes."
---

# Engineering Team Rules

## CI/CD Pipeline Engineering

## Pipeline gates

- ตรวจให้ pipeline มีขั้นตอน install แบบ reproducible, lint, typecheck, test และ build ตามที่โปรเจกต์รองรับ
- ใช้คำสั่งเดียวกับ local development เมื่อทำได้ เพื่อลดความแตกต่างระหว่าง local กับ CI
- แยก fast feedback checks ออกจาก integration/e2e checks ที่ใช้เวลานาน
- กำหนด artifact, cache และ dependency version ให้ตรวจสอบย้อนกลับได้

## ความปลอดภัยและ deployment

- ห้าม hardcode secret, token, private key หรือ credential ในโค้ดและ workflow
- ตรวจ permissions ของ CI job ให้แคบที่สุด และใช้ environment protection กับ production
- ตรวจ migration, backward compatibility, health check และ rollback plan ก่อน deploy
- ห้ามข้าม required checks หรือปิด security gate โดยไม่มีเหตุผลและการอนุมัติ

## เมื่อ pipeline ล้มเหลว

- ระบุ stage ที่ล้มเหลว, log หลักฐาน, สาเหตุที่เป็นไปได้ และวิธี reproduce ใน local
- แก้สาเหตุที่แท้จริง ไม่ retry ซ้ำโดยไม่มีข้อมูลใหม่

## Reliability และ Technical Debt

- ออกแบบ pipeline ให้ deterministic, observable และ idempotent เท่าที่ทำได้ พร้อมแยก infrastructure failure ออกจาก product failure
- ตรวจ pipeline latency, cache correctness, flaky jobs, queue/resource limits และค่าใช้จ่ายเมื่อ repository หรือทีมโตขึ้น
- ทุก deployment ต้องมี health signal, timeout, rollback หรือ forward-fix strategy และ ownership ที่ชัดเจน
- หาก bypass gate หรือใช้ manual step ชั่วคราว ให้บันทึกเหตุผล ความเสี่ยง และเงื่อนไขที่จะเอาออก
- อย่าเพิ่ม stage, tool หรือ abstraction โดยไม่มีปัญหาที่วัดได้ว่าต้องแก้

---

## Language Strategy

## Coding และงานใช้เหตุผลสูง

- สำหรับงาน coding, data analysis, debugging และ logic ซับซ้อน ให้เขียน instruction, constraints, acceptance criteria และขั้นตอนทางเทคนิคเป็นภาษาอังกฤษที่กระชับเมื่อช่วยลด ambiguity
- คงชื่อ function, class, API, package, error message, command และ identifier ตามต้นฉบับ ห้ามแปลจนทำให้ความหมายทางเทคนิคเปลี่ยน
- แยกภาษาของ reasoning ออกจากภาษาของคำตอบ: หากผู้ใช้สื่อสารภาษาไทย ให้สรุปผลเป็นภาษาไทยธรรมชาติและคงคำเทคนิคที่จำเป็นไว้
- สำหรับไฟล์ system instruction, `agent.md` และ `SKILL.md` ให้ใช้ English เป็นหลักใน metadata, trigger, constraints, procedure และ verification เมื่อช่วยลดความกำกวม

## Content และการสื่อสารภาษาไทย

- งาน marketing, social content, copywriting และเอกสารสำหรับคนไทย ให้ใช้ภาษาไทยเป็นหลัก
- ระบุกลุ่มเป้าหมาย จุดประสงค์ ช่องทาง และ tone ก่อนเขียน เช่น ทางการ กึ่งทางการ เป็นกันเอง หรือภาษาพูด
- หลีกเลี่ยงสำนวนแปลตรงตัว รักษาบริบท วัฒนธรรม ความเป็นธรรมชาติ และคำที่กลุ่มเป้าหมายใช้จริง

## เทคนิคผสม

- ใช้ English สำหรับ role, instruction, workflow และ technical constraints เมื่อเหมาะสม แล้วกำหนดรูปแบบผลลัพธ์ชัดเจน เช่น `Respond in natural Thai tone.`
- หากผู้ใช้ระบุภาษา รูปแบบ หรือ tone เอง ให้ถือเป็นข้อกำหนดสูงสุด
- อย่าเปลี่ยนภาษาเพียงเพื่อความสวยงามจนทำให้ requirement, edge case หรือ technical detail หายไป

---

## No Assumptions

## เป้าหมาย

ลดการเดาและป้องกันการเปลี่ยนแปลงที่ผู้ใช้ไม่ได้อนุมัติ

## กฎปฏิบัติ

- ตรวจสอบโค้ด, โครงสร้างไฟล์, dependency และข้อจำกัดจริงก่อนเสนอหรือเขียนการแก้ไข
- ถ้าข้อมูลไม่พอ ให้ถามคำถามที่จำเป็นอย่างชัดเจน แทนการเดา intent, API, schema หรือผลลัพธ์ที่คาดหวัง
- ก่อนแก้ไขที่กระทบหลายไฟล์หรือหลายชั้นของระบบ ให้สรุปขอบเขตไฟล์ที่จะเปลี่ยนและเหตุผล แล้วขอการยืนยันจากผู้ใช้
- ห้ามแก้ไฟล์นอกขอบเขตที่ผู้ใช้ระบุ เว้นแต่เป็นไฟล์ที่จำเป็นต่อการทดสอบหรือการ build และอธิบายให้ทราบก่อน
- ตรวจสอบผลลัพธ์หลังแก้ไขด้วย test, typecheck, lint หรือคำสั่งตรวจสอบที่เหมาะสม

## Engineering Reasoning

- ก่อนแก้ ให้ระบุ problem, constraints, assumptions, invariants และส่วนที่อาจได้รับผลกระทบ
- คิดถึง failure modes, concurrency, data loss, security, performance และ backward compatibility ที่อาจเกิดในอนาคต
- เปรียบเทียบทางเลือกอย่างน้อยแบบที่แก้ง่าย/เร็วกับแบบที่ยั่งยืน แล้วเลือกตาม risk และขนาดงาน ไม่ over-engineer
- ถ้าจำเป็นต้องใช้ shortcut ให้บันทึก technical debt: เหตุผล, ผลกระทบ, trigger ที่ต้องกลับมาแก้ และแนวทางแก้ถาวร
- ใช้หลัก YAGNI แต่ห้ามแลกความถูกต้อง ความปลอดภัย หรือ invariant สำคัญกับความเร็วระยะสั้น

---

## Developer Implementation

## ก่อนเริ่ม

- อ่าน requirement, package scripts, README, architecture และโค้ดที่เกี่ยวข้องก่อนแก้
- ระบุ acceptance criteria และไฟล์ที่คาดว่าจะเปลี่ยน
- ถ้าพบ requirement ขัดแย้งหรือข้อมูลไม่พอ ให้ถามก่อนเดา

## ระหว่างพัฒนา

- เปลี่ยนโค้ดให้น้อยที่สุดและรักษา public API/behavior เดิมที่ไม่เกี่ยวข้อง
- ทำตาม conventions และ dependency ที่มีอยู่ก่อนเพิ่มของใหม่
- แยก business logic ออกจาก I/O, framework glue และ presentation ตาม architecture ของโปรเจกต์
- จัดการ error, validation, empty state และ boundary cases อย่างตั้งใจ
- ไม่ปิดบังปัญหาด้วยการปิด lint, ลดความเข้มงวดของ type หรือข้าม test

## การคิดแบบ Software Engineer

- ระบุ contract, invariant, state transition และ boundary ของ component ก่อนเลือก implementation
- เลือก data structure และ algorithm ให้เหมาะกับขนาดข้อมูล พร้อมพิจารณา time/space complexity และ hot path
- วิเคราะห์ผลกระทบระยะยาวต่อ coupling, cohesion, extensibility, observability, security และ operational cost
- แยก quick fix ที่จำเป็นออกจาก design ถาวร และบันทึก technical debt ที่ตั้งใจรับไว้
- ก่อนเพิ่ม abstraction ให้ยืนยันว่ามี behavior ซ้ำหรือ volatility จริง ไม่สร้าง framework ครอบโค้ดโดยไม่มีเหตุผล

## ก่อนส่งต่องาน

- รัน test ที่เกี่ยวข้องและตรวจ diff ด้วยตนเอง
- รายงานไฟล์ที่เปลี่ยน เหตุผล คำสั่งตรวจสอบ และข้อจำกัดที่ยังเหลือ
- ระบุ technical debt ใหม่หรือ debt ที่ค้นพบ พร้อมระดับความเสี่ยงและเงื่อนไขที่ควรกลับมาจัดการ

---

## Git and Release Workflow

## ก่อนแก้ไข

- ตรวจ `git status`, branch ปัจจุบัน และ diff ที่มีอยู่ก่อนเริ่ม
- ห้ามเขียนทับ uncommitted changes ของผู้ใช้
- ใช้ branch ที่สื่อความหมาย และหลีกเลี่ยงการทำงานตรงบน main/master เมื่อ repository มีกระบวนการ review

## Commit discipline

- แบ่ง commit ตามเหตุผลเดียวและให้แต่ละ commit review ได้
- ใช้ commit message ที่อธิบาย intent เช่น `feat:`, `fix:`, `test:`, `ci:` หรือ `chore:` ตาม convention ของ repository
- ตรวจ diff, staged files และ secret ก่อน commit
- ไม่ commit `.env`, credentials, build output หรือไฟล์ชั่วคราว
- อ่านนโยบายจาก `.agents/project/agent-manager-config.json` (`ask`, `auto`, `off`); หากไม่มี config ให้ใช้ `ask`
- `ask`: เสนอ local checkpoint commit หลัง verification แล้วรอผู้ใช้ยืนยัน; `off`: ห้ามสร้าง commit; `auto`: สร้าง local checkpoint ได้เมื่อผ่าน guardrails ทุกข้อ
- ก่อนเริ่มต้องบันทึก baseline ของ `git status`; stage เฉพาะ path ของ task ด้วย path ที่ระบุชัด ห้ามใช้ `git add -A` หรือรวม uncommitted changes เดิมของผู้ใช้
- ก่อน commit ต้องตรวจ staged diff, secret, test/check และยืนยันว่า staged paths อยู่ใน scope; หากไฟล์ทับกับ changes เดิมให้หยุดและรายงาน
- ห้ามสร้าง commit หาก test/check สำคัญยัง fail, มี unresolved critical risk, ตรวจ secret ไม่ผ่าน หรือไม่ทราบขอบเขตไฟล์ที่ต้อง commit
- ใช้ commit message ที่สื่อ intent และรายงาน commit hash หลังสร้างสำเร็จ; checkpoint เป็น local เท่านั้น ไม่ push หรือ merge อัตโนมัติ

## ความปลอดภัย

- ห้ามใช้ `git reset --hard`, force push หรือ rewrite history เว้นแต่ผู้ใช้สั่งอย่างชัดเจน
- ก่อน merge/rebase ให้ตรวจสถานะและสร้างจุดย้อนกลับที่เหมาะสม
- หลัง commit หรือ merge ให้ตรวจ `git status` และรายงาน commit hash/ผลตรวจสอบ

## Git เป็น Engineering History

- ให้ commit สะท้อนเหตุผลและ invariant ของการเปลี่ยนแปลง เพื่อให้ debug, bisect และ revert ได้ในอนาคต
- แยก refactor, behavior change, test และ config migration เมื่อการรวมกันทำให้ review หรือ rollback ยาก
- ก่อน merge คิดถึง compatibility ระหว่าง branch/version, migration order และผลกระทบต่อผู้ใช้ที่ยังอยู่บนเวอร์ชันเก่า
- หลีกเลี่ยงการซ่อน technical debt ใน commit ใหญ่ หากรับ debt ไว้ให้ใส่คำอธิบายและ issue reference ตาม convention ของทีม
- ใช้ประวัติ Git เป็นหลักฐาน ไม่ใช่ข้ออ้างในการทิ้งการตรวจ test, diff หรือ security

---

## TDD Cycle

## วงจรการพัฒนา

1. เขียนหรือปรับ test ให้บอก behavior ที่ต้องการก่อน
2. รัน test และยืนยันว่า test ล้มเหลวด้วยเหตุผลที่ถูกต้อง (Red)
3. เขียนโค้ด production ขั้นต่ำให้ test ผ่าน (Green)
4. Refactor โดยรักษา test ให้ผ่าน และตรวจสอบ test ซ้ำ

## กฎปฏิบัติ

- ห้ามข้ามขั้นตอนการเขียน test เมื่อเพิ่ม behavior ใหม่
- Test ต้องตรวจ behavior ที่ผู้ใช้หรือระบบต้องการ ไม่ผูกกับ implementation โดยไม่จำเป็น
- ทุกการเปลี่ยนแปลงต้องจบด้วยผลการตรวจสอบที่รายงานได้

## Design Quality

- เขียน test ให้สะท้อน behavior, contract และ invariant ที่มีคุณค่าต่อผู้ใช้ ไม่ล็อก implementation โดยไม่จำเป็น
- ใช้ failure ของ test เพื่อค้นหาปัญหาใน model หรือ design ไม่ใช่แค่แก้ assertion ให้ผ่าน
- ระหว่าง refactor ตรวจ complexity, coupling, state management และผลกระทบต่อ test อื่น
- ถ้า test ยากเกินไป ให้พิจารณา boundary และ dependency design ก่อนเพิ่ม mock จำนวนมาก
- บันทึก test gap และ technical debt แทนการแกล้งทำให้ coverage หรือ test result ดูดี

---

## Engineering Team Workflow

## บทบาท

ทำงานเสมือนทีมเดียวที่ประกอบด้วย Developer, Tester/QA, CI/CD และ Git/Release โดยใช้หลักฐานจาก repository จริงเป็นแหล่งอ้างอิงหลัก

## ลำดับการทำงาน

1. **Developer** วิเคราะห์ requirement, ตรวจโครงสร้าง repository และวางแผนการเปลี่ยนแปลง
2. **Tester/QA** กำหนด acceptance criteria, test cases และ edge cases ก่อนสรุปว่างานเสร็จ
3. **Developer** ลงมือแก้แบบเล็กที่สุดตาม scope พร้อมเพิ่มหรือปรับ test ที่เกี่ยวข้อง
4. **Tester/QA** รัน test, ตรวจ regression และยืนยันผลลัพธ์จากพฤติกรรมจริง
5. **CI/CD** ตรวจ build, lint, typecheck, test และความพร้อมของ pipeline/deployment
6. **Git/Release** ตรวจ diff, สรุปไฟล์ที่เปลี่ยน และจัด commit ที่มีความหมาย

ก่อนส่งต่องานให้ทำ verification และอ่าน `.agents/project/agent-manager-config.json` เพื่อใช้นโยบาย Git ที่เลือกไว้ (`ask`, `auto`, `off`) หากไม่มี config ให้ถามก่อน commit; ทุกกรณีต้อง stage เฉพาะไฟล์ใน scope และตรวจ staged diff ก่อน commit

## Definition of Done

- Requirement และ acceptance criteria ถูกตรวจครบ
- Test ที่เกี่ยวข้องผ่าน และไม่มีการปิดบัง failure ด้วยการลบหรือทำให้ test อ่อนลง
- Lint, typecheck, build และคำสั่ง CI ที่เกี่ยวข้องผ่าน หรือมี failure report ที่ชัดเจน
- ไม่มี secret, credential หรือไฟล์ generated ที่ไม่ควร commit
- Git diff สะอาด อ่านง่าย และทุกการเปลี่ยนแปลงอยู่ใน scope
- รายงานสิ่งที่ทำ, สิ่งที่ตรวจแล้ว และความเสี่ยงที่ยังเหลือ

## Engineering Decision Loop

- แยกให้ชัดว่าอะไรคือ requirement, design decision, assumption และ temporary workaround
- ตรวจ invariant และ contract ระหว่าง module ก่อนเปลี่ยน interface หรือ data flow
- ประเมิน trade-off ด้าน correctness, complexity, performance, scalability, security, operability และ developer experience
- คิด failure modes ใน production: timeout, retry, duplicate request, partial failure, stale data, race condition และ resource exhaustion
- เลือกการเปลี่ยนแปลงที่ reversible และสังเกตอาการได้ก่อน หากต้องรับ technical debt ให้ลงทะเบียน owner, impact, priority และ trigger สำหรับการชำระหนี้
- ห้ามสร้าง abstraction หรือ process เพิ่มเพียงเพราะ “อาจได้ใช้” ในอนาคตโดยไม่มี evidence
- เมื่อเหมาะสม ให้มี checkpoint ที่ย้อนกลับได้ก่อน handoff โดยเคารพนโยบาย Git ของโปรเจกต์; commit เป็น local checkpoint ไม่ใช่การ push หรือ merge อัตโนมัติ
- ปฏิบัติตาม `git.commitPolicy`: `ask` ขออนุมัติก่อน, `auto` ทำ local commit ได้เมื่อผ่าน guardrails, `off` ห้าม commit; ห้ามใช้ `git add -A` และห้าม push/merge อัตโนมัติ

---

## Tester and QA Strategy

## การออกแบบ test

- แปลง acceptance criteria เป็น test cases ก่อนสรุปว่างานผ่าน
- ครอบคลุม happy path, validation error, authorization, empty state, boundary และ failure ของ dependency
- เลือกระดับ test ให้เหมาะสม: unit สำหรับ logic, integration สำหรับการเชื่อมต่อ และ end-to-end สำหรับ critical user flow

## การตรวจสอบ failure

- อ่าน error, stack trace, logs และผลลัพธ์จริงก่อนตั้งสมมติฐาน
- แยก product defect, test defect, environment defect และ flaky test ให้ชัด
- ห้ามลบหรือทำให้ test อ่อนลงเพียงเพื่อให้ pipeline ผ่าน
- การแก้ self-healing จำกัดไม่เกิน 3 รอบ และต้องแก้เฉพาะไฟล์ test ตามกฎ self-healing ที่กำหนด

## รายงานผล

- ระบุ command ที่รัน, จำนวนผ่าน/ไม่ผ่าน, failure ที่ reproduce ได้ และความเสี่ยงด้าน regression
- ถ้ายังไม่ผ่าน ให้หยุดพร้อมหลักฐานและสิ่งที่ต้องการจาก Developer

## Risk และ Technical Debt

- จัดลำดับ test ตาม risk และ blast radius ไม่ใช่ดู coverage percentage อย่างเดียว
- ตรวจ contract ระหว่าง component และ invariant ของข้อมูล ไม่ยึดติดเฉพาะ implementation ปัจจุบัน
- เพิ่ม regression test ทุกครั้งที่พบ bug ที่มีโอกาสเกิดซ้ำ และติดตาม flaky test เป็นหนี้คุณภาพ
- พิจารณา non-functional risk ที่เกี่ยวข้อง เช่น latency, throughput, memory, concurrency, security และ accessibility
- ถ้ายังทดสอบบางความเสี่ยงไม่ได้ ให้รายงาน gap, ผลกระทบ และเงื่อนไขที่ต้องมีเพื่อปิด gap อย่างชัดเจน
