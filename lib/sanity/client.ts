import { createClient } from "@sanity/client";

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const sanityApiVersion = "2025-01-01";

export const hasSanityConfig = Boolean(sanityProjectId && sanityDataset);

export const sanityClient = createClient({
  projectId: sanityProjectId || "placeholder",
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: true
});
