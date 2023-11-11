"use client";

import { Modal } from "@/components/ui/modal";
import { useProjectModal } from "@/hooks/modal";

const ProjectModal = () => {
  const projectModal = useProjectModal();
  return (
    <Modal
      title="hello World"
      description="Ho GHhdshd dhgdf dhf"
      isOpen={projectModal.isOpen}
      onClose={projectModal.onClose}
    >
      <div>Hello bhai log</div>
    </Modal>
  );
};

export default ProjectModal;
