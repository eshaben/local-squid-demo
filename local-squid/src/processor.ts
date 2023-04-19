import { TypeormDatabase } from "@subsquid/typeorm-store";
import { EvmBatchProcessor } from "@subsquid/evm-processor";
import { Transfer } from "./model";
import { events } from "./abi/MyTok";

const contractAddress =
  "0xc01Ee7f10EA4aF4673cFff62710E1D7792aBa8f3".toLowerCase();
const processor = new EvmBatchProcessor()
  .setDataSource({
    chain: "http://localhost:9944",
    archive: "http://localhost:8080",
  })
  .addLog(contractAddress, {
    filter: [[events.Transfer.topic]],
    data: {
      evmLog: {
        topics: true,
        data: true,
      },
      transaction: {
        hash: true,
      },
    },
  });

processor.run(new TypeormDatabase(), async (ctx) => {
  const transfers: Transfer[] = [];
  for (let c of ctx.blocks) {
    for (let i of c.items) {
      if (i.address === contractAddress && i.kind === "evmLog") {
        if (i.transaction) {
          const { from, to, value } = events.Transfer.decode(i.evmLog);
          transfers.push(
            new Transfer({
              id: `${String(c.header.height).padStart(
                10,
                "0"
              )}-${i.transaction.hash.slice(3, 8)}`,
              block: c.header.height,
              from: from,
              to: to,
              value: value.toBigInt(),
              timestamp: BigInt(c.header.timestamp),
              txHash: i.transaction.hash,
            })
          );
        }
      }
    }
  }
  await ctx.store.save(transfers);
});

