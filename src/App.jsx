import React, { useCallback, useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from "reactflow";

import "reactflow/dist/style.css";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import EditNodeScreen from "@/components/EditNodeScreen";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isEditMode, setIsEditMode] = useState(false);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleCreateNewNode = () => {
    console.log("Creating a new node!");
  };

  return (
    <>
      <Sheet>
        <div style={{ width: "100vw", height: "100vh" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          >
            <Panel>
              <Button onClick={handleCreateNewNode}>Create Node</Button>
            </Panel>
            <Controls />
            <Background variant="dots" gap={12} size={2} />
          </ReactFlow>
        </div>
        <EditNodeScreen />
      </Sheet>
    </>
  );
}
