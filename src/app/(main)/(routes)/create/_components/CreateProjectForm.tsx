"use client";

import * as z from "zod";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
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

type ProjectFormValues = z.infer<typeof formSchema>;

const CreateProjectForm = () => {
  // Spinner
  const Icons = {
    spinner: Loader2,
  };

  const router = useRouter();
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
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      liveUrl: "",
      techs: [],
    },
  });

  const onSubmitHandler = async (data: ProjectFormValues) => {
    // console.log(data);
    setLoading(true);

    try {
      await axios.post("/api/project", data);
      router.push("/");
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="space-y-4 w-full"
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
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateProjectForm;

{
  /* <div className="flex gap-4">
  {techStacks.map((tech) => (
    <>
      <Checkbox id={tech.label} />
      <FormLabel>
        <Toggle
          key={tech.label}
          className="w-[65px] h-[60px]"
          variant={"outline"}
          size={"lg"}
        >
          {tech.icon}
        </Toggle>
      </FormLabel>
    </>
  ))}
</div>; */
}
