import { useMemo, useState } from "react";
import ReactFlow, { Background, Controls, Edge, MiniMap, NodeProps, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import { JobResponse, Relationship, Shell } from "../../../../../types/jobs";
import { DisplayNode } from "./DisplayNode";
import { EdgeDetailDialog } from "./EdgeDetailDialog";
import { processJobForGraphDisplay } from "./react-flow/processJobForGraphDisplay";
import { SearchNode } from "./SearchNode";

export const GraphDisplay: React.FC<{
  job: JobResponse;
  fullscreen: boolean;
}> = ({ job, fullscreen }) => {
  const [showEdgeDialog, setShowEdgeDialog] = useState<Relationship | undefined>(undefined);

  const nodeTypes = useMemo(
    () => ({ displayNode: (data: NodeProps<Shell>) => <DisplayNode data={data} job={job} /> }),
    [],
  );

  const { nodes, edges } = processJobForGraphDisplay(job);

  return (
    <ReactFlowProvider>
      <SearchNode />
      <div style={{ height: fullscreen ? "75vh" : "40vh" }}>
        <ReactFlow
          nodeTypes={nodeTypes}
          fitView={true}
          fitViewOptions={{
            maxZoom: 1,
          }}
          nodes={nodes}
          edges={edges}
          proOptions={{ hideAttribution: true }}
          minZoom={0.01}
          onEdgeClick={(event: React.MouseEvent, edge: Edge) => {
            setShowEdgeDialog(edge.data);
          }}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
      <EdgeDetailDialog edge={showEdgeDialog} onClose={() => setShowEdgeDialog(undefined)} />
    </ReactFlowProvider>
  );
};