import { generateReactHelpers } from "@uploadthing/react";

import type { OurFileRouter } from "@/api/uploadthing/core";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
