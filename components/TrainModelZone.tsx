"use client";

import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaFemale, FaImages, FaMale, FaRainbow } from "react-icons/fa";
import * as z from "zod";
import { fileUploadFormSchema } from "@/types/zod";
import { upload } from "@vercel/blob/client";

type FormInput = z.infer<typeof fileUploadFormSchema>;

// const stripeIsConfigured = process.env.NEXT_PUBLIC_STRIPE_IS_ENABLED === "true";
const stripeIsConfigured = true

export default function TrainModelZone() {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormInput>({
    resolver: zodResolver(fileUploadFormSchema),
    defaultValues: {
      name: "",
      type: "man"
    },
  });

  const onSubmit: SubmitHandler<FormInput> = () => {
    trainModel();
  }

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newFiles: File[] =
        acceptedFiles.filter(
          (file: File) => !files.some((f) => f.name === file.name)
        ) || [];

      // if user tries to upload more than 10 files, display a toast
      if (newFiles.length + files.length > 10) {
        toast({
          title: "Too many images",
          description:
            "You can only upload up to 10 images in total. Please try again.",
          duration: 5000,
        });
        return;
      }

      // display a toast if any duplicate files were found
      if (newFiles.length !== acceptedFiles.length) {
        toast({
          title: "Duplicate file names",
          // title: "Zduplikowane nazwy plików",
          description:
            "Some of the files you selected were already added. They were ignored.",
            // "Niektóre z wybranych plików zostały już dodane. Zostali zignorowani.",
          duration: 5000,
        });
      }

      // check that in total images do not exceed a combined 4.5MB
      const totalSize = files.reduce((acc, file) => acc + file.size, 0);
      const newSize = newFiles.reduce((acc, file) => acc + file.size, 0);

      if (totalSize + newSize > 4.5 * 1024 * 1024) {
        toast({
          title: "Images exceed size limit",
          // title: "Obrazy przekraczają limit rozmiaru",
          description:
            "The total combined size of the images cannot exceed 4.5MB.",
            // "Łączny rozmiar obrazów nie może przekroczyć 4,5MB.",
          duration: 5000,
        });
        return;
      }

      setFiles([...files, ...newFiles]);

      toast({
        title: "Images selected",
        // title: "Wybrano obrazy",
        description: "The images were successfully selected.",
        // description: "Obrazy zostały wybrane pomyślnie.",
        duration: 5000,
      });
    },
    [files]
  );

  const removeFile = useCallback(
    (file: File) => {
      setFiles(files.filter((f) => f.name !== file.name));
    },
    [files]
  );

  const trainModel = useCallback(async () => {
    setIsLoading(true);
    const blobUrls = [];

    if (files) {
      for (const file of files) {
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/leap/train-model/image-upload",
        });
        blobUrls.push(blob.url);
      }
    }

    const payload = {
      urls: blobUrls,
      name: form.getValues("name").trim(),
      type: form.getValues("type"),
    };

    const response = await fetch("/leap/train-model", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setIsLoading(false);

    if (!response.ok) {
      const responseData = await response.json();
      const responseMessage: string = responseData.message;

      toast({
        title: "Something went wrong!",
        // title: "Coś poszło nie tak!",
        description: responseMessage,
        duration: 5000,
      });
      return;
    }

    toast({
      title: "Model queued for training",
      // title: "Modelka w kolejce do treningu",
      description:
        "The model was queued for training. You will receive an email when the model is ready to use.",
        // "Modelka trafiła do kolejki na szkolenie. Gdy model będzie gotowy do użycia, otrzymasz e-mail.",
      duration: 5000,
    });

    router.push("/overview")
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
  });

  const modelType = form.watch("type");

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-md flex flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full rounded-md">
                <FormLabel>
                  Name
                  {/* Nazwa */}
                </FormLabel>
                <FormDescription>
                  Give your model a name so you can easily identify it later.
                  {/* Nadaj swojemu modelowi nazwę, aby móc go później łatwo zidentyfikować. */}
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder="e.g. Natalie Headshots"
                    {...field}
                    className="max-w-screen-sm"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4">
            <FormLabel>
              Type
              {/* Typ */}
            </FormLabel>
            <FormDescription>
              Select the type of headshots you want to generate.
              {/* Wybierz typ strzałów w głowę, które chcesz wygenerować. */}
            </FormDescription>
            <RadioGroup
              defaultValue={modelType}
              className="grid grid-cols-3 gap-4"
              value={modelType}
              onValueChange={(value) => {
                form.setValue("type", value);
              }}
            >
              <div>
                <RadioGroupItem
                  value="man"
                  id="man"
                  className="peer sr-only"
                  aria-label="man"
                />
                <Label
                  htmlFor="man"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <FaMale className="mb-3 h-6 w-6" />
                  Man
                </Label>
              </div>

              <div>
                <RadioGroupItem
                  value="woman"
                  id="woman"
                  className="peer sr-only"
                  aria-label="woman"
                />
                <Label
                  htmlFor="woman"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <FaFemale className="mb-3 h-6 w-6" />
                  Woman
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="person"
                  id="person"
                  className="peer sr-only"
                  aria-label="person"
                />
                <Label
                  htmlFor="person"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <FaRainbow className="mb-3 h-6 w-6" />
                  Unisex
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div
            {...getRootProps()}
            className=" rounded-md justify-center align-middle cursor-pointer flex flex-col gap-4"
          >
            <FormLabel>
              Samples
              {/* Próbki */}
            </FormLabel>
            <FormDescription>
              Upload 4-10 images of the person you want to generate headshots for.
              {/* Prześlij 4–10 zdjęć osoby, dla której chcesz wygenerować zdjęcia głowy. */}
            </FormDescription>
            <div className="outline-dashed outline-2 outline-gray-100 hover:outline-blue-500 w-full h-full rounded-md p-4 flex justify-center align-middle">
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="self-center">
                  Drop the files here ...
                  {/* Upuść pliki tutaj ... */}
                </p>
              ) : (
                <div className="flex justify-center flex-col items-center gap-2">
                  <FaImages size={32} className="text-gray-700" />
                  <p className="self-center">
                    Drag 'n' drop some files here, or click to select files.
                    {/* Przeciągnij i upuść tutaj niektóre pliki lub kliknij, aby wybrać pliki. */}
                  </p>
                </div>
              )}
            </div>
          </div>
          {files.length > 0 && (
            <div className="flex flex-row gap-4 flex-wrap">
              {files.map((file) => (
                <div key={file.name} className="flex flex-col gap-1">
                  <img
                    src={URL.createObjectURL(file)}
                    className="rounded-md w-24 h-24 object-cover"
                  />
                  <Button
                    variant="outline"
                    size={"sm"}
                    className="w-full"
                    onClick={() => removeFile(file)}
                  >
                    Remove
                    {/* Usunąć */}
                  </Button>
                </div>
              ))}
            </div>
          )}

          <Button type="submit" className="w-full text-white bg-[#3b5998] hover:bg-[#3b5998]/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mb-2" isLoading={isLoading}>
            Generate character {stripeIsConfigured && <span className="ml-1">(1 Credit)</span>}
            {/* Model pociągu {stripeIsConfigured && <span className="ml-1">(1 kredyt)</span>} */}
          </Button>
        </form>
      </Form>
    </div>
  );
}
