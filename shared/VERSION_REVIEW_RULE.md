# Version and Review Rule

## File naming

工作中 source 使用穩定名稱，不在 filename 連續堆疊 `final_v2_revised_final`。正式外發版可使用：`[Artifact]_[YYYYMMDD]_vMajor.Minor`。Repository 內以 version history 記錄變更。

## Version meaning

- **v0.x**：pre-contract / pre-kickoff draft；方法可用，但客戶 expectation、data、scope 尚未驗證。
- **v1.0**：client-aligned first issue；scope與 intended use 已確認。
- **Minor update**：不改變核心 method / decision logic 的內容更新。
- **Major update**：改變 scope、method、decision logic、assumption basis 或 client use。

## Review roles

- **Author**：內容、calculations、sources、assumptions、self-check。
- **Peer reviewer**：logic、traceability、formula / template usability、consistency。
- **Project Lead / Zac**：client expectation、commercial judgement、relationship / risk、final quality。
- **Client approver**：TBD WITH CLIENT；核准 intended decision，不等於核准所有 analysis assumptions。

## Review sequence

1. Author 提交 first MVP，附 task brief、questions與 known limitations。
2. Reviewer 先判斷 objective / intended use 是否正確，再看內容細節。
3. Author 以 decision log / comment resolution 記錄重大修正，不默默改變假設。
4. QA 檢查 content、cross-deliverable、formula、render、confidentiality與 market conduct。
5. Project Lead 決定 issue、hold 或 return。

## Stop rules

Architecture revision 最多 2 次；每個 artifact revision 最多 2 次；cross-workstream revision 最多 1 次。仍未解決事項進 `06_UNRESOLVED_ISSUES.md`，不得無限 polish。
