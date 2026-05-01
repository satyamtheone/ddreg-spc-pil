import FullPageEditor from "./fullPageEditor";

export type SpcSearchParamss = {
  referenceId?: string;
  documentId?: string;
  documentBufferUrl?: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SpcSearchParamss>;
}) {
  const params = await searchParams;

  return <FullPageEditor params={params} />;
}
