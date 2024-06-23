"use client";

import { useRouter } from "next/navigation";

import { useLoginModal } from "@/hooks/use-login-modal";

import { Modal } from "@/components/ui/modal";
import GoogleButton from "@/components/auth-button/google-button";

export const LoginModal = () => {
  const loginModal = useLoginModal();

  const router = useRouter();

  const handleClose = () => {
    loginModal.onClose();
    router.push("/"); // ホームページにリダイレクト
  };

  return (
    <Modal
      title="ログイン"
      description="管理者用ログイン"
      isOpen={loginModal.isOpen}
      onClose={handleClose}
    >
      <div className="flex items-center justify-center my-4">
        <GoogleButton />
      </div>
    </Modal>
  );
};
