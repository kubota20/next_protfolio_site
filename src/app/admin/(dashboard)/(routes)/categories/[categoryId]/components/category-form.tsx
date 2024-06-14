"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

// prisma
import { Category } from "@prisma/client";

// hook
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// トースト
import toast from "react-hot-toast";

// HTTP通信
import axios from "axios";

// icon
import { Trash } from "lucide-react";

// components
import { AlertModal } from "@/components/modals/alert-modal";
import { Heading } from "@/components/admin-side/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formScheme = z.object({
  name: z.string().min(3, { message: "3文字以上を入力" }),
});

interface CategoryFormProps {
  data: Category | null;
}

type CategoryFormValues = z.infer<typeof formScheme>;

export const CategoryForm: React.FC<CategoryFormProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = data ? "Category Change" : "Category Create";
  const description = data
    ? "カテゴリの中身を変更します"
    : "カテゴリを新しく作成します";

  const toastMessage = data ? "変更しました" : "作成しました";

  const action = data ? "変更" : "作成";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formScheme),
    defaultValues: data
      ? { ...data }
      : {
          name: "",
        },
  });

  //　変更＆最新
  const onSubmit = async (dataValue: CategoryFormValues) => {
    try {
      setLoading(true);
      if (data) {
        // 変更
        await axios.patch(
          `/api/admin/categories/${params.categoryId}`,
          dataValue
        );
      } else {
        // 作成
        await axios.post("/api/admin/categories", dataValue);
      }

      // 変更したらcategoriesページに移動
      router.refresh();
      router.push("/admin/categories");

      // 変更や作成が成功したらトースト表示
      toast.success(toastMessage);
    } catch (error) {
      // 失敗した時のトースト表示
      toast.error(`${action}に失敗しました`);
    } finally {
      //　成功、失敗しても行う
      setLoading(false);
    }
  };

  // 削除
  const onDelete = async () => {
    try {
      setLoading(true);
      if (data) {
        await axios.delete(`/api/admin/categories/${params.categoryId}`);

        // 中身をきれいにしたらcategoriesページに移動
        router.refresh();
        router.push("/admin/categories");
      }
    } catch (error) {
      // 失敗した時のトースト表示
      toast.error(`${action}に失敗しました`);
    } finally {
      //　成功、失敗しても行う
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {data && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator className="my-4" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="名前" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-end mt-8">
            <Button disabled={loading} className="" type="submit">
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
