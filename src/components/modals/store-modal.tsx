import React from "react";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";

export const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal();
  return (
    <Modal
      title="Créer une boutique"
      description="Ajouter une nouvelle boutique pour gérer les produits et les catégories"
      isOpen={isOpen}
      onClose={onClose}
    >
      Futur store form
    </Modal>
  );
};
