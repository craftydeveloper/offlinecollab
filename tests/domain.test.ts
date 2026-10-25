import { describe, expect, it } from "vitest";
import { mergeOperations } from "../src/domain/engine.js";
describe("replica merge", () => {
  it("chooses the latest logical clock independent of replica order", () => { const old={key:"title",clock:{counter:1,actor:"a"},deleted:false,value:"old"}; const next={key:"title",clock:{counter:2,actor:"b"},deleted:false,value:"new"}; expect(mergeOperations([old],[next])).toEqual(mergeOperations([next],[old])); expect(mergeOperations([old],[next])[0]?.value).toBe("new"); });
  it("preserves a tombstone as the winning operation", () => { expect(mergeOperations([{key:"x",clock:{counter:2,actor:"a"},deleted:true}],[{key:"x",clock:{counter:1,actor:"b"},deleted:false,value:1}])[0]?.deleted).toBe(true); });
});