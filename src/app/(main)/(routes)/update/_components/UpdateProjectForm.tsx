"use client";

import * as z from "zod";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2, Trash } from "lucide-react";
import {
  TbBrandNextjs,
  TbBrandReact,
  TbBrandAngular,
  TbBrandVue,
  TbBrandJavascript,
} from "react-icons/tb";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/Image-Upload";
import { Toggle } from "@/components/ui/toggle";
import { Checkbox } from "@/components/ui/checkbox";
import { Project } from "@prisma/client";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import AlertModal from "@/components/modals/Alert-Modal";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(1, {
    message: "Description must be at least 2 characters.",
  }),
  imageUrl: z.string().min(1),
  liveUrl: z.string().min(1),
  techs: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one Tech Stack.",
  }),
});

interface UpdateProjectValue {
  initialValue: Project | null;
}

type ProjectFormValues = z.infer<typeof formSchema>;

const UpdateProjectForm: React.FC<UpdateProjectValue> = ({ initialValue }) => {
  // Spinner
  const Icons = {
    spinner: Loader2,
  };

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const techStacks = [
    {
      label: "NextJS",
      icon: <TbBrandNextjs className={"w-7 h-7 text-[#333]"} />,
    },
    {
      label: "ReactJS",
      icon: <TbBrandReact className={"w-7 h-7 text-[#333]"} />,
    },
    {
      label: "Angular",
      icon: <TbBrandAngular className={"w-7 h-7 text-[#333]"} />,
    },
    {
      label: "Vue",
      icon: <TbBrandVue className={"w-7 h-7 text-[#333]"} />,
    },
    {
      label: "Javascript",
      icon: <TbBrandJavascript className={"w-7 h-7 text-[#333]"} />,
    },
  ];

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValue || {
      title: "",
      description: "",
      imageUrl: "",
      liveUrl: "",
      techs: [],
    },
  });

  const onSubmitHandler = async (data: ProjectFormValues) => {
    setLoading(true);

    try {
      await axios.patch(`/api/project/${initialValue?.id}`, data);
      router.push("/");
      toast.success("Project Updated!");
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const onDeleteHandler = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/project/${initialValue?.id}`);
      router.refresh();
      router.push("/projects");
      toast.success("Project Deleted!");
    } catch (error) {
      toast.error("Make sure you are right path!");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onDeleteHandler}
      />

      <div className="pb-4 flex justify-between items-center">
        <Heading
          title="Update Project"
          description="Update project to showcase your skills"
        />

        {initialValue && (
          <Button
            disabled={loading}
            variant={"destructive"}
            size={"default"}
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="my-4">
        <Separator />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="space-y-4 w-full max-w-xl"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#333]">
                  Title <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Enter title..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#333]">
                  Description <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    placeholder="Enter description..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="liveUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#333]">
                  Live URL <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Enter URL..."
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="techs"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#333]">
                  Tech Stack <span className="text-red-400">*</span>
                </FormLabel>
                <div className="flex items-center gap-4">
                  {techStacks.map((item) => (
                    <FormField
                      key={item.label}
                      control={form.control}
                      name="techs"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.label}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.label)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        item.label,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.label
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              <div>
                                <Toggle
                                  key={item.label}
                                  className="w-[65px] h-[60px]"
                                  variant={"outline"}
                                  size={"lg"}
                                >
                                  {item.icon}
                                </Toggle>
                              </div>
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Background Image <span className="text-red-400">* </span>
                </FormLabel>
                <FormControl>
                  <ImageUpload
                    disabled={loading}
                    onRemove={() => field.onChange("")}
                    onchange={(url) => field.onChange(url)}
                    value={field.value ? [field.value] : []}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} type="submit">
            {loading && <Icons.spinner className="h-4 w-4 animate-spin mr-2" />}
            Save Changes
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UpdateProjectForm;
