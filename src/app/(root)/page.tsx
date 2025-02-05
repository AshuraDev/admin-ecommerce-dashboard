
"use client"

import { Modal } from "@/components/ui/modal";

export default function SetupPage() {
  return (
    <div className="p-4">
      <p>Ceci est une route protéger</p>
      <Modal
        title="Test title"
        description="Description test"
        isOpen
        onClose={() => {}}
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis,
        quisquam minus corporis cumque, delectus nemo a sit provident earum rem,
        illo voluptatem doloremque dolor aperiam et magnam illum sequi
        recusandae?
      </Modal>
    </div>
  );
}
