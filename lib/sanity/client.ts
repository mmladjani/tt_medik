import { createClient } from "next-sanity";
import {
  isSanityConfigured,
  SANITY_API_VERSION,
  SANITY_DATASET,
  SANITY_PROJECT_ID,
  SANITY_READ_TOKEN,
} from "@/lib/sanity/env";

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: SANITY_API_VERSION,
      useCdn: true,
      token: SANITY_READ_TOKEN || undefined,
      perspective: "published",
    })
  : null;
