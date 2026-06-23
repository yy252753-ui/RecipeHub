"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ImagePlus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { FoodImage } from "@/components/food-image";
import { routes } from "@/constants/routes";

const formSchema = z.object({
  title: z.string().trim().min(1, "제목을 입력해주세요."),
  description: z.string().trim().min(1, "소개를 입력해주세요."),
  cookTime: z.coerce.number().int().positive("조리시간은 1분 이상이어야 합니다."),
  serving: z.coerce.number().int().positive("분량은 1인분 이상이어야 합니다."),
  difficulty: z.enum(["EASY", "NORMAL", "HARD"]),
  thumbnailImg: z.string().optional(),
  tagsText: z.string().optional(),
  ingredients: z
    .array(
      z.object({
        name: z.string().trim().min(1, "재료명을 입력해주세요."),
        amount: z.string().trim().min(1, "분량을 입력해주세요."),
        unit: z.string().trim().optional()
      })
    )
    .min(1, "재료를 1개 이상 입력해주세요."),
  steps: z
    .array(
      z.object({
        description: z.string().trim().min(1, "조리 설명을 입력해주세요."),
        img: z.string().optional()
      })
    )
    .min(1, "조리 순서를 1개 이상 입력해주세요.")
});

type FormValues = z.infer<typeof formSchema>;
type RecipeStatus = "DRAFT" | "PUBLISHED";

export type RecipeWriteFormValues = FormValues;

const emptyValues: FormValues = {
  title: "",
  description: "",
  cookTime: 15,
  serving: 2,
  difficulty: "EASY",
  thumbnailImg: "",
  tagsText: "",
  ingredients: [{ name: "", amount: "", unit: "" }],
  steps: [{ description: "", img: "" }]
};

type RecipeWriteFormProps = {
  initialValues?: FormValues;
  recipeId?: string;
  mode?: "create" | "edit";
  backHref?: string;
};

export function RecipeWriteForm({
  initialValues = emptyValues,
  recipeId,
  mode = "create",
  backHref = routes.recipes
}: RecipeWriteFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [submitStatus, setSubmitStatus] = useState<RecipeStatus>("PUBLISHED");

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues
  });

  const ingredients = useFieldArray({
    control,
    name: "ingredients"
  });

  const steps = useFieldArray({
    control,
    name: "steps"
  });

  const thumbnailImg = useWatch({
    control,
    name: "thumbnailImg"
  });
  const stepValues = useWatch({
    control,
    name: "steps"
  });

  async function onSubmit(values: FormValues) {
    setServerError("");

    const tags = Array.from(
      new Set(
        (values.tagsText ?? "")
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      )
    ).slice(0, 5);

    const response = await fetch(
      mode === "edit" && recipeId ? `/api/recipes/${recipeId}` : "/api/recipes",
      {
        method: mode === "edit" ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          cookTime: values.cookTime,
          serving: values.serving,
          difficulty: values.difficulty,
          status: submitStatus,
          thumbnailImg: values.thumbnailImg ?? "",
          ingredients: values.ingredients,
          steps: values.steps.map((step) => ({
            description: step.description,
            img: step.img ?? ""
          })),
          tags
        })
      }
    );

    if (response.status === 401) {
      router.push("/auth/login");
      return;
    }

    if (!response.ok) {
      setServerError("레시피를 저장하지 못했습니다. 권한과 입력값을 확인한 뒤 다시 시도해주세요.");
      return;
    }

    const recipe = (await response.json()) as { id: string };
    router.push(submitStatus === "DRAFT" ? `/recipes/${recipe.id}/edit` : `/recipes/${recipe.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container-page max-w-[860px]">
      <div className="mb-6 flex items-center justify-between gap-3">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 text-sm font-bold text-[var(--color-text-neutral-secondary)]"
        >
          <ChevronLeft size={17} />
          {mode === "edit" ? "상세로" : "나가기"}
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            onClick={() => setSubmitStatus("DRAFT")}
            className="h-10 rounded-md border border-[var(--color-line-normal-normal)] bg-white px-4 text-sm font-bold disabled:opacity-60"
          >
            임시저장
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            onClick={() => setSubmitStatus("PUBLISHED")}
            className="h-10 rounded-md bg-primary px-4 text-sm font-bold text-white disabled:opacity-60"
          >
            출간하기
          </button>
        </div>
      </div>

      <section className="rounded-2xl border border-[var(--color-line-normal-normal)] bg-white p-6 md:p-8">
        <p className="mb-3 text-xs font-extrabold text-primary">
          {mode === "edit" ? "레시피 수정" : "새 레시피 작성"}
        </p>

        {serverError ? (
          <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {serverError}
          </div>
        ) : null}

        <input
          aria-label="레시피 제목"
          placeholder="레시피 제목"
          className="mb-2 w-full border-0 border-b-2 border-[var(--color-line-solid-neutral)] pb-4 text-3xl font-extrabold outline-none placeholder:text-[var(--color-text-neutral-tertiary)]"
          {...register("title")}
        />
        <ErrorText message={errors.title?.message} className="mb-6" />

        <Field label="태그" hint="쉼표로 구분, 최대 5개">
          <input
            placeholder="예: 면요리, 여름, 간단"
            className="h-11 w-full rounded-sm border border-[var(--color-line-normal-normal)] px-3 outline-primary"
            {...register("tagsText")}
          />
        </Field>

        <Field label="대표 이미지" hint="JPG, PNG, WebP · 최대 5MB">
          <ImageUploadField
            label="대표 이미지"
            value={thumbnailImg}
            onChange={(url) => setValue("thumbnailImg", url, { shouldDirty: true })}
          />
        </Field>

        <div className="grid gap-4 md:grid-cols-3">
          <Field label="조리시간">
            <input
              type="number"
              min={1}
              className="h-11 w-full rounded-sm border border-[var(--color-line-normal-normal)] px-3 font-bold outline-primary"
              {...register("cookTime")}
            />
            <ErrorText message={errors.cookTime?.message} />
          </Field>
          <Field label="난이도">
            <select
              className="h-11 w-full rounded-sm border border-[var(--color-line-normal-normal)] px-3 font-bold outline-primary"
              {...register("difficulty")}
            >
              <option value="EASY">쉬움</option>
              <option value="NORMAL">보통</option>
              <option value="HARD">어려움</option>
            </select>
          </Field>
          <Field label="분량">
            <input
              type="number"
              min={1}
              className="h-11 w-full rounded-sm border border-[var(--color-line-normal-normal)] px-3 font-bold outline-primary"
              {...register("serving")}
            />
            <ErrorText message={errors.serving?.message} />
          </Field>
        </div>

        <Field label="소개">
          <textarea
            placeholder="레시피를 간단히 소개해주세요."
            className="min-h-28 w-full resize-y rounded-sm border border-[var(--color-line-normal-normal)] p-3 font-normal leading-7 outline-primary"
            {...register("description")}
          />
          <ErrorText message={errors.description?.message} />
        </Field>

        <Divider />

        <SectionTitle title="재료" meta={`${ingredients.fields.length}개`} />
        <div className="mb-4 space-y-2">
          {ingredients.fields.map((field, index) => (
            <div key={field.id}>
              <div className="grid grid-cols-[1fr_92px_92px_40px] gap-2">
                <input
                  placeholder="재료명"
                  className="h-10 min-w-0 rounded-sm border border-[var(--color-line-normal-normal)] px-3 outline-primary"
                  {...register(`ingredients.${index}.name`)}
                />
                <input
                  placeholder="분량"
                  className="h-10 min-w-0 rounded-sm border border-[var(--color-line-normal-normal)] px-3 outline-primary"
                  {...register(`ingredients.${index}.amount`)}
                />
                <input
                  placeholder="단위"
                  className="h-10 min-w-0 rounded-sm border border-[var(--color-line-normal-normal)] px-3 outline-primary"
                  {...register(`ingredients.${index}.unit`)}
                />
                <button
                  type="button"
                  aria-label="재료 삭제"
                  onClick={() => ingredients.fields.length > 1 && ingredients.remove(index)}
                  className="grid h-10 place-items-center rounded-sm text-[var(--color-text-neutral-tertiary)] disabled:opacity-30"
                  disabled={ingredients.fields.length <= 1}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <ErrorText
                message={
                  errors.ingredients?.[index]?.name?.message ??
                  errors.ingredients?.[index]?.amount?.message
                }
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => ingredients.append({ name: "", amount: "", unit: "" })}
          className="mb-8 flex h-11 w-full items-center justify-center gap-2 rounded-sm border border-dashed border-[var(--color-line-normal-normal)] bg-[var(--color-background-neutral-tertiary)] text-sm font-bold"
        >
          <Plus size={16} />
          재료 추가
        </button>

        <SectionTitle title="조리 순서" meta={`${steps.fields.length}단계`} />
        <div className="space-y-3">
          {steps.fields.map((field, index) => (
            <div
              key={field.id}
              className="grid gap-3 rounded-lg border border-[var(--color-line-normal-normal)] p-4 md:grid-cols-[32px_1fr_40px]"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-sm font-extrabold text-white">
                {index + 1}
              </span>
              <div>
                <textarea
                  placeholder="조리 방법을 입력해주세요."
                  className="min-h-24 w-full resize-y rounded-sm border border-[var(--color-line-normal-normal)] p-3 text-sm font-normal leading-6 outline-primary"
                  {...register(`steps.${index}.description`)}
                />
                <ErrorText message={errors.steps?.[index]?.description?.message} />
                <div className="mt-3">
                  <ImageUploadField
                    label={`${index + 1}단계 이미지`}
                    value={stepValues?.[index]?.img}
                    compact
                    onChange={(url) =>
                      setValue(`steps.${index}.img`, url, { shouldDirty: true })
                    }
                  />
                </div>
              </div>
              <button
                type="button"
                aria-label="조리 단계 삭제"
                onClick={() => steps.fields.length > 1 && steps.remove(index)}
                className="grid h-10 place-items-center rounded-sm text-[var(--color-text-neutral-tertiary)] disabled:opacity-30"
                disabled={steps.fields.length <= 1}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => steps.append({ description: "" })}
          className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-sm border border-dashed border-[var(--color-line-normal-normal)] bg-[var(--color-background-neutral-tertiary)] text-sm font-bold"
        >
          <Plus size={16} />
          조리 단계 추가
        </button>
      </section>
    </form>
  );
}

function Field({
  label,
  hint,
  children
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-baseline gap-2">
        <label className="text-sm font-extrabold">{label}</label>
        {hint ? (
          <span className="text-xs font-bold text-[var(--color-text-neutral-tertiary)]">
            {hint}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function ErrorText({ message, className = "" }: { message?: string; className?: string }) {
  if (!message) {
    return null;
  }

  return <p className={`mt-2 text-xs font-bold text-red-600 ${className}`}>{message}</p>;
}

type UploadSignature = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  signature: string;
};

function ImageUploadField({
  label,
  value,
  compact = false,
  onChange
}: {
  label: string;
  value?: string;
  compact?: boolean;
  onChange: (url: string) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setError("");

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("JPG, PNG, WebP 파일만 업로드할 수 있습니다.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("이미지는 5MB 이하만 업로드할 수 있습니다.");
      return;
    }

    setIsUploading(true);

    try {
      const signatureResponse = await fetch("/api/upload/signature", {
        method: "POST"
      });

      if (!signatureResponse.ok) {
        setError("이미지 업로드 설정이 필요합니다.");
        return;
      }

      const signature = (await signatureResponse.json()) as UploadSignature;
      const body = new FormData();
      body.append("file", file);
      body.append("api_key", signature.apiKey);
      body.append("timestamp", String(signature.timestamp));
      body.append("folder", signature.folder);
      body.append("signature", signature.signature);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`,
        {
          method: "POST",
          body
        }
      );

      if (!uploadResponse.ok) {
        setError("이미지를 업로드하지 못했습니다.");
        return;
      }

      const uploaded = (await uploadResponse.json()) as { secure_url: string };
      onChange(uploaded.secure_url);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div
        className={`relative overflow-hidden rounded-lg border border-[var(--color-line-normal-normal)] ${
          compact ? "max-w-[220px]" : ""
        }`}
      >
        <FoodImage label={label} src={value} height={compact ? 120 : 240} />
        <label className="absolute right-3 top-3 inline-flex h-9 cursor-pointer items-center gap-2 rounded-sm bg-black/70 px-3 text-sm font-bold text-white">
          <ImagePlus size={15} />
          {isUploading ? "업로드 중" : value ? "변경" : "업로드"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            disabled={isUploading}
            onChange={(event) => {
              const file = event.target.files?.[0];

              if (file) {
                void upload(file);
              }

              event.currentTarget.value = "";
            }}
          />
        </label>
      </div>
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="text-xs font-bold text-[var(--color-text-neutral-tertiary)]"
        >
          이미지 제거
        </button>
      ) : null}
      {error ? <p className="text-xs font-bold text-red-600">{error}</p> : null}
    </div>
  );
}

function Divider() {
  return <div className="my-8 h-px bg-[var(--color-line-solid-neutral)]" />;
}

function SectionTitle({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-xl font-extrabold tracking-normal">{title}</h2>
      <span className="text-sm font-bold text-[var(--color-text-neutral-tertiary)]">
        {meta}
      </span>
    </div>
  );
}
