"use client";

import { useProjectID } from "@/hooks/PorjectId";
import { useProjectModal } from "@/hooks/modal";

import { Modal } from "@/components/ui/modal";

const ProjectModal = () => {
  const projectModal = useProjectModal();
  const projectID = useProjectID();


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
