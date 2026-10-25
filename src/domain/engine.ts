export interface Operation<T> { key: string; clock: { counter: number; actor: string }; deleted: boolean; value?: T }
function compare<T>(left: Operation<T>, right: Operation<T>): number {
  if (left.clock.counter!==right.clock.counter) return left.clock.counter-right.clock.counter;
  const actorOrder=left.clock.actor.localeCompare(right.clock.actor); if(actorOrder!==0) return actorOrder;
  if(left.deleted!==right.deleted) return left.deleted?1:-1;
  return JSON.stringify(left.value ?? null).localeCompare(JSON.stringify(right.value ?? null));
}
export function mergeOperations<T>(...replicas: readonly (readonly Operation<T>[])[]): Operation<T>[] {
  const winners=new Map<string,Operation<T>>();
  for(const replica of replicas) for(const operation of replica) { const current=winners.get(operation.key); if(!current || compare(operation,current)>0) winners.set(operation.key,operation); }
  return [...winners.values()].sort((a,b)=>a.key.localeCompare(b.key));
}