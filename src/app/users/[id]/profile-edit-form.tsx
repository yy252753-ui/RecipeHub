"use client";

import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProfileEditForm({
  userId,
  initialNickname,
  initialBio,
  initialProfileImg
}: {
  userId: string;
  initialNickname: string;
  initialBio: string;
  initialProfileImg: string;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [nickname, setNickname] = useState(initialNickname);
  const [bio, setBio] = useState(initialBio);
  const [profileImg, setProfileImg] = useState(initialProfileImg);

  async function saveProfile() {
    setIsSaving(true);
    setError("");

    const response = await fetch(`/api/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nickname,
        bio,
        profileImg
      })
    });

    setIsSaving(false);

    if (!response.ok) {
      setError("프로필을 저장하지 못했습니다.");
      return;
    }

    setIsOpen(false);
    router.refresh();
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-10 items-center gap-2 rounded-md border border-[var(--color-line-normal-normal)] bg-white px-4 text-sm font-bold"
      >
        <Pencil size={16} />
        프로필 수정
      </button>
    );
  }

  return (
    <div className="mt-5 rounded-lg border border-[var(--color-line-normal-normal)] bg-[var(--color-background-neutral-tertiary)] p-4">
      <div className="grid gap-3">
        <label className="text-sm font-extrabold">
          닉네임
          <input
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            className="mt-2 h-10 w-full rounded-sm border border-[var(--color-line-normal-normal)] bg-white px-3 font-normal outline-primary"
            maxLength={30}
          />
        </label>
        <label className="text-sm font-extrabold">
          소개
          <textarea
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            className="mt-2 min-h-24 w-full resize-y rounded-sm border border-[var(--color-line-normal-normal)] bg-white p-3 font-normal leading-6 outline-primary"
            maxLength={160}
          />
        </label>
        <label className="text-sm font-extrabold">
          프로필 이미지 URL
          <input
            value={profileImg}
            onChange={(event) => setProfileImg(event.target.value)}
            placeholder="https://..."
            className="mt-2 h-10 w-full rounded-sm border border-[var(--color-line-normal-normal)] bg-white px-3 font-normal outline-primary"
          />
        </label>
      </div>
      {error ? <p className="mt-3 text-xs font-bold text-red-600">{error}</p> : null}
      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="h-10 rounded-md border border-[var(--color-line-normal-normal)] bg-white px-4 text-sm font-bold"
        >
          취소
        </button>
        <button
          type="button"
          onClick={() => {
            void saveProfile();
          }}
          disabled={isSaving}
          className="h-10 rounded-md bg-primary px-4 text-sm font-bold text-white disabled:opacity-60"
        >
          저장
        </button>
      </div>
    </div>
  );
}
