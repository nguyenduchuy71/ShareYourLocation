import { z } from "zod";

export const objectCreatePrject = {
  projectName: {
    label: "Project name",
    defaultValues: "",
    placeholder: "Name",
    type: "text",
    enabled: true,
  },
  projectDescription: {
    label: "Project description",
    defaultValues: "",
    placeholder: "Description",
    type: "text",
    enabled: true,
  },
  projectCode: {
    label: "Project code",
    defaultValues: "",
    type: "password",
    placeholder: "******",
    enabled: true,
  },
};

export const createProjectFormSchema = z.object({
  projectName: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  projectDescription: z.string().min(4, {
    message: "Project description must be at least 4 characters.",
  }),
  projectCode: z.string().min(4, {
    message: "Project code must be at least 4 characters.",
  }),
});

export const joinProjectFormSchema = z.object({
  projectId: z.string().optional(),
  projectCode: z.string().min(2, {
    message: "Project code must be at least 2 characters.",
  }),
});

export const objectJoinPrject = {
  projectCode: {
    label: "Project code",
    defaultValues: "",
    type: "password",
    placeholder: "******",
    enabled: true,
  },
};
