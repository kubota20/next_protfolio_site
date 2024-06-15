"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

// prisma
import { Category, Blog } from "@prisma/client";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUpload } from "@/components/ui/image-upload";
import { Textarea } from "@/components/ui/textarea";

const formScheme = z.object({
  title: z
    .string()
    .min(3, { message: "3文字以上を入力" })
    .max(12, { message: "12文字以内を入力" }),
  discription: z
    .string()
    .min(3, { message: "3文字以上を入力" })
    .max(300, { message: "300文字以内を入力" }),
  link: z.string(),
  imageUrl: z.string(),
  categoryId: z.string(),
  release: z.boolean().default(false).optional(),
});

interface BlogFormProps {
  data: Blog | null;
  categories: Category[];
}

type BlogFormValues = z.infer<typeof formScheme>;

export const BlogForm: React.FC<BlogFormProps> = ({ data, categories }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [descriptionCount, setDescriptionCount] = useState(
    data ? data.discription : ""
  );

  const title = data ? "Blog Change" : "Blog Create";
  const description = data
    ? "ブログの中身を変更します"
    : "ブログを新しく作成します";

  const toastMessage = data ? "変更しました" : "作成しました";

  const action = data ? "変更" : "作成";

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(formScheme),
    defaultValues: data
      ? { ...data }
      : {
          title: "",
          discription: "",
          link: "",
          imageUrl: "",
          categoryId: "",
          release: false,
        },
  });

  //　変更＆最新
  const onSubmit = async (dataValue: BlogFormValues) => {
    try {
      setLoading(true);
      if (data) {
        // 変更
        await axios.patch(`/api/admin/blogs/${params.blogId}`, dataValue);
      } else {
        // 作成
        await axios.post("/api/admin/blogs", dataValue);
      }

      // 変更したらblogsページに移動
      router.refresh();
      router.push("/admin/blogs");

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
        await axios.delete(`/api/admin/blogs/${params.categoryId}`);

        // 中身をきれいにしたらblogsページに移動
        router.refresh();
        router.push("/admin/blogs");
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
          // 変更時にボタンが出ます
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* タイトル */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="タイトル"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 説明 */}
            <FormField
              control={form.control}
              name="discription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discription</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="説明"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setDescriptionCount(e.target.value);
                      }}
                    />
                  </FormControl>
                  <div className="flex items-center justify-between">
                    <FormMessage />
                    <span className="text-xs text-gray-500">
                      {descriptionCount.length} / 300文字
                    </span>
                  </div>
                </FormItem>
              )}
            />

            {/* リンク */}
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="リンク" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 画像URL */}
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ImageUrl</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      disabled={loading}
                      onUploadSuccess={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* categoryId */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger defaultValue={field.value}>
                        <SelectValue placeholder="カテゴリ名" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 公開 */}
            <FormField
              control={form.control}
              name="release"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 ">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>公開</FormLabel>
                    <FormDescription className="text-xs">
                      公開する場合チェックする
                    </FormDescription>
                  </div>
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
